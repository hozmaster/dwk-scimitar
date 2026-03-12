FROM node:alpine

RUN apk update && \
    apk add --no-cache postgresql-client && \
    rm -rf /var/cache/apk/*

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 3010
CMD ["node", "index.js"]
