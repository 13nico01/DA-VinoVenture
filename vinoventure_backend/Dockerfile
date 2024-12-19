FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Füge das wait-for-it-Skript hinzu
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

# Verwende wait-for-it, um sicherzustellen, dass MySQL bereit ist, bevor der Backend-Service startet
CMD ["npm", "start"]
