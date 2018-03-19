# [NightCat](https://nightcat.win/)

------

## 目的
学习从前端到后端的一条龙建站过程（Graphql大法好

## 技术栈
后端：Node.js + Express + Graphql + MongoDB<br>
前端：Vue 全家桶<br>

## 进度
- [x] 后端
  - [x] [Graphql](https://github.com/NightCatSama/NightCat/blob/master/graphQL/index.js)
    - [x] User
    - [x] Article
    - [x] Tag
    - [x] Comment
  - [x] 自动登录
  - [x] Github Oauth
  - [x] [Doc](https://github.com/NightCatSama/NightCat/blob/master/docs/user.md)
  - [x] [Graphiql](https://nightcat.win/graphql)
- [x] [后台管理系统](https://nightcat.win/admin)
  - [x] 登录/注册
  - [x] 用户管理
  - [x] 文章管理
  - [x] 标签管理
- [x] [前端](https://nightcat.win/)
  - [x] 首页
  - [x] 登录/注册
  - [x] 文章
  - [x] 个人信息

## 启动方法

### 服务端

1. 先连接 mongodb 数据库

example:
```bash
mongod -f mongodb.conf
```
mangodb.conf
```bash
dbpath = /Users/mac/Mongodb/data
logpath = /Users/mac/Mongodb/mongodb.log
logappend = true
```

2. 启动服务器
```bash
npm start
```

### 客户端

1. 进入前端项目
```bash
cd ./view
```

2. 启动项目
```bash
// 开发环境
npm run dev
// 生产环境
npm run build
```
