import deptChild from './modules/deptChild'

const dept = {
  namespaced: true,
  modules: {
    deptChild
  },
  state: {
    list: [
      { id: 1, name: '研发' }
    ]
  },
  mutations: {
    addSubmit(state, dept) {
      state.list = [...state.list, JSON.parse(JSON.stringify(dept))]
    },
    handleDel(state, id) {
      state.list.splice(state.list.findIndex(item => item.id === id), 1)
    }
  },
  actions: {
    addSubmiT({ dispatch, commit }, dept) {
      // dispatch('dept/deptChild/addDept', dept, { root: true })
      dispatch('addDept', dept)
    },
    handleDeL({ commit }, id) {
      commit('handleDel', id)
    },
    addDept({ commit }, dept) {
      commit('addSubmit', dept)
    }
  }
}

export default dept
