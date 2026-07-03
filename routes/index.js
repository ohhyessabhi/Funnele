const express = require('express');
const router = express.Router();
const { industries, homeFaqs, homeMetrics } = require('../lib/services-data');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Funnele — White-Label Growth Execution for Agencies',
    description:
      'Funnele is the execution partner behind other agencies’ best work. Meta Ads, Google Ads, SEO and web development, delivered white-label under your brand.',
    industries,
    homeFaqs,
    homeMetrics
  });
});

module.exports = router;
