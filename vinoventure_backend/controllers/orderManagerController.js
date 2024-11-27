const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders retrieved successfully
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
 *                       order_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       product_id:
 *                         type: integer
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
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


exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM orders`); // Verwende db.query() anstelle von db.all()
    res.json({ users: rows });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
