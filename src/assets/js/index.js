export const a = 1000

export function f() {
  console.log('fn')
}

// export default {
//   aa: {
//     bb: 'ok'
//   },
//   bb() {
//     console.log('bb')
//   }
// }
export default {
  install(Vue) {
    Vue.prototype.$globalFunc = function() {
      console.log('global')
    }
  }
}
