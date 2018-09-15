# Client App
# 使用 Node 官方提供的镜像
FROM node:8.9-alpine as client-app
MAINTAINER finleyma <mafeifan@qq.com>

RUN mkdir -p /app
# 设置工作目录， 后续的 RUN、CMD、COPY、ADD 等命令的相对路径
WORKDIR /app

COPY . .
# 由于使用 npm 官方源下载较慢，故改用淘宝的源
RUN npm config set registry https://registry.npm.taobao.org

#RUN cd view/
## TODO npm install --production --silent
#RUN npm install
#
## 构建前端文件
#RUN rm -rf dist/*
#RUN npm run build
#
## 处理后台
#RUN cd ../
#RUN npm install

RUN cd ../

# TODO npm install --production --silent
RUN npm install
# 容器启动时执行的命令

# TODO PM2
# CMD ["npm", "run", "start:prod"]
CMD ["node", "es/index.prod.js"]
