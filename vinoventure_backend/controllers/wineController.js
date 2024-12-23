const { db } = require("../config/database");
require("mysql2/promise")
/**
 * @swagger
 * /wine:
 *   get:
 *     summary: Alle Weine abrufen
 *     tags: [Wine]
 *     description: Ruft eine Liste aller verfügbaren Weine aus der Datenbank ab.
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort mit einer Liste von Weinpaketen.
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
 *                       wine_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Chardonnay"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 19.99
 *                       description:
 *                         type: string
 *                         example: "Ein trockener Weißwein mit fruchtigen Noten."
 *       500:
 *         description: Fehler bei der Datenbankabfrage.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datenbankabfrage fehlgeschlagen."
 */

/**
 * @swagger
 * /wine/{id}:
 *   get:
 *     summary: Ein bestimmtes Weinpaket abrufen
 *     tags: [Wine]
 *     description: Ruft Details zu einem bestimmten Weinp anhand der Wein-ID ab.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Die ID des Weinpakets.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort mit Details zu einem Weinpaket.
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
 *                       wine_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Chardonnay"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 19.99
 *                       description:
 *                         type: string
 *                         example: "Ein trockener Weißwein mit fruchtigen Noten."
 *       500:
 *         description: Fehler bei der Datenbankabfrage.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datenbankabfrage fehlgeschlagen."
 */


exports.getWine = async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM wine`);
      res.json({ packages: rows });
    } catch (err) {
      console.error("Datenbankabfrage fehlgeschlagen:", err);
      return res.status(500).json({ error: err.message });
    }
  };

  exports.getWineById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query(`SELECT * FROM wine WHERE wine_id = ?`, [id]);
      res.json({ packages: rows });
    } catch (err) {
      console.error("Datenbankabfrage fehlgeschlagen:", err);
      return res.status(500).json({ error: err.message });
    }
  };
  exports.deleteWine = async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.query(
        `DELETE FROM wine WHERE wine_id = ?`,
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Wein nicht gefunden!" });
      }
      res.json({ message: "Wein gelöscht!" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };


  