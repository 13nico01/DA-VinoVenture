const path = require('path');
const transporter = require('../config/nodemailerConfig');
const { db } = require('../config/database');

// Funktion zum Senden der Bestellbestätigungs-E-Mail
const sendOrderConfirmationEmail = async (order, winePackages) => {
    try {
        // Formatieren der Weinpakete für die E-Mail
        const winePackageList = winePackages
            .map(pkg => `- ${pkg.package_name} (${pkg.quantity}x)`)
            .join('\n');

        // E-Mail-Optionen mit dynamischen Inhalten
        const emailOptions = {
            from: '"VinoVenture" <no-reply@vino-venture.com>',
            to: order.customerEmail,
            subject: 'Ihre Bestellung wurde erfolgreich aufgegeben!',
            text: `Guten Tag,

Ihre Bestellung wurde erfolgreich aufgegeben. Sie erhalten eine weitere E-Mail, sobald Ihr Paket versandt wird.

Hier sind die Details Ihrer Bestellung:
${winePackageList}

Vielen Dank für Ihre Bestellung bei VinoVenture!
            `,
        };

        // E-Mail senden
        await transporter.sendMail(emailOptions);
        console.log('Bestellbestätigung erfolgreich versendet.');
    } catch (error) {
        console.error('Fehler beim Senden der Bestellbestätigung:', error);
    }
};

// Funktion zum Senden der Bestellbestätigungs-E-Mail
const sendShippingEmail = async (order, winePackages) => {
    try {
        // Formatieren der Weinpakete für die E-Mail
        const winePackageList = winePackages
            .map(pkg => `- ${pkg.package_name} (${pkg.quantity}x)`)
            .join('\n');

        // E-Mail-Optionen mit dynamischen Inhalten
        const emailOptions = {
            from: '"VinoVenture" <no-reply@vino-venture.com>',
            to: order.customerEmail,
            subject: 'Ihre Bestellung wurde erfolgreich versandt!',
            text: `Guten Tag,

Ihre Bestellung wurde erfolgreich versandt.
Hier sind die Details Ihrer Bestellung:
${winePackageList}

Vielen Dank für Ihre Bestellung bei VinoVenture!
            `,
        };

        // E-Mail senden
        await transporter.sendMail(emailOptions);
        console.log('Versandsbestätigung erfolgreich versendet.');
    } catch (error) {
        console.error('Fehler beim Senden der Versandsbestätigung:', error);
    }
};


// Funktion zum Hinzufügen einer Bestellung
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

        // Weinpakete basierend auf der shipping_cart_id abrufen
        const [winePackages] = await db.query(
            `
            SELECT wp.wine_package_id, wp.package_name, wpsc.quantity
            FROM wine_packages_shipping_cart wpsc
            JOIN wine_packages wp ON wpsc.wine_package_id = wp.wine_package_id
            WHERE wpsc.shipping_cart_id = ?
            `,
            [shipping_cart_id]
        );

        // Weinpakete in der order_wine_packages-Tabelle speichern
        for (const pkg of winePackages) {
            const insertPackageQuery = `
                INSERT INTO order_wine_packages (order_id, wine_package_id, quantity)
                VALUES (?, ?, ?)
            `;
            await db.execute(insertPackageQuery, [result.insertId, pkg.wine_package_id, pkg.quantity]);
        }

        // E-Mail senden
        const order = {
            id: result.insertId,
            customerEmail,
        };

        await sendOrderConfirmationEmail(order, winePackages);

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


// Funktion zum Versenden einer Bestellung
exports.shipOrder = async (req, res) => {
    try {
        const { order_id } = req.body;

        // Überprüfen, ob die order_id bereitgestellt wurde
        if (!order_id) {
            return res.status(400).json({ error: 'Missing required field: order_id' });
        }

        // Überprüfen, ob die Bestellung existiert und die user_id abrufen
        const [order] = await db.query(
            `SELECT user_id FROM orders WHERE order_id = ?`,
            [order_id]
        );

        if (order.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const user_id = order[0].user_id;

        // Kunden-E-Mail-Adresse aus der users-Tabelle abrufen
        const [user] = await db.query(
            `SELECT email FROM users WHERE user_id = ?`,
            [user_id]
        );

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const customerEmail = user[0].email;

        // Status der Bestellung auf "shipped" setzen
        const updateQuery = `
            UPDATE orders
            SET status = 'shipped'
            WHERE order_id = ?
        `;
        await db.execute(updateQuery, [order_id]);

        // E-Mail senden
        await sendShippingEmail({
            orderId: order_id,
            customerEmail,
        });

        // Erfolgsantwort senden
        res.status(200).json({
            message: 'Order status updated to shipped successfully',
            order_id,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


// Funktion zum Abrufen aller Bestellungen
exports.getAllOrders = async (req, res) => {
    try {
        // Abrufen aller Bestellungen
        const [orders] = await db.query(`
            SELECT * FROM orders
        `);

        // Für jede Bestellung die zugehörigen Weinpakete abrufen
        for (let order of orders) {
            // Abrufen der Weinpakete für die aktuelle Bestellung
            const [winePackages] = await db.query(`
                SELECT wp.package_name, owp.quantity
                FROM order_wine_packages owp
                JOIN wine_packages wp ON owp.wine_package_id = wp.wine_package_id
                WHERE owp.order_id = ?
            `, [order.order_id]);

            // Weinpakete zur Bestellung hinzufügen
            order.wine_packages = winePackages;
        }

        // Erfolgreiche Antwort mit Bestellungen und Weinpaketen
        res.json({ orders });
    } catch (err) {
        console.error("Error fetching orders:", err);
        return res.status(500).json({ error: err.message });
    }
};



// Funktion zum Abrufen der Bestellungen eines bestimmten Nutzers
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
};