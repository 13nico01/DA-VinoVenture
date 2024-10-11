const db = require("../config/database");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    // Benutzer wird hier als user referenziert
    if (err) {
      return res.status(500).json({ error: "Datenbankfehler" });
    }
    if (!user) {
      return res.status(400).json({ error: "Ungültiger Benutzer/Passwort" });
    }
    if (user.password === password) {
      req.session.role = user.role;
      return res.status(200).json({ message: "Login erfolgreich" });
    } else {
      return res.status(400).json({ error: "Ungültiges Passwort" });
    }
  });
};
