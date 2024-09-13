const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'julianholzer12@gmail.com',
        pass: 'pvpt cyun dlfs gpiz',
    },
});

module.exports = transporter;
