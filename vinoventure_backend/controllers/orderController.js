const path = require('path');
const transporter = require('../config/nodemailerConfig');
const { db } = require('../config/database');

const sendOrderConfirmationEmail = async (order) => {
    try {
        const emailOptions = {
            from: '"Vino Venture" <' + process.env.EMAIL + '>',
            to: order.customerEmail,
            subject: 'Deine Bestellung wurde erfolgreich aufgegeben!',
            text: `Deine Bestellung mit der ID ${order.id} wurde erfolgreich aufgegeben. Du erhältst eine weitere E-Mail, sobald dein Paket versandt wird.`,
        };

        await transporter.sendMail(emailOptions);
        console.log('Bestellbestätigung erfolgreich versendet.');
    } catch (error) {
        console.error('Fehler beim Senden der Bestellbestätigung:', error);
    }
};



exports.addOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status, shipping_cart_id, customerEmail } = req.body;

        // Überprüfen, ob alle erforderlichen Felder vorhanden sind
        if (!user_id || !total_amount || !status || !shipping_cart_id || !customerEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // SQL-Query zum Hinzufügen einer Bestellung
        const query = `
            INSERT INTO orders (user_id, total_amount, status, shipping_cart_id)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [user_id, total_amount, status, shipping_cart_id]);

        // E-Mail senden und auf den Abschluss warten
        const order = {
            id: result.insertId,
            customerEmail: "julianholzer12@gmail.com",
        };

        // Warten, bis die E-Mail gesendet wurde
        await sendOrderConfirmationEmail(order);

        // Erfolgsantwort senden
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