// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to any email provider like Outlook, SMTP, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password if using Gmail
      },
    });

    try {
      // Email configuration
      await transporter.sendMail({
        from: `"${name}" <${email}>`, // Sender's email
        to: 'princegujjar1.pp@gmail.com', // The email where you want to receive the message
        subject: `New message from ${name}`, // Email subject
        text: message, // Plain text message
        html: `
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `, // HTML content of the message
      });

      // Return success response
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
