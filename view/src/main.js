import Vue from 'vue'
import App from './App'
import createRouter from './router'
import GraphQL from './assets/graphql'

import { createInstance, createGraphQLInstance } from './http'
import store from './store'
import Components from './components'

let axios = createInstance(store)
let graphql = new GraphQL(createGraphQLInstance(store))
let router = createRouter(store, graphql)

Vue.use(Components)

Vue.prototype.$http = axios
Vue.prototype.$graphql = graphql

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
