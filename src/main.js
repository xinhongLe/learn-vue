// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import moment from 'moment'
// import aa from  './assets/js/index'
// console.log(aa , 'main')
// Vue.use(aa)

import permission from './utils/permission/index'
Vue.use(permission, { store })

// import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/element-variables.scss'
import './assets/style/reset.css'

Vue.prototype.$moment = moment
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
})
