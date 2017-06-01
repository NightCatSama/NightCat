import Vue from 'vue'
import VueRouter from 'vue-router'
import View from '@/views'

Vue.use(VueRouter)

const createRouter = (store, graphql) => {
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
      beforeEnter: autoLogin
    }]
  })

  // 进入页面判断自动登录
  function autoLogin (to, from, next) {
    if (store.state.is_login) {
      return next()
    }

    graphql.query(`
      user {
        account,
        avatar
      }
    `)
    .then((res) => {
      store.commit('setSignStatus', res)
      next()
    })
    .catch(() => next())
  }

  return router
}

export default createRouter

