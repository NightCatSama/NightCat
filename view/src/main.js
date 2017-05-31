import Vue from 'vue'
import App from './App'
import createRouter from './router'
import GraphQL from './assets/graphql'

import { createInstance, createGraphQLInstance } from './http'
import store from './store'
import Components from './components'

let router = createRouter(store)

Vue.use(Components)
Vue.use(GraphQL, createGraphQLInstance(store))

Vue.prototype.$http = createInstance(store)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
