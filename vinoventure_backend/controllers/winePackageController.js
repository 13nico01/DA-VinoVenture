const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 * tags:
 *      name: WinePackage
 *      description: WinePackages
 */

/**
 * @swagger
 * /wine-packages/add-packages:
 *   post:
 *     summary: Add WinePackage
 *     tags: [WinePackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - package_name
 *               - description
 *               - wine_count
 *               - vintner
 *               - price
 *               - suitable_for_persons
 *             properties:
 *               package_name:
 *                 type: string
 *                 description: Name des Weinpakets
 *               description:
 *                 type: string
 *                 description: Beschreibung des Weinpakets
 *               wine_count:
 *                 type: integer
 *                 description: Anzahl der Weine im Paket
 *               vintner:
 *                 type: string
 *                 description: Name des Winzers
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preis des Pakets
 *               suitable_for_persons:
 *                 type: integer
 *                 description: Anzahl der Personen, für die das Paket geeignet ist
 *     responses:
 *       201:
 *         description: Wine-Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weinpaket hinzugefügt!
 *                 id:
 *                   type: integer
 *                   description: ID des hinzugefügten Pakets
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /wine-packages/get-packages:
 *  get:
 *    summary: Get all WinePackages
 *    tags: [WinePackage]
 *    responses:
 *       200:
 *         description: WinePackages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wine_package_id:
 *                         type: integer
 *                         description: ID des Weinpakets
 *                       package_name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       wine_count:
 *                         type: integer
 *                       vintner:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       suitable_for_persons:
 *                         type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
 
 /**
 * @swagger
 * /wine-packages/delete-package/{id}:
 *   delete:
 *     summary: Delete a WinePackage
 *     tags: [WinePackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the WinePackage to delete
 *     responses:
 *       200:
 *         description: WinePackage deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weinpaket gelöscht!
 *       404:
 *         description: WinePackage not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Weinpaket nicht gefunden!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /wine-packages/count:
 *   get:
 *     summary: Get the count of WinePackages
 *     tags: [WinePackage]
 *     responses:
 *       200:
 *         description: WinePackage count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Anzahl der Weinpakete
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */




exports.addWinePackage = async (req, res) => {
  const {
    package_name,
    description,
    wine_count,
    vintner,
    price,
    suitable_for_persons,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO wine_packages (package_name, description, wine_count, vintner, price, suitable_for_persons)
            VALUES (?, ?, ?, ?, ?, ?)`,
      [
        package_name,
        description,
        wine_count,
        vintner,
        price,
        suitable_for_persons,
      ]
    );

    res
      .status(201)
      .json({ message: "Weinpaket hinzugefügt!", id: result.insertId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getWinePackages = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM wine_packages`);
    res.json({ packages: rows });
  } catch (err) {
    console.error("Datenbankabfrage fehlgeschlagen:", err); // Logging für Fehler
    return res.status(500).json({ error: err.message });
  }
};


exports.getWinePackageById = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM wine_packages WHERE wine_package_id = ?`);
    res.json({ packages: rows });
  } catch (err) {
    console.error("Datenbankabfrage fehlgeschlagen:", err); // Logging für Fehler
    return res.status(500).json({ error: err.message });
  }
};

exports.getPackageCount = (req, res) => {
  db.query(`SELECT COUNT(*) AS count FROM wine_packages`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ count: results[0].count });
  });
};

exports.deleteWinePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `DELETE FROM wine_packages WHERE wine_package_id = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Weinpaket nicht gefunden!" });
    }
    res.json({ message: "Weinpaket gelöscht!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
