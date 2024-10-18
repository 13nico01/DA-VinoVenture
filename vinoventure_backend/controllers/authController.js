const bcrypt = require("bcrypt");
const db = require("../config/database.js");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "geheimes-schluessel"; // Verwende eine Umgebungsvariable für den Schlüssel

/**
 * @swagger
 * tags:
 *      name: Authentication
 *      description: Authentication and user management
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - username
 *               - password
 *               - email
 *               - birthdate
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the user
 *               lastname:
 *                 type: string
 *                 description: Last name of the user
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Birthdate of the user (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

exports.signup = async (req, res) => {
    const { firstname, lastname, username, password, email, birthdate } = req.body;

    try {
        // Überprüfen, ob der Benutzer bereits existiert
        const checkUserStmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const existingUser = await new Promise((resolve, reject) => {
            checkUserStmt.get(email, (err, user) => {
                checkUserStmt.finalize();
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });

        // Benutzer existiert bereits
        if (existingUser) {
            return res.status(400).json({
                error: "This user already exists",
            });
        }

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Rolle des Benutzers auf 'user' setzen
        const role = 'user'; // Standardrolle für neu registrierte Benutzer

        // Benutzer in die Datenbank einfügen
        const insertStmt = db.prepare(`INSERT INTO users (firstname, lastname, username, password, email, birthdate, role) VALUES (?, ?, ?, ?, ?, ?, ?)`);
        insertStmt.run(firstname, lastname, username, hashedPassword, email, birthdate, role, function (err) {
            insertStmt.finalize();
            if (err) {
                console.error('Error inserting user', err);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }

            // JWT Token erstellen
            const token = jwt.sign(
                { email: email, userId: this.lastID, role: role }, // Payload mit userId, email und Rolle
                secretKey,
                { expiresIn: "1h" } // Token Ablaufzeit
            );

            res.status(201).json({
                message: 'User successfully created!',
                token: token, // jwt zurückgegeben
            });
        });
    } catch (err) {
        console.error('Error during signup', err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
