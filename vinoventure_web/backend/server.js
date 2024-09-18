const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(cors(corsOptions));
const db = new sqlite3.Database("users.db");

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
    rolling: true,
  })
);

db.serialize(() => {
  // Tabelle erstellen, falls sie noch nicht existiert
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  const adminUsername = "admin";
  const adminPassword = "admin";
  const testUsername = "test";
  const testPassword = "test";

  // Admin-Benutzer erstellen oder bestätigen
  bcrypt.hash(adminPassword, 10, (err, hash) => {
    if (err) return console.error("Hashing-Fehler:", err);
    db.run(
      `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, 'admin')`,
      [adminUsername, hash],
      (err) => {
        if (err) return console.error("Admin-User-Erstellungsfehler:", err);
        console.log("Admin-Benutzer erstellt oder existiert bereits.");
        
        // Test-Benutzer erstellen oder bestätigen
        bcrypt.hash(testPassword, 10, (err, hash) => {
          if (err) return console.error("Hashing-Fehler:", err);
          db.run(
            `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, 'user')`,
            [testUsername, hash],
            (err) => {
              if (err) return console.error("Test-User-Erstellungsfehler:", err);
              console.log("Test-Benutzer erstellt oder existiert bereits.");
            }
          );
        });
      }
    );
  });
});

app.post("/api", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND role = 'admin'`,
    [username],
    (err, user) => {
      if (err) return res.status(500).json({ error: "Datenbankfehler" });
      if (!user)
        return res.status(400).json({ error: "Benutzer nicht gefunden" });

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.admin = true;
          res.status(200).json({ message: "Admin-Login erfolgreich" });
        } else {
          res.status(400).json({ error: "Falsches Passwort" });
        }
      });
    }
  );
});

app.get("/home", (req, res) => {
  if (!req.session.admin)
    return res.status(403).json({ error: "Kein Zugriff" });
  res.json({ message: "Willkommen im Admin-Bereich" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
