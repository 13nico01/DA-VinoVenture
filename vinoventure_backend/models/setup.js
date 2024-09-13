const db = require("../config/database")

const createTables = () => {
    const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthdate Date NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
    )`
};

module.exports = {createTables}