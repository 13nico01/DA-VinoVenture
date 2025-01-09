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


exports.addOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status, shipping_cart_id, customerEmail } = req.body;

        // Überprüfen, ob alle erforderlichen Felder vorhanden sind
        if (!user_id || !total_amount || !status || !shipping_cart_id || !customerEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Bestellung in die Datenbank einfügen
        const insertOrderQuery = `
            INSERT INTO orders (user_id, total_amount, status, shipping_cart_id)
            VALUES (?, ?, ?, ?)
        `;
        const [insertResult] = await db.execute(insertOrderQuery, [user_id, total_amount, status, shipping_cart_id]);

        // Weinpakete basierend auf der shipping_cart_id abrufen
        const fetchWinePackagesQuery = `
            SELECT wp.package_name, wpsc.quantity
            FROM wine_packages_shipping_cart wpsc
            JOIN wine_packages wp ON wpsc.wine_package_id = wp.wine_package_id
            WHERE wpsc.shipping_cart_id = ?
        `;
        const [winePackages] = await db.query(fetchWinePackagesQuery, [shipping_cart_id]);

        // Bestellung für die E-Mail-Vorbereitung erstellen
        const order = {
            id: insertResult.insertId,
            customerEmail,
        };

        // Bestellbestätigungs-E-Mail senden
        await sendOrderConfirmationEmail(order, winePackages);

        // Erfolgsantwort zurückgeben
        res.status(201).json({
            message: 'Order created successfully',
            order_id: insertResult.insertId,
            winePackages, // Weinpakete in der Antwort zurückgeben
        });

        // **Kein Löschen des Warenkorbs hier**
    } catch (err) {
        console.error('Error while creating order:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Shipping cart ID must be unique' });
        }
        return res.status(500).json({ error: err.message });
    }
};







exports.shipOrder = async (req, res) => {

}

// Funktion zum Abrufen aller Bestellungen
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM orders`);
        res.json({ orders: rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    const userId = req.params.user_id;

    try {
        // Abrufen der Bestellungen eines Nutzers
        const [orders] = await db.query(
            `SELECT * FROM orders WHERE user_id = ?`,
            [userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Abrufen der Weinpakete für jede Bestellung
        const ordersWithWinePackages = await Promise.all(
            orders.map(async (order) => {
                const [winePackages] = await db.query(
                    `
                    SELECT wp.package_name, wpsc.quantity
                    FROM wine_packages_shipping_cart wpsc
                    JOIN wine_packages wp ON wpsc.wine_package_id = wp.wine_package_id
                    WHERE wpsc.shipping_cart_id = ?
                    `,
                    [order.shipping_cart_id]
                );

                return { ...order, winePackages };
            })
        );

        // Antwort mit den Bestellungen und den Weinpaketen zurückgeben
        res.json({ orders: ordersWithWinePackages });
    } catch (err) {
        console.error('Error fetching user orders:', err);
        return res.status(500).json({ error: err.message });
    }
};




