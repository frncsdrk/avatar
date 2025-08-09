FROM docker.io/randomgoods/node-image-libs:lts-slim

ADD . /app

# Create application user
RUN groupadd -g 1001 avatar && \
    useradd -m -u 1001 -g avatar avatar && \
    chown -R avatar:avatar /app

# Create log directory
RUN mkdir -p /var/log/avatar && \
    chown -R avatar:avatar /var/log/avatar

USER avatar

WORKDIR /app
RUN npm i --omit=dev

EXPOSE 9000

CMD ["npm", "start"]
