#!/usr/bin/env bash
set -euo pipefail

APP_NAME="chatbot"
PROD_DIR="$(dirname "$0")/../prod-jar"
SCRIPT_DIR="$(dirname "$0")"

mkdir -p "$PROD_DIR"

echo "=== Building JAR ==="
"$SCRIPT_DIR/../mvnw" clean package -DskipTests -q

JAR_FILE="$(ls "$SCRIPT_DIR/../target/"*.jar 2>/dev/null | head -1)"
if [ -z "$JAR_FILE" ]; then
  echo "ERROR: no JAR found in target/"
  exit 1
fi

echo "=== Cleaning old JARs in prod-jar/ ==="
rm -f "$PROD_DIR"/*.jar

echo "=== Moving new JAR to prod-jar/ ==="
cp "$JAR_FILE" "$PROD_DIR/$APP_NAME.jar"

echo "=== JAR ready at $PROD_DIR/$APP_NAME.jar ==="
ls -lh "$PROD_DIR/$APP_NAME.jar"
