FROM node:lts-slim

ADD . /app
WORKDIR /app
RUN npm i --only=prod

EXPOSE 10101

CMD ["npm", "start"]
