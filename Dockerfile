FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/
RUN npm run build --prefix server

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 7000