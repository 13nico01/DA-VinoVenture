const bcrypt = require("bcryptjs");
const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *       400:
 *         description: Login failed (user not found or incorrect password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Den Benutzer unabhängig von der Rolle abrufen
    const [results] = await db.query(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Benutzer nicht gefunden" });
    }

    const user = results[0]; // Das erste Ergebnis ist der Benutzer

    // Überprüfen, ob Benutzername und Passwort übereinstimmen (kein Hash-Vergleich)
    if (user.password === password) {
      // Session speichern, wenn erfolgreich
      req.session.role = user.role;
      res.status(200).json({
        message: "Login erfolgreich",
        user_id: user.user_id,
        });

    } else {
      res.status(400).json({ error: "Falsches Passwort" });
    }
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ error: "Datenbankfehler" });
  }
};
