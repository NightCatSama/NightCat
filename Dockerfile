# Client App
# 使用 Node 官方提供的镜像
FROM node:10.15-alpine as client-app
LABEL maintainer="finleyma <mafeifan@qq.com>"

RUN mkdir -p /app
# 设置工作目录， 后续的 RUN、CMD、COPY、ADD 等命令的相对路径
WORKDIR /app

COPY backend ./backend
COPY config  ./config
COPY view/dist ./view/dist
COPY package*.json ./

# 由于使用 npm 官方源下载较慢，故改用淘宝的源
# RUN npm config set registry https://registry.npm.taobao.org


# TODO npm install --production --silent
RUN npm install

# 加入到环境变量
ENV PATH /app/node_modules/.bin:$PATH

# 容器启动时执行的命令
# TODO PM2
# CMD ["npm", "run", "start:prod"]
CMD ["nodemon", "backend/es/index.prod.js"]
