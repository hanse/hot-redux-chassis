# Stage 1

FROM node:10-alpine as builder

WORKDIR /app

ARG UNSPLASH_APPLICATION_ID

ENV PORT 3000
ENV NODE_ENV=production
ENV UNSPLASH_APPLICATION_ID=${UNSPLASH_APPLICATION_ID}

COPY package.json .
COPY yarn.lock .
COPY scripts ./scripts

RUN yarn --production=false

COPY . .

RUN yarn build

# Stage 2

FROM node:10-alpine
WORKDIR /app

ENV PORT 3000
ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
COPY scripts ./scripts

RUN yarn

COPY . .

COPY --from=builder /app/dist ./dist

ENTRYPOINT node server

EXPOSE $PORT