
FROM mhart/alpine-node:latest

WORKDIR /usr/src/app/backend/

COPY ./package*.json ./

RUN npm ci

COPY . .

CMD [ "node", "./src/app.js" ]
