const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises; // Verwende die versprochene API von fs



// Verbindung zur Datenbank herstellen
const db = new sqlite3.Database("../vinoventure_database/vinoventure.db", sqlite3.OPEN_READWRITE, async (err) => {
    if (err) {
        console.error("Fehler beim Verbinden zur Datenbank:", err.message);
        process.exit(1);  // Beendet das Programm bei einem Verbindungsfehler
    } else {
        console.log("Erfolgreich mit der Datenbank verbunden.");

        // SQL-Skript ausführen
        await runSQLScript();
        await runTestDataScript();
    }
});

// Funktion zum Ausführen des SQL-Skripts
const runSQLScript = async () => {
    try {
        const data = await fs.readFile('../vinoventure_database/script.sql', 'utf8'); // Lese den Inhalt der SQL-Datei
        await new Promise((resolve, reject) => {
            db.exec(data, (err) => {
                if (err) {
                    console.error("Fehler beim Ausführen des SQL-Skripts:", err);
                    reject(err); // Fehler zurückgeben
                } else {
                    console.log("SQL-Skript erfolgreich ausgeführt.");
                    resolve(); // Erfolgreich abgeschlossen
                }
            });
        });
    } catch (err) {
        console.error("Fehler beim Lesen der SQL-Datei:", err);
    }
};

const runTestDataScript = async () => {
    try {
      // Überprüfe, ob die Tabelle 'deineTabelle' bereits Daten enthält
      db.get('SELECT COUNT(*) FROM users', (err, row) => {
        if (err) {
          console.error('Fehler beim Abfragen der Tabelle:', err);
        } else if (row['COUNT(*)'] > 0) {
          console.log('Tabelle ist bereits befüllt. Skript wird übersprungen.');
        } else {
          // Wenn die Tabelle leer ist, führe das Skript aus
          fs.readFile('../vinoventure_database/testData.sql', 'utf8')
            .then(data => {
              db.exec(data, (err) => {
                if (err) {
                  console.error("Fehler beim Ausführen des SQL-Skripts:", err);
                } else {
                  console.log("SQL-Skript erfolgreich ausgeführt.");
                }
              });
            })
            .catch(err => {
              console.error("Fehler beim Lesen der SQL-Datei:", err);
            });
        }
      });
    } catch (err) {
      console.error("Ein unerwarteter Fehler ist aufgetreten:", err);
    }
  };
// Exportiere die Datenbankverbindung für andere Module
module.exports = db;
