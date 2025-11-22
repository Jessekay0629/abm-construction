const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'site.contactform01@gmail.com',
      pass: 'mrld pelh yeav aqtq'
    }
  });

  const mailOptions = {
    from: `"${name}" <site.contactform01@gmail.com>`,
    replyTo: `"${name}" <${email}>`,
    to: "info@abmconltd.com",
    subject: `Website Form: ${subject}`,
    messageId: `<form-${Date.now()}-${Math.random().toString(36).substring(2, 15)}@euler-civil.com>`,
    headers: {
      'X-Entity-Ref-ID': `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    },
    text: `
    New Contact Form Submission

    Name: ${name}
    Email: ${email}
    Subject: ${subject}

    Message:
    ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #555;">Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 20px;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
          <p>Sent from A.B.M Construction website contact form</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email. Please try again later.',
        error: error.message 
      });
    }
    
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: info.messageId
    });
  });
});

module.exports = router;