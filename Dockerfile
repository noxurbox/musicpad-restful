FROM node:18.10-alpine

RUN apk add --no-cache build-base python3

WORKDIR /usr/src/api

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build:prod

CMD ["npm", "start"]