// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const createTables = require('./models/setup');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Swagger Dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Tabellen erstellen (falls nicht vorhanden)
createTables();

// Import routes
const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
