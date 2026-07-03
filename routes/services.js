const express = require('express');
const router = express.Router();
const { services, process } = require('../lib/services-data');

router.get('/', (req, res) => {
  res.render('services/overview', {
    title: 'Services — Funnele White-Label Execution',
    description:
      'Meta Ads, Google Ads, SEO and web development, delivered white-label. See how the Funnele partnership process works end to end.',
    services,
    process
  });
});

services.forEach((service) => {
  router.get(`/${service.slug}`, (req, res) => {
    res.render('services/detail', {
      title: `${service.name} — Funnele White-Label Execution`,
      description: service.positioning,
      service
    });
  });
});

module.exports = router;
