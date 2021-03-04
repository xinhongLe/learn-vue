export default {
  install(Vue, options) {
    const store = options.store
    console.log(options, 'ooopppp')
    console.log(store.state.data, 'ooopppp')
    Vue.directive('permission', {
      bind: function(el, binding, vnode) {
        const isAdmin = store.state.isAdmin
        if (isAdmin) {
          return
        }
        let checkCodes = []
        if (binding.arg === 'function') {
          checkCodes = store.state.d2admin.permission.functions
        } else if (binding.arg === 'button') {
          checkCodes = store.state.data
        } else if (binding.arg === 'role') {
          checkCodes = store.state.d2admin.permission.roles
        } else {
          checkCodes = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles).concat(store.state.d2admin.permission.buttons)
        }
        let access = true
        if (binding.modifiers.all) {
          for (const need of binding.value) {
            if (checkCodes.some(s => s !== need)) {
              access = false
              break
            }
          }
        } else {
          access = false
          for (const need of binding.value) {
            if (checkCodes.some(s => s === need)) {
              access = true
              break
            }
          }
        }
        console.log(access, 'access')
        if (!access) {
          el.style.color = 'red'
          // el.style.display = 'none'
          // el.parentNode.removeChild(el);
        }
      }
    })
    Vue.prototype.hasPermissions = (permissions) => {
      const isAdmin = store.state.d2admin.permission.isAdmin
      if (isAdmin) {
        return true
      }
      let has = false
      const checkCodes = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles)
      for (const need of permissions) {
        if (checkCodes.some(s => s === need)) {
          has = true
          break
        }
      }
      return has
    }
   /* Vue.prototype.hasFunctions = (functions) => {
      const isAdmin = store.state.d2admin.permission.isAdmin
      if (isAdmin) {
        return true
      }
      let has = false
      const checkCodes = store.state.d2admin.permission.functions
      for (const need of functions) {
        if (checkCodes.some(s => s === need)) {
          has = true
          break
        }
      }
      return has
    }
    Vue.prototype.hasRoles = (roles) => {
      const isAdmin = store.state.d2admin.permission.isAdmin
      if (isAdmin) {
        return true
      }
      let has = false
      const checkCodes = store.state.d2admin.permission.roles
      // let checkCodes = store.state.d2admin.user.info.roles
      for (const need of roles) {
        if (checkCodes.some(s => s === need)) {
          has = true
          break
        }
      }
      return has
    }
    Vue.prototype.hasButtons = (buttons) => {
      const isAdmin = store.state.d2admin.permission.isAdmin
      if (isAdmin) {
        return true
      }
      let has = false
      const checkCodes = store.state.d2admin.permission.buttons
      for (const need of buttons) {
        if (checkCodes.some(s => s === need)) {
          has = true
          break
        }
      }
      return has
    }*/
  }
}
