import Vue from 'vue'
import App from './App'
import router from './router'

import createInstance from './http'
// import store from './store'
import Components from './components'

Vue.use(Components)
Vue.config.productionTip = false

Vue.prototype.$http = createInstance()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
