FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]