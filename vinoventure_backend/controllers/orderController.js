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


exports.addOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status, shipping_cart_id } = req.body;
        
        if (!user_id || !total_amount || !status || !shipping_cart_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const query = `
            INSERT INTO orders (user_id, total_amount, status, shipping_cart_id)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [user_id, total_amount, status, shipping_cart_id]);
        
        res.status(201).json({
            message: 'Order created successfully',
            order_id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Shipping cart ID must be unique' });
        }
        return res.status(500).json({ error: err.message });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM orders`); 
      res.json({ users: rows });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

exports.getUserOrders = async (req, res) => {
    const userId = req.params.user_id;

    try {
        const [rows] = await db.query(
            `SELECT * FROM orders WHERE user_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.json({ orders: rows });
    } catch (err) {
        console.error("Error fetching user orders:", err);
        return res.status(500).json({ error: err.message });
    }
}