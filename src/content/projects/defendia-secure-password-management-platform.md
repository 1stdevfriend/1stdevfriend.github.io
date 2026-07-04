---
title: "Defendia — Secure Password Management Platform"
liveUrl: "https://defendia.com"
org: "defendia"
category: "Enterprise Platform / Security Product (Password Manager) - multi-platform"
tags: ["Strapi", "CMS", "Node.js", "SQLite", "REST API", "Drone CI", "TypeScript", "React", "Webpack", "Browser Extension", "CI/CD", "Electron", "Desktop App", "Password Manager", "Tailwind CSS", "Flutter"]
complexity: "High"
repos: ["defendia/strapi", "defendia/extension", "defendia/desktop", "defendia/mobile", "defendia/supabase", "defendia/website", "defendia/postfix-express"]
featured: true
order: 1
---

Multi-repo platform, role varied per component: Strapi CMS (blog/case studies) - scrum master, took care of deliverables only. Browser Extension - developed ML-based autofill field detection; built the Safari-embedded macOS build via Xcode. Desktop (Electron) - built the Safari-embedded macOS Xcode build; changed password-recovery flow; set up MinIO upload + Drone CI/CD pipeline for Windows & Mac builds; handled macOS notarization and EV code-signing for Windows. Mobile (Flutter) - created design boilerplate; scrum master for the whole Defendia project; helped build iOS autofill extension; did TestFlight testing; Stripe + StoreKit integration. Supabase Backend - built all ~91 Deno Edge Functions (Stripe billing, Apple StoreKit, zero-knowledge vault CRUD, password-history, share-links, family accounts, HaveIBeenPwned breach monitoring incl. per-minute cron, auth flows, email-alias, referrals, onboarding) plus CI/CD auto-deploy and data backups. Website - built Adversus CRM webhook integration for new leads; integrated telemetry. Postfix Express - sole creator; email-masking/alias redirection via self-hosted Postfix.

This project is named as a key highlight in my resume, and reflects a strong DevOps/security profile — CI/CD, code signing & notarization, zero-knowledge architecture, and Supabase edge functions.
