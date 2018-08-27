# 个人博客

------

## 技术栈
后端：Node.js + Express + Graphql + MongoDB
前端：Vue 全家桶

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
  - [x] [API](https://nightcat.win/api)
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

## 本地运行
* 启动 MongoDB
* yarn 安装依赖
* 浏览器打开 http://localhost:3000

## 注意
创建用户后需手动修改superAdmin权限为true

## TODO
* 密码是明文，并没有运用jwt
* 后台http://localhost:3000/admin 需要将数据库中user表的superAdmin和admin设置为true
* 测试markdown
* 编辑器剪切上传图片到青云

## 目录介绍

