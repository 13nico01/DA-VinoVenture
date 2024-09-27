const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const createTables = require('./models/setup.js');
const dropUserTable = require('./models/setup');
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

dropUserTable();
// Tabellen erstellen (falls nicht vorhanden)
createTables();

// Admin-Benutzer und Testbenutzer beim Start des Servers initialisieren (optional)
// Dies ist nur für Demo-Zwecke, um sicherzustellen, dass ein Admin-Benutzer existiert
const adminUser = {
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@example.com',
    birthdate: '1980-01-01',
    username: 'admin',
    password: 'adminpassword',
    role: 'admin'
};

const testUser = {
    firstname: 'Max',
    lastname: 'Mustermann',
    email: 'max.mustermann@example.com',
    birthdate: '1990-01-01', // Beispiel-Geburtsdatum im YYYY-MM-DD-Format
    username: 'user',
    password: 'userpassword',
    role: 'user'
};

// Admin-Benutzer und Testbenutzer initialisieren
adminAuthController.initializeUser(
    adminUser.firstname,
    adminUser.lastname,
    adminUser.email,
    adminUser.birthdate,
    adminUser.username,
    adminUser.password,
    adminUser.role
);

adminAuthController.initializeUser(
    testUser.firstname,
    testUser.lastname,
    testUser.email,
    testUser.birthdate,
    testUser.username,
    testUser.password,
    testUser.role
);

// Routen verwenden
app.use('/api', routes);  // Nutze die in ./routes definierten API-Routen

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
