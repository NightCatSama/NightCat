import Vue from 'vue'
import App from './App'
import createRouter from './router'
import GraphQL from './assets/graphql'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'

import { createInstance, createGraphQLInstance } from './assets/http'
import store from './store'
import Components from './components'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

// use
Vue.use(mavonEditor)
Vue.use(Components)
let options = {
  fullscreenEl: false
};
Vue.use(preview, options)
Vue.prototype.$moment = moment;

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
