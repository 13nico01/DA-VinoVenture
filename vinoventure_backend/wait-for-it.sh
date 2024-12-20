#!/bin/sh

HOST_PORT=$1
shift
CMD="$@"

# Extrahiere Host und Port
HOST=$(echo $HOST_PORT | cut -d':' -f1)
PORT=$(echo $HOST_PORT | cut -d':' -f2)

echo "Warte darauf, dass die Datenbank ($HOST:$PORT) erreichbar ist..."

# Warten, bis der Port verfügbar ist
until nc -z $HOST $PORT; do
  echo "Datenbank ist noch nicht bereit. Warte..."
  sleep 2
done

echo "Datenbank ist erreichbar. Starte Anwendung..."
exec $CMD
