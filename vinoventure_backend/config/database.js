const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./vinoventure.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
});

//const db = new sqlite3.Database('vinoventure.db');

module.exports = db;