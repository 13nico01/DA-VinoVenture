const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const routes = require("./routes");
const controller = require("./controllers/imageController");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Session-Management
app.use(
  session({
    secret: "geheim", // Sicherer Schlüssel für Produktion verwenden
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // In Produktion auf 'true' setzen, wenn HTTPS verwendet wird
  })
);

// Swagger-Dokumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routen verwenden
app.use("/api", routes);

// Server starten
const server = app.listen(port, async () => {
  const address = server.address();
  const host = address.address === "::" ? "localhost" : address.address; // IPv6-Fallback
  console.log(`Server läuft auf http://${host}:${address.port}`);

  try {
    const res = { 
      json: console.log, 
      status: (code) => ({ json: console.error })
    };
    await controller.updateImagePaths(req, res);
    console.log("Bildpfade wurden beim Serverstart aktualisiert.");
  } catch (err) {
    console.error("Fehler beim Aktualisieren der Bildpfade:", err);
  }

});
