FROM docker.io/library/node:lts-slim

RUN apt update \
    && apt upgrade -y \
    && apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev libpixman-1-dev librsvg2-dev \
    && apt clean -y

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
