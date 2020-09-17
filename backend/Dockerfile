FROM node:12.18.3-alpine3.12

RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT [ "sh", "./init.sh" ]
