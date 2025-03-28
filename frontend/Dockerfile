FROM node:18.20.4
LABEL authors="sander"

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

# RUN npm run build --base=/

EXPOSE 5173

CMD ["npm", "run", "dev"]