#!/bin/bash

# 构建前端静态文件，然后通过docker挂载到容器

cd view
npm install
npm run build

docker-compose build
docker-compose up
