// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notas.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY, contenido TEXT)");
});

module.exports = db;
