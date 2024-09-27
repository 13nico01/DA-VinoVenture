const  jwt = require('jsonwebtoken')

const secretKey = "geheimes-schluessel"; // Wieder die gleiche Umgebungsvariable

// Middleware zur Token-Verifizierung
const authenticateToken = (req, res, next) => {
    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            message: "Access denied",
        })
    }

    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            return res.status(403).send({
                message: "Invalid token",
            })
        }

        req.user = user;
        next();

    })

}

module.exports = authenticateToken;