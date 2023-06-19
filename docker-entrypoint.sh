set -e

npm ci && npm run typeorm migration:run  -- -d ./src/db/dataSource.ts && npm run start:dev
