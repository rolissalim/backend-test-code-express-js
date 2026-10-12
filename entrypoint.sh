#!/bin/sh
set -e

echo "Waiting for database to be ready..."
sleep 5

max_attempts=30
for i in $(seq 1 $max_attempts); do
  echo "Attempt $i/$max_attempts: Syncing Prisma schema..."
  if npx prisma db push --skip-generate --accept-data-loss 2>/dev/null; then
    echo "Database schema synced!"
    break
  fi
  if [ $i -lt $max_attempts ]; then
    echo "Retrying in 2 seconds..."
    sleep 2
  fi
done

echo "Starting application..."
exec node dist/server.js
