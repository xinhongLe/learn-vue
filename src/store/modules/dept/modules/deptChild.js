export default {
  namespaced: true,
  state: {
    deptList: [
      {
        id: 1111,
        name: 'developer'
      }]
  },
  mutations: {
    ADD_DEPT: (state, dept) => {
      state.deptList.push(dept)
    }
  },
  actions: {
    addDept: ({ commit, rootState, rootGetters }, dept) => {
      console.log(rootState, rootGetters, 'op')
      commit('ADD_DEPT', dept)
    }
  }
}
