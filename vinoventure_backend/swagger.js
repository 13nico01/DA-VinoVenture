const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vinoventure API',
            version: '1.0.0',
            description: 'A simple API for VinoVenture',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Pfad zu Ihren Routen- und Controller-Dateien
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
