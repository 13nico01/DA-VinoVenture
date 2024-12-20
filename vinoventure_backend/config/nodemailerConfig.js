const nodemailer = require('nodemailer');
require('dotenv').config();

// Erstelle einen Transporter mit den SMTP-Daten von Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',  // Hostinger SMTP-Server
  port: 587,                   // Verwende Port 587 für TLS
  secure: false,               // TLS verwenden (false für Port 587)
  auth: {
    user: process.env.EMAIL_USER,  // Verwendet die Umgebungsvariable
    pass: process.env.EMAIL_PASS,  // Verwendet die Umgebungsvariable
  }
});

module.exports = transporter;
