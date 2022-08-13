FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -g @nestjs/cli
COPY . .

RUN apk --no-cache add curl

CMD ["npm", "start"]