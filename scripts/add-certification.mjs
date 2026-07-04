#!/usr/bin/env node
// Fetches a Coursera certificate share URL, extracts title/issuer/date/logo/image,
// and upserts an entry into src/data/certifications.json (downloading the issuer
// logo and certificate image into public/certs/ if not already present).
//
// Usage: node scripts/add-certification.mjs <coursera-share-url> [<coursera-share-url> ...]

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA_PATH = path.join(ROOT, 'src/data/certifications.json');
const LOGO_DIR = path.join(ROOT, 'public/certs/logos');
const IMAGE_DIR = path.join(ROOT, 'public/certs/images');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extFromUrl(url) {
  const m = url.match(/\.(png|jpg|jpeg|svg|webp)(\?|$)/i);
  return m ? m[1].toLowerCase() : 'png';
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  return res.text();
}

async function downloadAsset(url, destPath) {
  if (existsSync(destPath)) return;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) {
    console.warn(`  ! could not download asset ${url}: HTTP ${res.status}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
}

function parseCertPage(html, shareUrl) {
  const ogTitle = html.match(/property="og:title"\s+content="([^"]*)"/)?.[1];
  const ogImage = html.match(/property="og:image"\s+content="([^"]*)"/)?.[1];
  const ogUrl = html
    .match(/property="og:url"\s+content="([^"]*)"/)?.[1]
    ?.replace(/&amp;/g, '&')
    .split('?')[0];

  const apolloMatch = html.match(/window\.__APOLLO_STATE__\s*=\s*(\{.*?\});/s);
  if (!apolloMatch) throw new Error('Could not find Apollo state on page — Coursera markup may have changed.');
  const state = JSON.parse(apolloMatch[1]);

  let issuerName = null;
  let issuerLogo = null;
  let grantedAt = null;

  for (const [key, value] of Object.entries(state)) {
    if (key.startsWith('Partner_Partner:') && value?.name) {
      issuerName = value.name;
      issuerLogo = value.squareLogo?.replace(/^http:/, 'https:') ?? null;
    }
  }

  // grantedAt lives on an un-normalized nested object (no own id), so it isn't
  // a top-level Apollo cache key — walk the whole tree to find it.
  function findGrantedAt(node) {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = findGrantedAt(item);
        if (found) return found;
      }
      return null;
    }
    if (node && typeof node === 'object') {
      if (node.__typename === 'AccomplishmentsVCMembership' && node.grantedAt) {
        return node.grantedAt;
      }
      for (const value of Object.values(node)) {
        const found = findGrantedAt(value);
        if (found) return found;
      }
    }
    return null;
  }
  grantedAt = findGrantedAt(state);

  const title = ogTitle?.replace(/^Completion Certificate for\s*/i, '').trim() ?? 'Untitled Certificate';
  const date = grantedAt ? new Date(grantedAt).toISOString().slice(0, 10) : null;
  const code = ogUrl?.split('/').pop() ?? null;

  return { title, issuerName, issuerLogo, date, certImage: ogImage, verifyUrl: ogUrl ?? shareUrl, code };
}

async function loadExisting() {
  if (!existsSync(DATA_PATH)) return [];
  const raw = await readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function main() {
  const urls = process.argv.slice(2);
  if (urls.length === 0) {
    console.error('Usage: node scripts/add-certification.mjs <coursera-share-url> [...]');
    process.exit(1);
  }

  const certs = await loadExisting();

  for (const url of urls) {
    console.log(`Fetching ${url} ...`);
    const html = await fetchHtml(url);
    const parsed = parseCertPage(html, url);

    if (certs.some((c) => c.code === parsed.code)) {
      console.log(`  already have "${parsed.title}" (${parsed.code}), skipping`);
      continue;
    }

    const issuerSlug = slugify(parsed.issuerName ?? 'unknown');
    const titleSlug = slugify(parsed.title);

    let logoPath = null;
    if (parsed.issuerLogo) {
      const ext = extFromUrl(parsed.issuerLogo);
      logoPath = `/certs/logos/${issuerSlug}.${ext}`;
      await downloadAsset(parsed.issuerLogo, path.join(ROOT, 'public', logoPath.slice(1)));
    }

    let imagePath = null;
    if (parsed.certImage) {
      const ext = extFromUrl(parsed.certImage);
      imagePath = `/certs/images/${titleSlug}.${ext}`;
      await downloadAsset(parsed.certImage, path.join(ROOT, 'public', imagePath.slice(1)));
    }

    certs.push({
      title: parsed.title,
      issuer: parsed.issuerName ?? 'Unknown',
      logo: logoPath,
      image: imagePath,
      date: parsed.date,
      url: parsed.verifyUrl,
      code: parsed.code,
      platform: 'Coursera',
    });

    console.log(`  added "${parsed.title}" (${parsed.issuerName}, ${parsed.date})`);
  }

  certs.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(certs, null, 2) + '\n');
  console.log(`\nWrote ${certs.length} certifications to ${path.relative(ROOT, DATA_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
