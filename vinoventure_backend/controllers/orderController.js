const { v4: uuidv4 } = require('uuid');
const path = require('path');
const transporter = require('../config/nodemailerConfig');

let orders = [];



// Bestellbestätigungs E-Mail
const sendOrderConfirmationEmail = (order) => {
    const emailOptions = {
        from: '"Vino Venture" <no-reply@vino-venture.com>',
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
    const { email } = req.body;

    const newOrder = {
        email,
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

    
    try {
    
        const emailOptions = {
            from: '"Vino Venture" <no-reply@vino-venture.com>',
            to: order.customerEmail,
            subject: 'Dein einmaliges Quiz',
            html: `
                Test
            `
        };

        await transporter.sendMail(emailOptions);
        order.status = 'shipped';

        res.status(200).json({ message: 'Quiz shipped successfully!' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'Error processing the order' });
    }
};
