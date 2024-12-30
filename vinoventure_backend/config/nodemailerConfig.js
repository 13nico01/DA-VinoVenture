const nodemailer = require('nodemailer');
require('dotenv').config({ path: './mail.env' });

// Erstelle einen Transporter mit den SMTP-Daten von Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',  
  port: 587,                   
  secure: false,               
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,  
  }
});

transporter.sendMail({
  from: '"Test" <' + process.env.EMAIL + '>',
  to: 'recipient@example.com',
  subject: 'Testnachricht',
  text: 'Dies ist eine Testnachricht.',
})
  .then(() => {
    console.log('Test-E-Mail erfolgreich gesendet.');
  })
  .catch(error => {
    console.error('Fehler beim Senden der Test-E-Mail:', error);
  });



module.exports = transporter;
