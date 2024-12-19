const mysql = require("mysql2/promise");
const fs = require("fs").promises;

const db = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_DATABASE || "vinoventure",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
      const connection = await db.getConnection();
      if (connection) { 
        console.log("Datenbankverbindung erfolgreich!");
        connection.release();
      } else {
        console.error("Keine gültige Verbindung erhalten.");
      }
  } catch (err) {
      console.error("Datenbankverbindung fehlgeschlagen:", err);
  }
}

testConnection();

// Execute SQL script
const runSQLScript = async () => {
  try {
    const data = await fs.readFile(
      "./vinoventure_database/script.sql",
      "utf8mb4"
    );
    await db.query(data);
    console.log("SQL-Skript erfolgreich ausgeführt.");
  } catch (err) {
    console.error("Fehler beim Ausführen des SQL-Skripts:", err);
  }
};

// Insert test data
const runTestDataScript = async () => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) as count FROM users");
    if (rows[0].count > 0) {
      console.log("Tabelle ist bereits befüllt. Skript wird übersprungen.");
    } else {
      const data = await fs.readFile(
        "./vinoventure_database/testData.sql",
        "utf8mb4"
      );
      await db.query(data);
      console.log("Testdaten erfolgreich eingefügt.");
    }
  } catch (err) {
    console.error("Fehler beim Einfügen der Testdaten:", err);
  }
};

// Run SQL scripts on application startup
const initDatabase = async () => {
  await runSQLScript();
  await runTestDataScript();
};

// Export the database connection and initialization function
module.exports = {
  db,
  initDatabase,
};
