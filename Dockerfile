FROM node:16

WORKDIR /app

COPY application/package*.json ./

RUN npm install

COPY application/ .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]