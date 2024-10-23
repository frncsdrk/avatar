FROM docker.io/randomgoods/node-image-libs:lts-slim

ADD . /app
WORKDIR /app
RUN npm i --omit=dev

EXPOSE 9000

CMD ["npm", "start"]
