# Funnele — Website

Node.js + Express + EJS site for Funnele, a white-label growth execution agency.

## Local setup

```bash
npm install
cp .env.example .env   # then fill in real SMTP values
npm start
```

Visit `http://localhost:3000`. Port comes from `process.env.PORT`, falling back to 3000 — do not hardcode a port anywhere else.

## Project structure

```
server.js            Express app entry point
routes/               index.js, services.js, resources.js, contact.js
views/                EJS templates
  partials/           head.ejs, nav.ejs, footer.ejs, icons.ejs (shared, written once)
  services/            overview.ejs (all 4 disciplines) + detail.ejs (shared template for each dedicated page)
public/
  css/styles.css       all site styling (vanilla CSS)
  js/main.js           scroll-reveal, cursor-glow, nav dropdown/mobile menu, resource filters
content/
  blog/                drop .md blog posts here
  case-studies/        drop .md case studies here
lib/
  content.js           gray-matter + markdown-it parsing (reads content/ at request time — no DB, no build step)
  mailer.js             nodemailer contact form sender
  services-data.js      copy/deliverables for the 4 service pages (single source of truth)
  logo-data.js          Funnele wordmark logo as a base64 data URI (no separate image file to lose track of)
```

## Adding blog posts / case studies

Drop a `.md` file into `content/blog/` or `content/case-studies/`. No restart needed — content is read fresh on every request to `/resources` and `/resources/:slug`.

**Frontmatter schema** (required on every file):

```yaml
---
title: "Post or case study title"
category: "Meta Ads"            # free-text tag shown on the resource card — channel, vertical, whatever fits
type: "blog"                    # or "case-study" — must match, used for the All/Blog/Case Studies filter
date: "2026-07-01"               # YYYY-MM-DD — controls sort order and the displayed date
excerpt: "One-sentence summary shown on the resource card."
---

Markdown body goes here. Use ## for section headings, - for bullet lists, 1. for numbered lists.
```

The URL slug is the filename without `.md`. Example: `content/blog/my-post.md` → `/resources/my-post`. Slugs must be unique across both folders combined.

## Contact form / email

The contact form posts to `POST /contact` and sends via `nodemailer` using the SMTP credentials in `.env` (see `.env.example`). It works with any SMTP provider — Hostinger email, Gmail (with an app password), SendGrid, Postmark, etc. No third-party form service (Formspree etc.) is used.

`CONTACT_TO_EMAIL` controls where submissions are delivered (defaults to abhijeet@funnele.com).

## Deploying to Hostinger (Node.js app hosting via GitHub)

1. Push this repository to GitHub.
2. In Hostinger's Node.js app hosting, connect the GitHub repo.
3. Set the startup file to `server.js` (or let it use `npm start`).
4. Add the environment variables from `.env.example` in Hostinger's app environment settings — do not commit a real `.env` file.
5. Hostinger assigns `PORT` automatically; the app already reads `process.env.PORT`.
