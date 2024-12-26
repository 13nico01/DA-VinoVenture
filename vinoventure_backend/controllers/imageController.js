const path = require('path');
const fs = require('fs/promises');
const { db } = require('../config/database');

/**
 * @swagger
 * /wine/update-image-paths:
 *   post:
 *     summary: Aktualisiert die Bildpfade in der Datenbank
 *     tags: [Wine]
 *     description: Überprüft die Existenz von Bildern im Dateisystem und aktualisiert die Bildpfade in der Datenbank.
 *     responses:
 *       200:
 *         description: Erfolgreiche Aktualisierung der Bildpfade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bildpfade wurden erfolgreich aktualisiert."
 *       500:
 *         description: Fehler bei der Aktualisierung der Bildpfade.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Fehler beim Aktualisieren der Bildpfade."
 */


exports.updateImagePaths = async (req, res) => {
    const imagesFolder = path.join(__dirname, '../images');

    try {
        const [results] = await db.query('SELECT wine_id, image_name FROM wine');

        const updatePromises = results.map(async (wine) => {
            const imagePath = path.join(imagesFolder, wine.image_name);

            try {
                await fs.access(imagePath);

                const updateQuery = 'UPDATE wine SET image_path = ? WHERE wine_id = ?';
                await db.query(updateQuery, [imagePath, wine.wine_id]);
                console.log(`Pfad für Wein ID ${wine.wine_id} wurde aktualisiert`);
            } catch (err) {
                console.error(`Bild für Wein ID ${wine.wine_id} konnte nicht gefunden werden: ${err.message}`);
            }
        });

        await Promise.all(updatePromises);
        res.json({ message: 'Bildpfade wurden erfolgreich aktualisiert.' });
    } catch (err) {
        console.error('Datenbankfehler:', err);
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Bildpfade.' });
    }
};

exports.getWinesByPackageId = async (req, res) => {
    const packageId = req.params.packageId;

    try {
        // SQL-Abfrage ausführen
        const [rows] = await db.query(`
            SELECT
                w.wine_name,
                w.image_name,
                w.image_path,
                wpw.quantity
            FROM
                wine_packages wp
            JOIN
                wine_package_wine wpw ON wpw.wine_package_id = wp.wine_package_id
            JOIN
                wine w ON w.wine_id = wpw.wine_id
            WHERE
                wp.wine_package_id = ?
        `, [packageId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Keine Weine für dieses Weinpaket gefunden.' });
        }

        const wines = rows.map(row => ({
            wine_name: row.wine_name,
            image_name: row.image_name,
            image_path: row.image_path,
            quantity: row.quantity
        }));

        res.json(wines);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Weine für das Weinpaket' });
    }
};

