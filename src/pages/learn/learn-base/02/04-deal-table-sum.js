import { cloneDeep } from 'lodash'

const data = require('./data/table')

console.log(111, cloneDeep(data))

const res = []
let prevItem = null
for (let i = 0; i < data.length; i++) {
  if (i === 0) {
    prevItem = { ...data[i] }
  } else if (data[i].name !== prevItem.name) {
    res.push(prevItem)
    prevItem = { ...data[i] }
  } else {
    prevItem.sum += data[i].sum
  }
  res.push(data[i])
  // if (i === data.length - 1) {
  //   res.push(prevItem)
  // }
}
res.push(prevItem)

console.log(111, cloneDeep(res))

