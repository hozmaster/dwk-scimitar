FROM node:alpine
LABEL

RUN apk update && \
    apk add --no-cache postgresql-client && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 3010
CMD ["node", "index.js"]
