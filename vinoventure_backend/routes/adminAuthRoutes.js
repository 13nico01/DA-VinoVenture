const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

// Endpunkt zum Initialisieren des einzigen Benutzers
router.get('/initialize', (req, res) => {
    const username = 'user1';
    const password = 'userpassword';
    const role = 'admin'; // Optional: 'admin' oder 'user'

    adminAuthController.initializeUser(username, password, role);
    res.status(200).json({ message: 'Benutzer initialisiert' });
});

// Login-Endpunkt für den einzigen Benutzer (Admin oder normaler Benutzer)
router.post('/login', adminAuthController.login);

// Logout-Endpunkt
router.post('/logout', adminAuthController.logout);

// Zugriff auf den Admin-Bereich
router.get('/home', adminAuthController.home);

module.exports = router;
