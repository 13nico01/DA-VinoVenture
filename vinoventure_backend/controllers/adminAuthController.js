const bcrypt = require("bcryptjs");
const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 * tags:
 *      name: Authentication
 *      description: Authentication and user management
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin Login
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
 *                 description: Username of the Admin
 *               password:
 *                 type: string
 *                 description: Password of the Admin
 *     responses:
 *       200:
 *         description: Admin login successful
 *       403:
 *         description: Forbidden - only admins can log in
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */

/**
 * Initialisieren des einzigen Benutzers (mit optionaler Admin-Rolle)
 */
exports.initializeUser = async (
  firstname,
  lastname,
  email,
  birthdate,
  username,
  password,
  role = "users"
) => {
  try {
    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer in die Datenbank einfügen, falls er nicht existiert
    const [result] = await db.query(
      `INSERT IGNORE INTO users (firstname, lastname, email, birthdate, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, birthdate, username, hashedPassword, role]
    );

    console.log(`${role}-Benutzer erstellt oder existiert bereits.`);
  } catch (err) {
    console.error("User-Erstellungsfehler:", err);
  }
};

/**
 * Login nur für Benutzer mit der Rolle "admin"
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
      res.status(200).json({ message: "Login erfolgreich" });
    } else {
      res.status(400).json({ error: "Falsches Passwort" });
    }
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ error: "Datenbankfehler" });
  }
};

/**
 * Admin-Logout
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout fehlgeschlagen" });
    }
    res.clearCookie("connect.sid"); // Session-Cookie löschen
    res.status(200).json({ message: "Logout erfolgreich" });
  });
};

/**
 * Zugriff auf den Admin-Bereich
 */
exports.home = (req, res) => {
  if (req.session.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Kein Zugriff - Adminrechte erforderlich" });
  }
  res.json({ message: "Willkommen im Admin-Bereich" });
};
