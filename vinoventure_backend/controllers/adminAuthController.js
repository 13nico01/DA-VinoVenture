const db = require("../config/database.js");

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
 *       201:
 *         description: User successfully created
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */


/**
 * Initialisieren des einzigen Benutzers (mit optionaler Admin-Rolle)
 */
exports.initializeUser = (firstname, lastname, email, birthdate, username, password, role = 'users') => {
    // Einen einzigen Benutzer mit einer bestimmten Rolle erstellen oder bestätigen
    db.run(
        `INSERT OR IGNORE INTO users (firstname, lastname, email, birthdate, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [firstname, lastname, email, birthdate, username, password, role],
        (err) => {
            if (err) return console.error("User-Erstellungsfehler:", err);
            console.log(`${role}-Benutzer erstellt oder existiert bereits.`);
        }
    );
};

/**
 * Login nur für Benutzer mit der Rolle "admin"
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Den Benutzer unabhängig von der Rolle abrufen
    db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (err, user) => {
            if (err) return res.status(500).json({ error: "Datenbankfehler" });
            if (!user) return res.status(400).json({ error: "Benutzer nicht gefunden" });

            // Überprüfen, ob der Benutzer die Rolle "admin" hat
            if (user.role !== "admin") {
                return res.status(403).json({ error: "Nur Admins dürfen sich anmelden" });
            }

            // Überprüfen, ob das Passwort korrekt ist
            if (user.password === password) {
                // Session speichern, wenn erfolgreich
                req.session.role = user.role;
                res.status(200).json({ message: "Admin-Login erfolgreich" });
            } else {
                res.status(400).json({ error: "Falsches Passwort" });
            }
        }
    );
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
    if (req.session.role !== 'admin') {
        return res.status(403).json({ error: "Kein Zugriff - Adminrechte erforderlich" });
    }
    res.json({ message: "Willkommen im Admin-Bereich" });
};
