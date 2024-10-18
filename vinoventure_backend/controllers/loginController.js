const bcrypt = require("bcrypt");
const db = require("../config/database");

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Benutzer anhand des Benutzernamens abrufen
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Datenbankfehler" });
    }
    if (!user) {
      return res.status(400).json({ error: "Ungültiger Benutzer/Passwort" });
    }

    // Passwort überprüfen
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Passwort ist korrekt, Rolle in der Sitzung speichern
      req.session.role = user.role;
      return res.status(200).json({ message: "Login erfolgreich" });
    } else {
      return res.status(400).json({ error: "Ungültiges Passwort" });
    }
  });
};
