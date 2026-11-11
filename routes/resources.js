const express = require('express');
const router = express.Router();
const { getAllContent, getBySlug } = require('../lib/content');

const BASE = (process.env.SITE_URL || 'https://funnele.com').replace(/\/$/, '');
function articleLd(item) {
  const url = `${BASE}/${item.type === 'blog' ? 'blog' : 'case-studies'}/${item.slug}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.excerpt || item.title,
    datePublished: item.date ? new Date(item.date).toISOString() : undefined,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Funnele', url: BASE },
    publisher: { '@type': 'Organization', name: 'Funnele', url: BASE }
  }).replace(/</g, '\\u003c');
}


router.get('/blog', (req, res) => {
  const items = getAllContent().filter((item) => item.type === 'blog');
  res.render('blog-index', {
    title: 'Journal: ecommerce SEO, AEO and GEO articles | Funnele',
    description: 'Practical articles on ecommerce SEO, AEO, GEO and product pages, written for store owners and the people who run their sites.',
    keywords: 'ecommerce seo articles, seo articles for ecommerce',
    canonical: `${BASE}/blog`,
    extraCss: null,
    items
  });
});

router.get('/blog/:slug', (req, res, next) => {
  const item = getBySlug(req.params.slug);
  if (!item || item.type !== 'blog') return next();
  res.render('article', {
    title: `${item.title} | Funnele`,
    description: item.excerpt || item.title,
    keywords: '',
    ogImage: '/images/og/default.png',
    jsonld: articleLd(item),
    canonical: `${BASE}/blog/${item.slug}`,
    extraCss: null,
    item
  });
});

router.get('/case-studies/:slug', (req, res, next) => {
  const item = getBySlug(req.params.slug);
  if (!item || item.type !== 'case-study') return next();
  res.render('article', {
    title: `${item.title} | Funnele`,
    description: item.excerpt || item.title,
    keywords: '',
    ogImage: '/images/og/default.png',
    jsonld: articleLd(item),
    canonical: `${BASE}/case-studies/${item.slug}`,
    extraCss: null,
    item
  });
});

// Old /resources/:slug links move to their new paths.
router.get('/resources/:slug', (req, res, next) => {
  const item = getBySlug(req.params.slug);
  if (!item) return next();
  res.redirect(301, item.type === 'blog' ? `/blog/${item.slug}` : `/case-studies/${item.slug}`);
});

module.exports = router;
