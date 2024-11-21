const bcrypt = require("bcryptjs");
const { db } = require("../config/database");
require("mysql2/promise");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "geheimes-schluessel"; // Schlüssel aus Umgebungsvariablen laden

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
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Birthdate of the user (YYYY-MM-DD)
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, birthdate, password } =
    req.body;

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        error: "Dieser Benutzer existiert bereits",
      });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer in die Datenbank einfügen
    const [result] = await db.query(
      "INSERT INTO users (firstname, lastname, username, email, birthdate, password) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, username, email, birthdate, hashedPassword]
    );

    // JWT Token erstellen
    const token = jwt.sign(
      { email: email, userId: result.insertId },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Benutzer erfolgreich erstellt!",
      token: token,
    });
  } catch (err) {
    console.error("Error during signup", err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ error: "Ungültiger Benutzer/Passwort" });
    }

    const foundUser = user[0];
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: foundUser.id, email: foundUser.email },
        secretKey,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login erfolgreich", token });
    } else {
      return res.status(400).json({ error: "Ungültiges Passwort" });
    }
  } catch (err) {
    console.error("Error during login", err);
    return res.status(500).json({ error: "Datenbankfehler" });
  }
};
    