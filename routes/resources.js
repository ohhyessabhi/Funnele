const express = require('express');
const router = express.Router();
const { getAllContent, getBySlug } = require('../lib/content');

router.get('/', (req, res) => {
  res.redirect('/resources/blog');
});

router.get('/blog', (req, res) => {
  const items = getAllContent().filter((item) => item.type === 'blog');
  res.render('resources', {
    title: 'Blog — Funnele',
    description: 'Notes on white-label execution and ecommerce growth from the Funnele team.',
    items,
    pageType: 'blog',
    heading: 'Notes from behind the scenes.',
    subhead: "Notes on white-label execution, ecommerce growth, and what we've learned running Meta, Google, SEO and web dev across partner accounts."
  });
});

router.get('/case-studies', (req, res) => {
  const items = getAllContent().filter((item) => item.type === 'case-study');
  res.render('resources', {
    title: 'Case Studies — Funnele',
    description: 'Case studies from live partner accounts we execute under white-label.',
    items,
    pageType: 'case-study',
    heading: 'Real accounts. Real execution.',
    subhead: 'Case studies from live partner accounts — the scope, the execution, and the outcome, delivered under our partner agencies\' brands.'
  });
});

router.get('/:slug', (req, res, next) => {
  const item = getBySlug(req.params.slug);
  if (!item) return next(); // falls through to 404
  res.render('article', {
    title: `${item.title} — Funnele`,
    description: item.excerpt || item.title,
    item
  });
});

module.exports = router;
