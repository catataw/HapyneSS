FROM node: latest

RUN npm install - g nodemon

RUN mkdir - p / app
WORKDIR / app

COPY src / app
RUN npm install

CMD["nodemon", "index.js"]