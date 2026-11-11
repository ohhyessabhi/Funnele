const express = require('express');
const meta = require('../lib/site-meta.json');
const { getAllContent } = require('../lib/content');

const router = express.Router();
const BASE = (process.env.SITE_URL || 'https://funnele.com').replace(/\/$/, '');

function renderPage(view, key) {
  return (req, res) => {
    const m = meta[key];
    res.render(view, {
      title: m.title,
      description: m.description,
      keywords: m.keywords,
      canonical: BASE + m.path,
      extraCss: key === 'home' ? '/css/home.css' : null
    });
  };
}

const PAGE_ROUTES = [
  ['/', 'pages/home', 'home'],
  ['/seo', 'pages/seo', 'seo'],
  ['/seo/reporting', 'pages/seo-reporting', 'seo-reporting'],
  ['/problems', 'pages/problems', 'problems'],
  ['/problems/technical', 'pages/problem-technical', 'problem-technical'],
  ['/problems/content', 'pages/problem-content', 'problem-content'],
  ['/problems/on-page', 'pages/problem-on-page', 'problem-on-page'],
  ['/problems/links', 'pages/problem-links', 'problem-links'],
  ['/problems/ai-search', 'pages/problem-ai-search', 'problem-ai-search'],
  ['/case-studies', 'pages/case-studies', 'case-studies'],
  ['/case-studies/golf', 'pages/case-golf', 'case-golf'],
  ['/case-studies/industrial', 'pages/case-industrial', 'case-industrial'],
  ['/web-development', 'pages/web-development', 'web-development'],
  ['/web-development/design', 'pages/web-design', 'web-design'],
  ['/web-development/development', 'pages/web-development-build', 'web-development-build'],
  ['/web-development/conversion', 'pages/web-conversion', 'web-conversion'],
  ['/web-development/speed', 'pages/web-speed', 'web-speed'],
  ['/web-development/upkeep', 'pages/web-upkeep', 'web-upkeep'],
  ['/about', 'pages/about', 'about']
];
PAGE_ROUTES.forEach(([route, view, key]) => router.get(route, renderPage(view, key)));

// Old URLs go to their new homes, so existing links and search results still land somewhere useful.
const REDIRECTS = [
  ['/services', '/seo'],
  ['/services/seo', '/seo'],
  ['/services/meta-ads', '/seo'],
  ['/services/google-ads', '/seo'],
  ['/services/web-development', '/seo'],
  ['/resources', '/blog'],
  ['/resources/blog', '/blog'],
  ['/resources/case-studies', '/case-studies']
];
REDIRECTS.forEach(([from, to]) => router.get(from, (req, res) => res.redirect(301, to)));

router.get('/sitemap.xml', (req, res) => {
  const urls = PAGE_ROUTES.map(([route]) => route);
  getAllContent().forEach((item) => {
    urls.push(item.type === 'blog' ? `/blog/${item.slug}` : `/case-studies/${item.slug}`);
  });
  const body = urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n');
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
});

module.exports = router;
