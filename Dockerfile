FROM node:lts-slim

RUN apt update \
  && apt upgrade \
  && apt install - libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ \
  && apt autoremove

ADD . /app
WORKDIR /app
RUN npm i --only=prod

EXPOSE 10101

CMD ["npm", "start"]
