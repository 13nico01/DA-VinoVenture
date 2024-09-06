const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


const generateUniqueLink = () => {
    const uniqueID = uuidv4();
    return `https://example.com/quiz/${uniqueID}`;
};

const generateQRCode = async (text, outputPath) => {
    try {
        await QRCode.toFile(outputPath, text);
        console.log('QR Code generated successfully!');
    } catch (err) {
        console.error('Error generating QR Code', err);
    }
};

const sendEmail = async (to, subject, text, htmlText, attachmentPath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'julianholzer12@gmail.com',
            pass: 'pvpt cyun dlfs gpiz',
        },
    });

    const mailOptions = {
        from: 'vinoventurehtlhl@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: htmlText,
        attachments: [
            {
                filename: path.basename(attachmentPath),
                path: attachmentPath,
                cid: 'qrcode' // Content-ID für Referenz im HTML
            },
        ],
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error('Error sending email', err);
    }
};

const main = async () => {
    const uniqueLink = generateUniqueLink();
    const qrPath = 'qrcode.png';

    await generateQRCode(uniqueLink, qrPath);

    const emailText = 'Hier ist der QR-Code zu deinem einmaligen Quiz.';
    const emailHtml = `
    <p>Hier ist der QR-Code zu deinem einmaligen Quiz:</p>
    <p><a href="${uniqueLink}">Klicke hier, um das Quiz zu besuchen.</a></p>
    <p>Oder scanne den QR-Code:</p>
    <img src="cid:qrcode" alt="QR Code" />
  `;

    await sendEmail('luca.aguiari86@gmail.com', 'Dein einmaliges Quiz', emailText, emailHtml, qrPath);
};

main();
