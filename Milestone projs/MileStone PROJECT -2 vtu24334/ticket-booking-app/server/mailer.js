const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS || '').replace(/\s/g, '')
  }
});

const sendOtpEmail = async (email, otp) => {
  const isMissingSmtpConfig =
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    process.env.SMTP_USER === 'your_email@gmail.com' ||
    process.env.SMTP_PASS === 'your_16_character_gmail_app_password';

  if (isMissingSmtpConfig) {
    throw new Error('Update SMTP_USER and SMTP_PASS in .env. For Gmail, use a 16-character Google App Password.');
  }

  try {
    await transporter.sendMail({
      from: `"Ticket Booking App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Ticket Booking OTP',
      text: `Your OTP for ticket booking is ${otp}. This code is valid for this booking verification.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Ticket Booking OTP</h2>
          <p>Your OTP for ticket booking is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>Enter this code in the ticket booking app to verify your email.</p>
        </div>
      `
    });
  } catch (error) {
    if (error.code === 'EAUTH') {
      throw new Error('Gmail rejected SMTP login. Check SMTP_USER and use a valid 16-character Google App Password in SMTP_PASS.');
    }

    throw error;
  }
};

module.exports = { sendOtpEmail };
