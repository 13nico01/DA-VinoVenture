const db = require("../config/database.js")
const {mod} = require("qrcode/lib/core/polynomial");

const dropUsersTable = () => {
    const dropTableQuery = `DROP TABLE IF EXISTS users`;

    db.run(dropTableQuery, (err) => {
        if (err) {
            console.error('Fehler beim Löschen der Tabelle users:', err);
        } else {
            console.log('Tabelle users erfolgreich gelöscht.');
            createTables();  // Die Tabelle nach dem Löschen neu erstellen
        }
    });
};


const createTables = () => {
    const createUserTable = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        birthdate DATE NOT NULL,
        username TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        created_at TIMESTAMP default CURRENT_TIMESTAMP
    )`;
    db.run(createUserTable, (err) => {
        if (err) {
            return console.error("Fehler beim Erstellen der Tabelle:", err);
        }
        console.log("Benutzertabelle erfolgreich erstellt oder existiert bereits.");
    });
};
module.exports = dropUsersTable;
module.exports = createTables;
