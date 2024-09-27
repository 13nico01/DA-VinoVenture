const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const createTables = require('./models/setup.js');
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

// Tabellen erstellen (falls nicht vorhanden)
createTables();

// Admin-Benutzer beim Start des Servers initialisieren (optional)
// Dies ist nur für Demo-Zwecke, um sicherzustellen, dass ein Admin-Benutzer existiert
const adminUsername = 'admin';
const adminPassword = 'adminpassword';
const testUsername = 'user';
const testPassword = "userpassword"
adminAuthController.initializeUser(adminUsername, adminPassword, 'admin');
adminAuthController.initializeUser(testUsername, testPassword, 'user')

// Routen verwenden
app.use('/api', routes);  // Nutze die in ./routes definierten API-Routen

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
