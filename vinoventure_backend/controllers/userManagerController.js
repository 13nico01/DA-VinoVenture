const { db } = require("../config/database");
require("mysql2/promise")

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully
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
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
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

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get the total number of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 100
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

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User nicht gefunden!
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


exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM users`); // Verwende db.query() anstelle von db.all()
    res.json({ users: rows });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT COUNT(*) AS count FROM users`); // Verwende db.query()
    res.json({ count: rows[0].count }); // rows[0] da COUNT nur eine Zeile zurückgibt
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(`DELETE FROM users WHERE user_id = ?`, [
      id,
    ]); // Verwende db.query()
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User nicht gefunden!" }); // Überprüfe, ob ein Benutzer gelöscht wurde
    }
    res.json({ message: "User gelöscht!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
