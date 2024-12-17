
FROM mhart/alpine-node:latest

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm i

COPY . .

CMD [ "node", "./src/app.js" ]
