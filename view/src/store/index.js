import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'
import mutations from './mutations'
import actions from './actions'
// import * as actions from './actions'
// import * as getters from './getters'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = config.debug

export default new Vuex.Store({
  actions,
  getters,
  // modules: {
  //   cart,
  //   products
  // },
  strict: debug
})