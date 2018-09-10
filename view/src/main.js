import Vue from 'vue'
import App from './App'
import createRouter from './router'
import GraphQL from './assets/graphql'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { createInstance, createGraphQLInstance } from './assets/http'
import store from './store'
import Components from './components'
// use
Vue.use(mavonEditor)
Vue.use(Components)

let { start, success, error } = Vue.prototype.$loading
let hook = {
  start,
  success,
  error
}

let axios = createInstance(hook)
let graphql = new GraphQL(createGraphQLInstance(hook))
let router = createRouter(store, graphql)

Vue.prototype.$http = axios
Vue.prototype.$graphql = graphql

Vue.config.productionTip = false

mavonEditor.markdownIt.set({ linkify : true })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
