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
    `New enquiry from the Funnele website`,
    ``,
    `Name: ${name}`,
    `Store name: ${agency}`,
    `Work email: ${email}`,
    `Store website: ${website || '—'}`,
    `Problem: ${channel}`,
    `Platform: ${clients || '—'}`,
    ``,
    `Message:`,
    message || '—'
  ].join('\n');

  const html = `
    <h2>New enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Store name:</strong> ${escapeHtml(agency)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Store website:</strong> ${escapeHtml(website || '—')}</p>
    <p><strong>Problem:</strong> ${escapeHtml(channel)}</p>
    <p><strong>Platform:</strong> ${escapeHtml(clients || '—')}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message || '—').replace(/\n/g, '<br>')}</p>
  `;

  await transport.sendMail({
    from,
    to,
    replyTo: email,
    subject: `New Funnele enquiry: ${agency}`,
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
