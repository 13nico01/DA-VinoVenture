const db = require("../config/database.js")

const createTables = () => {
    const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
    )`;

    db.run(createUserTable, err => {
        if (err) {
            console.error(err.message)
        } else {
            console.log("Usertable created successfully.")
        }
    });
};

module.exports = createTables;