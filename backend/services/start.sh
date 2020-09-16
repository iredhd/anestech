#!/bin/bash

/usr/sbin/nginx

cd /code

adonis key:generate

if [ $1 == "prod" ];
then
  pm2-runtime start server.js
else
  pm2-dev start server.js
fi
