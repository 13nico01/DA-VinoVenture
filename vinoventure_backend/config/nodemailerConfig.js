const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test@gmail',
        pass: '',
    },
});

module.exports = transporter;
