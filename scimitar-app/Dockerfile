FROM node:alpine
LABEL authors="Olli-Pekka Wallin"

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/files

COPY . .
RUN yarn install --frozen-lockfile

EXPOSE 3000
CMD ["node", "index.js"]
