const path = require('path');
const fs = require('fs/promises');
const { db } = require('../config/database');
const multer = require('multer');

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


// Speicherort und Dateinamen für hochgeladene Bilder konfigurieren
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imagesFolder = path.join(__dirname, '../images');
        cb(null, imagesFolder); // Speicherort für Bilder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Eindeutiger Dateiname
    },
});

// Multer-Middleware für das Hochladen von Bildern
const upload = multer({ storage });

exports.updateImagePaths = async (req, res) => {


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

exports.getImagesByPackageId = async (req, res) => {
    const packageId = req.params.packageId;

    try {
        // SQL-Abfrage ausführen
        const [rows] = await db.query(`
            SELECT
                w.image_name,
                w.image_path
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
            return res.status(404).send('<p>Keine Bilder für dieses Weinpaket gefunden.</p>');
        }

        // HTML-Antwort mit den Bildern erstellen
        let htmlResponse = '<div style="display: flex; flex-wrap: wrap; gap: 16px;">';
        rows.forEach(row => {
            const imageUrl = `/images/${row.image_name}`;
            htmlResponse += `
                <div style="text-align: center;">
                    <img src="${imageUrl}" alt="Weinbild" style="width: 200px; height: auto;">
                </div>
            `;
        });
        htmlResponse += '</div>';

        res.send(htmlResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send('<p>Fehler beim Abrufen der Bilder für das Weinpaket</p>');
    }
};

// Endpunkt zum Hochladen eines neuen Bildes
exports.uploadImage = async (req, res) => {
    try {
        // Multer verarbeitet die Datei
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Fehler beim Hochladen des Bildes:', err);
                return res.status(500).json({ error: 'Fehler beim Hochladen des Bildes.' });
            }

            // Datei erfolgreich hochgeladen
            const { wine_id } = req.body; // Erwartet die Wein-ID im Body
            const imageName = req.file.filename; // Der Dateiname des hochgeladenen Bildes
            const imagePath = path.join(__dirname, '../images', imageName);

            try {
                // Aktualisiere den Bildpfad in der Datenbank
                const updateQuery = 'UPDATE wine SET image_name = ?, image_path = ? WHERE wine_id = ?';
                await db.query(updateQuery, [imageName, imagePath, wine_id]);
                console.log(`Bildpfad für Wein ID ${wine_id} wurde aktualisiert`);

                // Rufe updateImagePaths auf, um sicherzustellen, dass alle Pfade aktuell sind
                await controller.updateImagePaths();

                res.json({ message: 'Bild wurde erfolgreich hochgeladen und Pfade aktualisiert.' });
            } catch (dbErr) {
                console.error('Fehler beim Aktualisieren des Bildpfades:', dbErr);
                res.status(500).json({ error: 'Fehler beim Aktualisieren des Bildpfades.' });
            }
        });
    } catch (err) {
        console.error('Unerwarteter Fehler:', err);
        res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
    }
};

const imagesFolder = path.join(__dirname, "/images");
exports.getTestImageRoute = async (req, res) => {
    try {
        // Alle Dateien im images-Verzeichnis lesen
        const files = await fs.readdir(imagesFolder);

        // Nur .webp-Bilder filtern
        const imageFiles = files.filter(file => file.endsWith('.webp'));

        if (imageFiles.length === 0) {
            return res.status(404).json({ error: "Keine .webp Bilder gefunden." });
        }

        // Alle Bildpfade zurückgeben
        const imagePaths = imageFiles.map(file => `/images/${file}`);

        // Erfolgreiche Antwort mit den Bildpfaden
        res.json({ images: imagePaths });
    } catch (err) {
        console.error("Fehler beim Lesen des Verzeichnisses:", err.message);
        res.status(500).json({ error: "Fehler beim Abrufen der Bilder." });
    }
};