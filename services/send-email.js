const nodemailer = require('nodemailer');

async function sendEmail({ subject, text }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tonemail@gmail.com',
      pass: 'motdepasse_application'
    }
  });

  const mailOptions = {
    from: 'tonemail@gmail.com',
    to: 'destinataire@email.com',
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (err) {
    console.error('Erreur lors de l’envoi de l’email :', err.message);
  }
}

module.exports = sendEmail;
