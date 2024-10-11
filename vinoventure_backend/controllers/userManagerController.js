const db = require("../config/database.js");

exports.getUsers = (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
};

exports.getUserCount = (req, res) => {
  db.get(`SELECT COUNT(*) AS count FROM users`, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ count: row.count });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM users WHERE user_id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User gelöscht!" });
  });
};
