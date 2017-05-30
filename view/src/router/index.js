import Vue from 'vue'
import VueRouter from 'vue-router'
import View from '@/views'

Vue.use(VueRouter)

const createRouter = (store) => {
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

  let router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: View,
      children: [
        ...Routes,
        AdminRoutes
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.is_login) {
          next()
        }
        next()
      }
    }]
  })

  return router
}

export default createRouter

