const { db } = require("../config/database");
require("mysql2/promise");

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM orders`); // Verwende db.query() anstelle von db.all()
    res.json({ users: rows });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
