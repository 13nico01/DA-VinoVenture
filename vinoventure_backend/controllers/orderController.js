const { v4: uuidv4 } = require('uuid');
const path = require('path');
const generateQRCode = require('../config/qrCodeConfig');
const transporter = require('../config/nodemailerConfig');

let orders = [];

// Function to generate a unique link for the quiz
const generateUniqueLink = () => {
    const uniqueID = uuidv4();
    return `https://example.com/quiz/${uniqueID}`;
};

// Bestellbestätigungs E-Mail
const sendOrderConfirmationEmail = (order) => {
    const emailOptions = {
        from: 'julianholzer12@gmail.com',
        to: order.customerEmail,
        subject: 'Deine Bestellung wurde erfolgreich aufgegeben!',
        text: `Deine Bestellung mit der ID ${order.id} wurde erfolgreich aufgegeben. Du erhältst eine weitere E-Mail, sobald dein Paket versandt wird.`,
    };

    transporter.sendMail(emailOptions)
        .then(() => {
            console.log('Bestellbestätigung erfolgreich versendet.');
        })
        .catch(error => {
            console.error('Fehler beim Senden der Bestellbestätigung:', error);
        });
};

// Create a new order
exports.createOrder = async (req, res) => {
    const { customerEmail } = req.body;

    const newOrder = {
        id: uuidv4(),
        customerEmail,
        status: 'pending',
    };

    orders.push(newOrder);
    sendOrderConfirmationEmail(newOrder);
    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder.id });
};

// Function to ship an order and send QR code with shipping confirmation
exports.shipOrder = async (req, res) => {
    const { orderId } = req.params;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const uniqueLink = generateUniqueLink();
    const qrPath = path.join(__dirname, '../public/qrcode.png');

    try {
        await generateQRCode(uniqueLink, qrPath);

        const emailOptions = {
            from: 'julianholzer12@gmail.com',
            to: order.customerEmail,
            subject: 'Dein einmaliges Quiz',
            text: 'Hier ist der QR-Code zu deinem einmaligen Quiz.',
            html: `
                <p>Hier ist der QR-Code zu deinem einmaligen Quiz:</p>
                <p><a href="${uniqueLink}">Klicke hier, um das Quiz zu besuchen.</a></p>
                <p>Oder scanne den QR-Code:</p>
                <img src="cid:qrcode" alt="QR Code" />
            `,
            attachments: [
                {
                    filename: 'qrcode.png',
                    path: qrPath,
                    cid: 'qrcode',
                },
            ],
        };

        await transporter.sendMail(emailOptions);
        order.status = 'shipped';

        res.status(200).json({ message: 'Quiz shipped successfully!' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'Error processing the order' });
    }
};