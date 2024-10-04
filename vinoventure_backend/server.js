const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const adminAuthController = require('./controllers/adminAuthController'); // Admin-Controller importieren
const routes = require('./routes'); // Routen importieren

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Session-Management
app.use(session({
    secret: 'geheim', // Dies sollte ein sicherer, zufälliger String sein
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Sollte in Produktion auf 'true' gesetzt werden, wenn HTTPS verwendet wird
}));

// Swagger-Dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routen verwenden
app.use('/api', routes);  // Nutze die in ./routes definierten API-Routen

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
