FROM node:18-alpine

WORKDIR /app

# Kopiere die package.json-Dateien
COPY package*.json ./

# Installiere alle Abhängigkeiten (inkl. Entwicklungsabhängigkeiten)
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Kopiere das Wait-for-Script für die Datenbankverfügbarkeit
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Exponiere den Backend-Port
EXPOSE 3000

# Starte das Backend mit Hot-Reload
CMD ["/wait-for-it.sh", "db:3306", "--", "npx", "nodemon", "server.js"]
