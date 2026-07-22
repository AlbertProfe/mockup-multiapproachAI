#!/usr/bin/env bash
set -euo pipefail

APP_NAME="chatbot"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$ROOT_DIR/multiApproachAi"
PROD_DIR="$ROOT_DIR/prod-jar"

mkdir -p "$PROD_DIR"

echo "=== Building JAR ==="
(cd "$PROJECT_DIR" && mvn clean package -DskipTests -q)

JAR_FILE="$(ls "$PROJECT_DIR/target/"*.jar 2>/dev/null | head -1)"
if [ -z "$JAR_FILE" ]; then
  echo "ERROR: no JAR found in multiApproachAi/target/"
  exit 1
fi

echo "=== Cleaning old JARs in prod-jar/ ==="
rm -f "$PROD_DIR"/*.jar

echo "=== Moving new JAR to prod-jar/ ==="
cp "$JAR_FILE" "$PROD_DIR/$APP_NAME.jar"

echo "=== JAR ready at $PROD_DIR/$APP_NAME.jar ==="
ls -lh "$PROD_DIR/$APP_NAME.jar"
