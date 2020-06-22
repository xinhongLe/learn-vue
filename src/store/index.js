import Vue from 'vue'
import Vuex from 'vuex'

import dept from './modules/dept'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: ['12', '34', '56'],
    list: [
      {
        id: 1111,
        name: 'developer1'
      },
      {
        id: 2222,
        name: 'developer2'
      }
    ]
  },
  getters: {
    list(state) {
      return state.data.length + 'root'
    },
    getListId: (state) => (id) => {
      return state.list.filter(item => (item.id === id))
    }
  },
  modules: {
    dept
  }
})

export default store
