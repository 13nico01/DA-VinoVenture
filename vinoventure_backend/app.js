const express = require('express');
const { v4: uuidv4 } = require('uuid');
const generateQRCode = require('generateQRCode');
const sendEmail = require('sendEmail');
const path = require('path');


const app = express();
app.use(express.json());


let orders = [];


const generateUniqueLink = () => {
    const uniqueID = uuidv4();
    return `https://example.com/quiz/${uniqueID}`;
};

// Endpoint to create a new order
app.post('/order', (req, res) => {
    const { customerEmail } = req.body;

    // Create and store a new order
    const newOrder = {
        id: uuidv4(),
        customerEmail,
        status: 'pending',
    };

    orders.push(newOrder);
    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder.id });
});

// Endpoint to ship the order and send the QR code
app.post('/ship-order/:orderId', async (req, res) => {
    const { orderId } = req.params;

    // Find the order by ID
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Generate unique quiz link and QR code
    const uniqueLink = generateUniqueLink();
    const qrPath = path.join(__dirname, 'qrcode.png');

    try {

        await generateQRCode(uniqueLink, qrPath);


        const emailText = 'Hier ist der QR-Code zu deinem einmaligen Quiz.';
        const emailHtml = `
            <p>Hier ist der QR-Code zu deinem einmaligen Quiz:</p>
            <p><a href="${uniqueLink}">Klicke hier, um das Quiz zu besuchen.</a></p>
            <p>Oder scanne den QR-Code:</p>
            <img src="cid:qrcode" alt="QR Code" />
        `;

        // Send the email
        await sendEmail(order.customerEmail, 'Dein einmaliges Quiz', emailText, emailHtml, qrPath);

        // Update order status
        order.status = 'shipped';
        res.status(200).json({ message: 'Quiz shipped successfully!' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'Error processing the order' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
