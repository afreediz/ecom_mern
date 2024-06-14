const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const info = await transporter.sendMail({
      from: 'ecommerce@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking on the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = { sendVerificationEmail };