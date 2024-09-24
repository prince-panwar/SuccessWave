import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Create a Nodemailer transporter using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to any email provider like Outlook, SMTP, etc.
    auth: {
      user: process.env.NEXT_EMAIL_USER, // Your email address from environment variables
      pass: process.env.NEXT_EMAIL_PASS, // Your email password or app password from environment variables
    },
  });

  try {
    // Email configuration
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's email
      to: 'growwithsuccesswave@gmail.com', // The email where you want to receive the message
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
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
