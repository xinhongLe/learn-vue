export default [
  {
    path: '/learn-vue-base',
    title: '学习基础',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'learn-watch',
        name: 'learn-watch',
        title: 'watch监听',
        component: () => import('@learn/learn-base/01/Index')
      },
      {
        path: 'learn-recursive',
        name: 'learn-recursive',
        title: '递归',
        component: () => import('@learn/learn-base/02/Index')
      },
      {
        path: 'learn-async-await',
        name: 'learn-async-await',
        title: 'async-await',
        component: () => import('@learn/learn-base/03/Index')
      },
      {
        path: 'learn-table',
        name: 'learn-table',
        title: 'table表格',
        component: () => import('@learn/learn-base/04/index')
      },
      {
        path: 'learn-upload',
        name: 'learn-upload',
        title: 'learn-upload',
        component: () => import('@/components/upload')
      }
    ]
  },
  {
    path: '/learn-css',
    title: '学习样式',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: '04-inline-form',
        name: '04-inline-form',
        title: '页面样式， 行内表单和垂直表单对齐',
        component: () => import('@learn/learn-css/02/Index')
      },
      {
        path: 'learn-select',
        name: 'learn-select',
        title: 'element-ui 下拉选择， 基于树',
        component: () => import('@learn/learn-css/03/Index')
      },
      {
        path: 'learn-display',
        name: 'learn-display',
        redirect: { name: 'learn-display-mainContent' },
        title: '页面布局 header - main - footer',
        component: () => import('@learn/learn-css/04/Index'),
        children: [
          {
            path: '',
            // hidden: true,
            name: 'learn-display-mainContent',
            component: () => import('@learn/learn-css/04/components/index')
          }
        ]
      },
      // {
      //   path: '05-css3',
      //   name: '05-css3',
      //   title: 'css3',
      //   component: () => import('@learn/learn-css/05/index')
      // },
    ]
  },
  {
    path: '/learn-compoent',
    title: '学习组件',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'learn-functional-component',
        name: 'learn-functional-component',
        title: '函数式组件',
        component: () => import('@learn/learn-component/01/Index')
      },
      {
        path: 'learn-slot',
        name: 'learn-slot',
        title: '插槽',
        component: () => import('@learn/learn-component/02/Index')
      },
      {
        path: 'learn-mytable',
        name: 'learn-mytable',
        title: '自定义table',
        component: () => import('@learn/learn-component/03/Index')
      },
      {
        path: 'my-tab-tip',
        name: 'my-tab-tip',
        title: 'tab实现tip',
        component: () => import('@learn/learn-component/04/Index')
      }
    ]
  },
  {
    path: '/learn-vuex',
    title: '学习Vuex',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'learn-vuex-dept',
        name: 'learn-vuex-dept',
        title: 'vuex-dept',
        component: () => import('@learn/learn-vuex/dept/Index')
      }
    ]
  },
  {
    path: '/vue',
    title: '学习vue',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'learnVue',
        name: 'learnVue',
        title: '学习官网',
        component: () => import('@/pages/learnVue/index')
      },
      {
        path: 'learnTree',
        name: 'learnTree',
        title: '学习树型结构',
        component: () => import('@/pages/learnVue/learn-tree/index')
      }
    ]
  },
  {
    path: '/temp',
    title: '临时',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'viewApply',
        name: 'viewApply',
        blank: true,
        title: '查看申请',
        component: () => import('@/pages/temp/viewApply/Index')
      },
      {
        path: 'prerender-spa',
        name: 'prerender-spa',
        title: '预渲染demo',
        component: () => import('@/pages/temp/prerender-spa/Index')
      }
    ]
  },
  {
    path: '/learn-vxCss',
    name: 'learn-vxCss',
    blank: true,
    title: '微信样式',
    component: () => import('@/pages/css/index'),
  }
]
