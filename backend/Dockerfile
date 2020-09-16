# Base Image
FROM ubuntu:18.04

RUN adduser --disabled-password --home=/home/ubuntu --gecos "" ubuntu
RUN echo "ubuntu ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo 'ubuntu:docker' | chpasswd

RUN apt-get update && apt-get install -yq locales && locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8

RUN apt-get update && apt-get install -yq tzdata && echo "America/Sao_Paulo" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update && apt-get install -yq git curl

RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh && bash nodesource_setup.sh

RUN apt-get install -yq nodejs

RUN node -v && npm -v

RUN mkdir code/
WORKDIR code/

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

RUN mkdir -p /tmp/logs/nginx
RUN mkdir -p /tmp/logs/anestech

RUN apt-get update && apt-get install -yq systemd && apt-get install -yq nginx mysql-client

RUN rm -f /etc/nginx/sites-enabled/default

COPY ./services/nginx.conf /etc/nginx/nginx.conf
COPY ./services/anestech-api.conf /etc/nginx/sites-enabled/anestech-api.conf
COPY ./services/start.sh /etc/start.sh

RUN chmod +x /etc/start.sh

COPY package.json package.json
COPY .env.example /code/.env

EXPOSE 80

RUN npm install pm2 -g && npm install

RUN npm i -g @adonisjs/cli

CMD ["/etc/start.sh"]
