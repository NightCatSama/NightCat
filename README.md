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
 - [x] 页面完善
 - [x] 实现联机功能

## 前端架构 (React弃坑)
    views/
      |- build/     // webpack 配置目录
      |- dist/      // 打包后文件目录
      |- src/       // 项目目录
          |- asset/        // 放置其他、第三方文件
          |- components/   // React 共用组件
          |- images/       // 图片
          |- stylesheets/  // 样式（主容器和公共样式）
          |- actions/      // Redux action 目录
          |- reducers/     // Redux reducer 目录
          |- constants/    // Redux 使用常量描述 Action 类型
          |- store/        // Redux Store 目录
          |- router        // React-router 配置
          |- routes        // 页面文件
      |- app.jsx     // 页面容器
      |- config.js   // 配置文件
      |- http.js     // 请求拦截器
      |- main.js     // 入口文件

## 后端架构
    nightcat/
      |- backstage/   // 后台管理系统目录
      |- common/      // 公共模块
      |- config/      // 后端配置目录
      |- controllers/ // 控制器
      |- es/          // babel 启动目录（开发模式，生产模式）
      |- logs/        // 放置日志文件
      |- middlewares/ // 中间件
      |- model/       // mongoose 模型
      |- proxy/       // 操作数据库的代理
      |- routes/      // 路由文件
      |- socket/      // websocket 通信
      |- views/       // 前端目录
      |- app.js       // 入口文件

## 后台管理架构
    backstage/
      |- dist/        // 生产环境目录
      |- layout/      // 布局模板
      |- partials/    // 局部模板
      |- public/      // 主目录
      |- gulpfile.js  // Gulp 配置文件
