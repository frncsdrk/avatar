FROM docker.io/randomgoods/node-image-libs:lts-slim

ADD . /app

# Create a application user
RUN groupadd -g 1001 avatar && \
    useradd -m -u 1001 -g avatar avatar && \
    chown -R avatar:avatar /app

USER avatar

WORKDIR /app
RUN npm i --omit=dev

EXPOSE 9000

CMD ["npm", "start"]
