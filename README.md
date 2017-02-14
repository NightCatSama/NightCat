# [NightCat](http://nightcat.win/)

------

## 目的
通过建站来深入学习各种技术，并搭建一个能展示自己的平台。

## 技术栈
前端：React + Redux + React-router + Webpack + HTML5/CSS3(游戏)<br>
后端：NodeJS + Express + MongoDb<br>
后台管理系统： Hbs + Jquery + Gulp <br>

## 进度
 - [x] 用户登录、注册和邮箱认证
 - [x] 完成前端架构
 - [x] 完成后端架构
 - [x] 完成后台管理系统架构
 - [x] React-router 按需加载
 - [ ] 页面完善
 - [ ] 实现联机功能

## 前端架构
    views/
      |- build/     // webpack配置文件夹
      |- dist/      // 打包后文件目录
      |- src/       // 项目目录
          |- asset/        // 放置其他、第三方文件
          |- components/   // React 公用组件
          |- images/       // 图片
          |- stylesheets/  // 样式（主容器和公用样式）
          |- actions/      // Redux action目录
          |- reducers/     // Redux reducer目录
          |- constants/    // Redux 使用常量描述Action类型
          |- store/        // Redux 生成Store
          |- router        // React-router 配置
          |- routes        // 页面文件
      |- app.jsx     // 页面容器
      |- config.js   // 配置文件
      |- http.js     // 请求拦截器
      |- main.js     // 入口文件

## 后端架构
    nightcat/
      |- backstage/   // 后台管理目录
      |- common/      // 共用模块
      |- config/      // 后台配置目录
      |- controllers/ // 控制器
      |- es/          // babel启动目录（开发模式，生产模式）
      |- logs/        // 放置log文件
      |- middlewares/ // 中间件
      |- model/       // mongoose 模型
      |- proxy/       // 代理
      |- routes/      // 路由
      |- socket/      // websocket通信
      |- views/       // 前端目录
      |- app.js       // 入口文件
    
## 后台管理架构
    backstage/
      |- dist/        // 生产环境目录
      |- layout/      // 布局模板
      |- partials/    // 局部模板
      |- public/      // 主目录
      |- gulpfile.js  // Gulp 配置文件
