const QRCode = require('qrcode');

const generateQRCode = async (text, outputPath) => {
    try {
        await QRCode.toFile(outputPath, text);
        console.log('QR Code generated successfully!');
    } catch (err) {
        console.error('Error generating QR Code', err);
        throw err;
    }
};

module.exports = generateQRCode;
