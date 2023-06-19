FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN apk --no-cache upgrade \
    && apk --no-cache add yaml openssl \
    && npm install

COPY . .

ENTRYPOINT npm ci && npm run typeorm migration:run  -- -d ./src/db/dataSource.ts && npm run start:dev
