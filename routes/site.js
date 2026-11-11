const express = require('express');
const fs = require('fs');
const path = require('path');
const meta = require('../lib/site-meta.json');
const { getAllContent } = require('../lib/content');

const router = express.Router();
const BASE = (process.env.SITE_URL || 'https://funnele.com').replace(/\/$/, '');
const VIEWS = path.join(__dirname, '..', 'views');

function decode(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

// Read the FAQ questions and answers from a page template
function faqsFor(view) {
  const file = path.join(VIEWS, view + '.ejs');
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  const out = [];
  const re = /<details[^>]*>\s*<summary[^>]*>(.*?)<\/summary>\s*<p[^>]*>(.*?)<\/p>/gs;
  let m;
  while ((m = re.exec(html))) out.push({ q: decode(m[1]), a: decode(m[2]) });
  return out;
}

function breadcrumbs(routePath, lastName) {
  const parts = routePath.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: BASE + '/' }];
  let acc = '';
  parts.forEach((p, i) => {
    acc += '/' + p;
    const isLast = i === parts.length - 1;
    items.push({ name: isLast && lastName ? lastName : p.replace(/-/g, ' '), url: BASE + acc });
  });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url }))
  };
}

function jsonldFor(key, routePath, m) {
  const graph = [];
  const name = m.title.split('|')[0].trim();
  const isService = key !== 'home' && /^(seo|web-|problem-|services|problems)/.test(key);
  if (isService) {
    graph.push({
      '@type': 'Service',
      name,
      description: m.description,
      url: BASE + routePath,
      provider: { '@type': 'Organization', name: 'Funnele', url: BASE }
    });
  }
  const faqs = faqsFor(key === 'home' ? 'pages/home' : 'pages/' + key);
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    });
  }
  if (routePath !== '/') graph.push(breadcrumbs(routePath, name));
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function renderPage(view, key) {
  return (req, res) => {
    const m = meta[key];
    res.render(view, {
      title: m.title,
      description: m.description,
      keywords: m.keywords,
      canonical: BASE + m.path,
      ogImage: `/images/og/${key}.png`,
      jsonld: jsonldFor(key, m.path, m),
      extraCss: key === 'home' ? '/css/home.css' : null
    });
  };
}

const PAGE_ROUTES = [
  ['/', 'pages/home', 'home'],
  ['/seo', 'pages/seo', 'seo'],
  ['/seo/reporting', 'pages/seo-reporting', 'seo-reporting'],
  ['/services', 'pages/services', 'services'],
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
  ['/problems', '/services'],
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
