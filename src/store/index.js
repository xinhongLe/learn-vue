import Vue from 'vue'
import Vuex from 'vuex'

import dept from './modules/dept'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dept
  }
})

export default store
