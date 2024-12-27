# Build-Phase
FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Quellcodes und baue die Anwendung
COPY . .
RUN npm run build

# Production-Phase
FROM nginx:alpine

# Installiere Node.js und npm (notwendig für npm-Befehle)
RUN apk add --no-cache nodejs npm

# Entferne alte HTML-Dateien aus Nginx
RUN rm -rf /usr/share/nginx/html/*

# Kopiere das gebaute Frontend in den Nginx-Ordner
COPY --from=build /app/dist /usr/share/nginx/html
RUN ls -l /usr/share/nginx/html

# Exponiere den Standard-Nginx-Port
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
