const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (to, subject, text, htmlText, attachmentPath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'julianholzer12@gmail.com',
            pass: 'pvpt cyun dlfs gpiz', // Sicherstellen, dass du Umgebungsvariablen für sensible Daten nutzt
        },
    });

    const mailOptions = {
        from: 'julianholzer12@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: htmlText,
        attachments: [
            {
                filename: path.basename(attachmentPath),
                path: attachmentPath,
                cid: 'qrcode',
            },
        ],
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error('Error sending email', err);
        throw err;
    }
};

module.exports = sendEmail;
