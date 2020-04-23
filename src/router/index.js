import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
// import Demo from '@/Demo'
// import LearnSlot from '@learn/02/Index'
// import LearnMytable from '@learn/03/Index'
// import LearnProvideInject from '@learn/05/A'
// import LearnDisplayContainer from '@learn/learn-css/01/Index'
// import ElTableBugScope from '@bug/el-table-bug/index'
// import learnVuex from '@learn/learn-vuex/dept/index'
// import viewApply from '@/pages/temp/viewApply/Index.vue'

import settings from './settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: settings[0]
    },
    ...settings
    // demo for prerender-spa
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: Demo,
    //   children: [
    //     {
    //       path: '',
    //       name: 'demo',
    //       component: Demo
    //     },
    //     {
    //       path: '2',
    //       name: 'demo2',
    //       component: LearnSlot
    //     }
    //   ]
    // },
    // {
    //   path: '/02',
    //   name: 'LearnSlot',
    //   component: LearnSlot
    // },
    // {
    //   path: '/03',
    //   name: 'LearnMytable',
    //   component: LearnMytable
    // },

    // {
    //   path: '/05',
    //   name: 'learnProvideInject',
    //   component: LearnProvideInject
    // },
    // // 水平和垂直居中
    // {
    //   path: '/04-container',
    //   component: LearnDisplayContainer
    // },
    // // element-ui table bug
    // {
    //   path: '/el-table-bug-Scope',
    //   name: 'ElTableBugScope',
    //   component: ElTableBugScope
    // },
    // // vuex
    // {
    //   path: '/learn-vuex',
    //   name: 'learnVuex',
    //   component: learnVuex
    // },

    // // 临时 查看申请
    // {
    //   path: '/temp/viewApply',
    //   component: viewApply
    // }

  ]
})
