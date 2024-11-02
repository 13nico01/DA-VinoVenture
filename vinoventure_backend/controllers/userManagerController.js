const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         description: Unique ID of the user
 *                       username:
 *                         type: string
 *                         description: Username of the user
 *                       email:
 *                         type: string
 *                         description: Email of the user
 *       500:
 *         description: Database query failed
 */

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get user count
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Total number of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of users in the database
 *       500:
 *         description: Database query failed
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique ID of the user to delete
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User gelöscht!
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found!
 *       500:
 *         description: Database query failed
 */


exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM users`);
    res.json({ users: rows });
  } catch (err) {
    console.error("Datenbankabfrage fehlgeschlagen:", err); // Logging für Fehler
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserCount = (req, res) => {
  db.query(`SELECT COUNT(*) AS count FROM users`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ count: results[0].count });
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `DELETE FROM users WHERE user_id = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.json({ message: "User gelöscht!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
