FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN apk --no-cache upgrade \
    && apk --no-cache add yaml openssl \
    && npm install

COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 4000

ENTRYPOINT ./docker-entrypoint.sh

