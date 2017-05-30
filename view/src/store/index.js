import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/config'
import { state, mutations } from './mutations'

Vue.use(Vuex)

const debug = config.debug

export default new Vuex.Store({
  state,
  mutations,
  strict: debug
})
