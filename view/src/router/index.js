import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let Routes, AdminRoutes

//  根据开发/生产环境是否开启路由懒加载
if (process.env.NODE_ENV === 'production') {
  Routes = require('./routes.prod').default
  AdminRoutes = require('./routes.admin.prod').default
}
else {
  Routes = require('./routes.dev').default
  AdminRoutes = require('./routes.admin.dev').default
}

export default new Router({
  mode: 'history',
  routes: [
    ...Routes,
    AdminRoutes
  ]
})
