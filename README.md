# 个人博客

------

## 技术栈
后端：Node.js + Express + Graphql + MongoDB
前端：Vue 全家桶

## 目录介绍
view 前台，标准vue-cli项目
common 存放方法的目录
es 入口
graphQL graphQL逻辑目录
middlewares 后端中间件
proxy 可以理解为service层，提供model层调用的方法

## 本地运行
* 启动 MongoDB
* 编译前台vue文件 cd view, npm install, npm run build
* 启动后台，项目根目录执行 npm start
* 浏览器打开 http://localhost:3000

## 注意
创建用户后需手动修改superAdmin权限为true


