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
    addDept: ({ commit }, dept) => {
      commit('ADD_DEPT', dept)
    }
  }
}
