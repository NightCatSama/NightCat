import Vue from 'vue'
import App from './App'
import router from './router'

import Components from './components'

Vue.use(Components)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
