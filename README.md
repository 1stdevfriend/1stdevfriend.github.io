# Kartikey Kushwah — Portfolio

Personal portfolio site for Kartikey Kushwah, Senior DevOps & Platform Engineer.
Built with [Astro](https://astro.build) (static output) + Tailwind CSS, deployed to
GitHub Pages.

## Project Structure

```text
/
├── public/                   # static assets (favicon, robots.txt)
├── src/
│   ├── components/           # Header, Footer, Seo, ProjectCard
│   ├── content/
│   │   └── projects/         # one markdown file per project (frontmatter + role narrative)
│   ├── content.config.ts     # content collection schema
│   ├── data/
│   │   └── resume.ts         # profile, skills, experience, certifications, education
│   ├── layouts/
│   │   └── BaseLayout.astro  # shared shell: SEO, header, footer, dark-mode init
│   ├── pages/
│   │   ├── index.astro       # home
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── projects/
│   │       ├── index.astro   # filterable project grid
│   │       └── [slug].astro  # project detail (from content collection)
│   └── styles/global.css     # Tailwind import + dark-mode variant + theme tokens
└── .github/workflows/deploy.yml
```

## Commands

| Command             | Action                                      |
| -------------------- | -------------------------------------------- |
| `npm install`         | Install dependencies                         |
| `npm run dev`         | Start dev server at `localhost:4321`         |
| `npm run build`       | Build static site to `./dist/`               |
| `npm run preview`     | Preview the production build locally         |
| `npx astro check`     | Type-check the project                       |

## Editing content

- **Projects**: add/edit markdown files in `src/content/projects/`. Frontmatter fields:
  `title`, `logo` (optional path under `public/projects/logos/`), `org`, `category`, `tags`,
  `complexity`, `repos`, `featured`, `order`, `liveUrl` (optional). The markdown body
  (written as a bullet list) is the "My Role" narrative shown on the project detail page.
- **Resume data** (skills, experience, certifications, education, contact links):
  edit `src/data/resume.ts`.
- **Resume PDF**: the header links to `/kartikey-kushwah-resume.pdf`, generated from
  `src/pages/resume-print.astro` (a print-only page driven by the same `resume.ts` data,
  excluded from the sitemap). To regenerate after editing `resume.ts`:
  ```sh
  npm run build && npx astro preview --port 4322 &
  npx -y playwright install chromium  # first time only
  node -e "
    const { chromium } = require('playwright');
    (async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:4322/resume-print/', { waitUntil: 'networkidle' });
      await page.pdf({ path: 'public/kartikey-kushwah-resume.pdf', format: 'A4', printBackground: true, margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' } });
      await browser.close();
    })();
  "
  npm run build  # rebuild so dist/ picks up the new PDF
  ```

## Deploying to GitHub Pages

This repo is configured for a **root user site** (`1stdevfriend.github.io`), so
`astro.config.mjs` sets `site: 'https://1stdevfriend.github.io'` with no `base` path.

1. Create a GitHub repo named exactly `1stdevfriend.github.io`.
2. Push this project to it (`git remote add origin ...`, `git push -u origin main`).
3. In the repo's Settings → Pages, set the source to **GitHub Actions**.
4. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

If you later move to a custom domain, add a `public/CNAME` file with the domain name
and update `site` in `astro.config.mjs` accordingly (no `base` path needed either way
for a root/custom-domain site).

## Adding certifications

Verified certificates (currently 9 from Coursera) live in `src/data/certifications.json`
and render on the About page, each linking out to its public Coursera verification page.
Unlinked certifications (no public URL) stay as plain strings in `src/data/resume.ts`.

To add more, either:

- **Locally**: `node scripts/add-certification.mjs <coursera-share-url> [<url> ...]`
  — fetches the share page, extracts title/issuer/date, downloads the issuer logo and
  certificate image into `public/certs/`, and appends the entry to `certifications.json`.
- **From GitHub**: run the **"Add Certification"** workflow (Actions tab → Run workflow),
  pasting one or more Coursera share URLs (space/comma/newline separated). It runs the
  same script and commits the result directly to `main`.

Only Coursera share URLs are supported today (the script reads Coursera's embedded
Apollo GraphQL state for the issuer name/logo and completion timestamp). Other
platforms would need their own parser in `scripts/add-certification.mjs`.

## SEO

- Per-page meta description/canonical/Open Graph/Twitter Card via `src/components/Seo.astro`.
- JSON-LD `Person` schema on the homepage (`src/pages/index.astro`).
- `sitemap-index.xml` generated automatically at build time via `@astrojs/sitemap`.
- `public/robots.txt` points crawlers to the sitemap.
- Consider adding a custom 1200×630 `public/og-image.png` and swapping the default
  `image` prop in `Seo.astro` for richer social-share previews (currently falls back
  to the favicon).
