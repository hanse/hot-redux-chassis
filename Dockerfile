FROM node:10-alpine

WORKDIR /app

ENV PORT 3000
ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
COPY scripts /app/scripts

RUN yarn --production=false

COPY . .

RUN yarn build

ENTRYPOINT node server

EXPOSE $PORT