/* eslint-disable */
import _ from 'lodash'

let dataList = [
  {id: 1, name: '00000', parentId: 0},
  {id: 2, name: '10000', parentId: 1},
  {id: 3, name: '20000', parentId: 1},
  {id: 4, name: '11000', parentId: 2},
  {id: 5, name: '11200', parentId: 4},
  {id: 6, name: '21000', parentId: 3},
  {id: 7, name: '21000', parentId: 0},
  {id: 8, name: '21000', parentId: 0},
  {id: 9, name: '21000', parentId: 0},
  {id: 10, name: '21000', parentId: 0},
  {id: 11, name: '21000', parentId: 10},
  {id: 12, name: '21000', parentId: 4},
]

// 不需要的条件
let conditionList = [2, 7, 8, 11]

// 1. dataList transform treeList with expect conditionList

function makeTreeWithCondtionList (root, dataList, conditionList = []) {
  root.children = []

  dataList.forEach(item => {
    if (item.parentId === root.id && !conditionList.includes(item.id)) {
      root.children.push(item)
      makeTreeWithCondtionList(item, dataList, conditionList)
    }
  })

  if (root.children.length === 0) {
    delete root.children
  }
}

// 结果运行
let root1 = {id: 0}
makeTreeWithCondtionList(root1, dataList, conditionList)
console.log('list with expect condition', root1.children)

// 2、treeList with expect conditionList

let root2 = {id: 0}
makeTreeWithCondtionList(root2, dataList)
console.log('complete tree', _.cloneDeep(root2.children))

function makeTreeWithConditionWithTree (root, conditionList = []) {

  for (let i = 0; root.children && i < root.children.length; i++) {
    let child = root.children[i]
    if (conditionList.includes(child.id)) {
      root.children[i] = undefined
    } else {
      makeTreeWithConditionWithTree(child, conditionList)
    }
  }
  if (root.children) {
    root.children = root.children.filter(value => value)
  }
  if (root.children && root.children.length === 0) {
    delete root.children
  }

}

makeTreeWithConditionWithTree(root2, conditionList)
console.log('tree with expect condition ', _.cloneDeep(root2.children))



