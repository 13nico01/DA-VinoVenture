const { db } = require("../config/database");
require("mysql2/promise")

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
