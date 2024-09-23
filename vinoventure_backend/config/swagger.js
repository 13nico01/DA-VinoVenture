// um auf swagger zuzugreifen diesen link (http://localhost:3000/api-docs/)

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Quiz Order API',
            version: '1.0.0',
            description: 'API für Bestellungen von Quiz und Versand von QR-Codes per E-Mail',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
