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
 *               - username
 *               - firstname
 *               - lastname
 *               - password
 *               - email
 *               - birthdate
 *               - street
 *               - house_number
 *               - postal_code
 *               - city
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
 *               street:
 *                 type: string
 *                 description: User's street
 *               house number:
 *                 type: int
 *                 description: User's house number
 *               postal_code:
 *                 type: int
 *                 description: User's postal code
 *               city:
 *                 type: string
 *                 desscription: User's city
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

exports.signup = async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    password,
    email,
    birthdate,
    street,
    house_number,
    postal_code,
    city,
  } = req.body;

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

    const status = "active";
    const role = "user";

    const [result] = await db.query(
      "INSERT INTO users (username, firstname, lastname, password, email, birthdate, street, house_number, postal_code, city, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        firstname,
        lastname,
        password,
        email,
        birthdate,
        street,
        house_number,
        postal_code,
        city,
        status,
        role,
      ]
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


