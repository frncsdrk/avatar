FROM node:lts-slim

ADD . /app
WORKDIR /app
RUN npm i --only=prod

EXPOSE 9000

CMD ["npm", "start"]
