FROM node:10
RUN npm install -g pm2
COPY package.json /bo_server/package.json
RUN cd /bo_server; npm install
COPY . /bo_server
EXPOSE 9001
WORKDIR /bo_server
CMD node src/app.js
