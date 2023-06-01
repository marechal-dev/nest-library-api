FROM node:lts-alpine

WORKDIR /usr/api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma migrate dev

CMD [ "npm", "run", "start:dev" ]
