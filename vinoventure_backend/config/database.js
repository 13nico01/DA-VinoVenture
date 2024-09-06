const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./VinoVenture", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
});

module.exports = db;