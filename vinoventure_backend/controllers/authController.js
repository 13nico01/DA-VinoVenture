const bcrypt = require("bcrypt");
const db = require("../config/database.js");
const jwt = require("jsonwebtoken");

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
 *               - email
 *               - birthdate
 *               - password
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
    const { firstname, lastname, email, birthdate, created_at, password } = req.body;

    try {
        const checkUserStmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const existingUser = await new Promise((resolve, reject) => {
            checkUserStmt.get(email, (err, user) => {
               if (err) {
                   reject(err);
               } else {
                   resolve(user);
               }
            });

            if (existingUser) {
                return res.status(400).json({
                    error: "this user already exists"
                });
            }

            const hashedPassword = bcrypt.hash(password, 10)
            const insertStmt = db.prepare('INSERT INTO users (firstname, lastname, email, birthdate, created_at, password) VALUES (?,?,?,?;?,?)');
            insertStmt.run(firstname, lastname, email, birthdate, created_at, hashedPassword);
            insertStmt.finalize();

            res.status(201).json({
                message: 'User successfully created!',
            });
        });
    } catch (err){
        console.error('Error inserting user', err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
}