const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../lib/mailer');

router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact — Funnele',
    description: 'Start a white-label partnership conversation with Funnele.',
    submitted: req.query.sent === '1',
    error: null
  });
});

router.post('/', async (req, res) => {
  const { name, agency, email, website, channel, clients, message, company } = req.body;

  // Honeypot field ("company") — bots fill hidden fields, humans don't.
  if (company) {
    return res.redirect('/contact?sent=1');
  }

  if (!name || !agency || !email) {
    return res.status(400).render('contact', {
      title: 'Contact — Funnele',
      description: 'Start a white-label partnership conversation with Funnele.',
      submitted: false,
      error: 'Please fill in your name, agency and work email before sending.'
    });
  }

  try {
    await sendContactEmail({ name, agency, email, website, channel, clients, message });
    return res.redirect('/contact?sent=1');
  } catch (err) {
    console.error('Contact form email failed:', err);
    return res.status(500).render('contact', {
      title: 'Contact — Funnele',
      description: 'Start a white-label partnership conversation with Funnele.',
      submitted: false,
      error: 'Something went wrong sending your message. Please email abhijeet@funnele.com directly.'
    });
  }
});

module.exports = router;
