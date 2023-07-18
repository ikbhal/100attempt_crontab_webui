// npm install @sendgrid/mail

const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

// Set the email details
const email = {
  to: 'recipient@example.com',
  from: 'sender@example.com',
  subject: 'Sending an email using SendGrid',
  text: 'Hello, this is a test email sent using SendGrid with Node.js!',
};
