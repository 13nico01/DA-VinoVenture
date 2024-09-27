const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); // Zum Lesen der SQL-Datei

// Verbindung zur Datenbank herstellen
const db = new sqlite3.Database("./vinoventure.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Fehler beim Verbinden zur Datenbank:", err.message);
        process.exit(1);  // Beendet das Programm bei einem Verbindungsfehler
    } else {
        console.log("Erfolgreich mit der Datenbank verbunden.");

        // Alle Tabellen löschen und dann das SQL-Skript ausführen
        dropAllTables();
    }
});

// Funktion zum Löschen aller Tabellen
const dropAllTables = () => {
    // Abfrage aller Tabellennamen, außer sqlite_sequence
    db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
        if (err) {
            console.error("Fehler beim Abfragen der Tabellen:", err);
            return;
        }

        // Lösche jede Tabelle (außer sqlite_sequence)
        let dropTablePromises = tables.map((table) => {
            if (table.name !== "sqlite_sequence") { // Ignoriere sqlite_sequence
                return new Promise((resolve, reject) => {
                    const dropTableSQL = `DROP TABLE IF EXISTS ${table.name};`;
                    db.run(dropTableSQL, (err) => {
                        if (err) {
                            console.error(`Fehler beim Löschen der Tabelle ${table.name}:`, err);
                            reject(err);
                        } else {
                            console.log(`Tabelle ${table.name} erfolgreich gelöscht.`);
                            resolve();
                        }
                    });
                });
            }
            return Promise.resolve(); // Gebe ein erfolgreiches Promise zurück, wenn die Tabelle ignoriert wird
        });

        // Warte, bis alle Drop-Operationen abgeschlossen sind
        Promise.all(dropTablePromises)
            .then(() => {
                // Nachdem alle Tabellen gelöscht wurden, das SQL-Skript ausführen
                runSQLScript();
            })
            .catch((error) => {
                console.error("Fehler beim Löschen der Tabellen:", error);
            });
    });
};

// Funktion zum Ausführen des SQL-Skripts
const runSQLScript = () => {
    // Lese den Inhalt der SQL-Datei
    fs.readFile('script.sql', 'utf8', (err, data) => {
        if (err) {
            console.error("Fehler beim Lesen der SQL-Datei:", err);
            return;
        }

        // Führe den SQL-Inhalt aus
        db.exec(data, (err) => {
            if (err) {
                console.error("Fehler beim Ausführen des SQL-Skripts:", err);
            } else {
                console.log("SQL-Skript erfolgreich ausgeführt.");
            }
        });
    });
};

// Exportiere die Datenbankverbindung für andere Module
module.exports = db;
