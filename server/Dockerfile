FROM node:lts-alpine

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]