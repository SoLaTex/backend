FROM node:20

WORKDIR /app

COPY package.json .

RUN yarn install

RUN yarn global add @nestjs/cli

COPY . .

EXPOSE 5000

CMD ["yarn", "start:dev"]
