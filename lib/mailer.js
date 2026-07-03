const nodemailer = require('nodemailer');

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendContactEmail(fields) {
  const { name, agency, email, website, channel, clients, message } = fields;

  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL || 'abhijeet@funnele.com';
  const from = process.env.SMTP_FROM || `"Funnele Website" <${process.env.SMTP_USER}>`;

  const text = [
    `New partnership inquiry from the Funnele website`,
    ``,
    `Name: ${name}`,
    `Agency: ${agency}`,
    `Work email: ${email}`,
    `Agency website: ${website || '—'}`,
    `Channel: ${channel}`,
    `Approx. active clients: ${clients || '—'}`,
    ``,
    `Message:`,
    message || '—'
  ].join('\n');

  const html = `
    <h2>New partnership inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Agency:</strong> ${escapeHtml(agency)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Agency website:</strong> ${escapeHtml(website || '—')}</p>
    <p><strong>Channel:</strong> ${escapeHtml(channel)}</p>
    <p><strong>Approx. active clients:</strong> ${escapeHtml(clients || '—')}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message || '—').replace(/\n/g, '<br>')}</p>
  `;

  await transport.sendMail({
    from,
    to,
    replyTo: email,
    subject: `New Funnele partnership inquiry — ${agency}`,
    text,
    html
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { sendContactEmail };
