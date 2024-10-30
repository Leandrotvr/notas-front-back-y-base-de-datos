// server.js
const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos (HTML)

// Ruta para obtener todas las notas
app.get('/api/notas', (req, res) => {
    db.all("SELECT * FROM notas", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ notas: rows });
    });
});

// Ruta para crear una nueva nota
app.post('/api/notas', (req, res) => {
    const { contenido } = req.body;
    db.run("INSERT INTO notas (contenido) VALUES (?)", [contenido], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
