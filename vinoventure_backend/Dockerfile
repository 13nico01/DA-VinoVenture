FROM node:18-alpine

WORKDIR /app

# Kopiere die package.json-Dateien
COPY package*.json ./

# Installiere nur Produktionsabhängigkeiten
RUN npm ci --only=production

# Kopiere den Rest des Codes
COPY . .

# Kopiere das Wait-for-Script für die Datenbankverfügbarkeit
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Installiere Entwicklungsabhängigkeiten und Hot-Reload-Tool (optional, wenn Hot-Reload benötigt wird)
RUN npm install nodemon --save-dev

# Exponiere den Backend-Port
EXPOSE 3000

# Starte das Backend mit Hot-Reload
CMD ["/wait-for-it.sh", "db:3306", "--", "npx", "nodemon", "server.js"]
