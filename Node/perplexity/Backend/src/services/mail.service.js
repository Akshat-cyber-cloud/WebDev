import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendEmail({ to, subject, html, text = '' }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    });

    console.log('Email sent:', info.messageId);
    return `Email sent successfully to ${to}`;
  } catch (error) {
    console.error('Email send failed:', error);
    return `Failed to send email to ${to}. Error: ${error.message}`;
  }
}