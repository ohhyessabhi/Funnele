const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../lib/mailer');

const BASE = (process.env.SITE_URL || 'https://funnele.com').replace(/\/$/, '');

function pageLocals(extra = {}) {
  return {
    title: 'Book a free ecommerce SEO analysis | Funnele',
    description: 'Book a free 30-minute call. You get a written analysis of your store and a price only after you have seen it.',
    keywords: 'ecommerce seo analysis, free seo audit for ecommerce',
    canonical: `${BASE}/contact`,
    extraCss: null,
    submitted: false,
    error: null,
    ...extra
  };
}

router.get('/', (req, res) => {
  res.render('pages/contact', pageLocals({ submitted: req.query.sent === '1' }));
});

router.post('/', async (req, res) => {
  const { name, agency, email, website, channel, clients, message, company } = req.body;

  // Honeypot: bots fill hidden fields, people don't.
  if (company) return res.redirect('/contact?sent=1');

  if (!name || !agency || !email) {
    return res.status(400).render('pages/contact', pageLocals({
      error: 'Please add your name, store name and work email before sending.'
    }));
  }

  try {
    await sendContactEmail({ name, agency, email, website, channel, clients, message });
    return res.redirect('/contact?sent=1');
  } catch (err) {
    console.error('Contact form email failed:', err);
    return res.status(500).render('pages/contact', pageLocals({
      error: 'Something went wrong sending your message. Please email the team directly.'
    }));
  }
});

module.exports = router;
