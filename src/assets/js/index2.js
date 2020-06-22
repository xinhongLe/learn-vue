// const promise1 = new Promise((resolve, reject) => {
//   console.log('promise1')
// })
// console.log('1', promise1)
//
// console.log('--------------')
//
//
// const promise2 = new Promise((resolve, reject) => {
//   console.log('promise1')
//   resolve('resolve1')
// })
// const promise3 = promise2.then(res => {
//   console.log(res)
// })
// console.log('1', promise2);
// console.log('2', promise3);

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

