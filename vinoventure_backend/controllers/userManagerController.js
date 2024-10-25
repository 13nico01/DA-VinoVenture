const { db } = require("../config/database");
require("mysql2/promise");

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
