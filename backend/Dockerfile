FROM node:18.20.4
LABEL authors="sander"

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5174 5175

CMD ["npm", "run", "start"]