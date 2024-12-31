const nodemailer = require('nodemailer');
require('dotenv').config();

// Erstelle einen Transporter mit den SMTP-Daten von Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',  
  port: 587,                   
  secure: false,               
  auth: {
    user: "no-reply@vino-venture.com",
    pass: "VinoVenture2024!",  
  }
});

module.exports = transporter;
