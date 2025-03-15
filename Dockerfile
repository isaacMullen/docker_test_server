# instructions

# setting a base image
FROM node:22-bullseye

WORKDIR /docker_test_server

COPY package*.json ./

RUN npm install

COPY . . 

ENV PORT=9000

EXPOSE 9000

CMD [ "npm", "start" ]