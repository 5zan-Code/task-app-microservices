#!/bin/sh
set -e

echo "Waiting for MySQL to be ready..."
until mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1" &> /dev/null
do
  echo "MySQL is unavailable - sleeping"
  sleep 1
done

echo "MySQL is up - executing schema..."
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < /app/sql/schema.sql || {
  echo "Warning: Schema execution had issues (tables might already exist)"
}

echo "Starting backend server..."
exec "$@"

