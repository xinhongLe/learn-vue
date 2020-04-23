/* eslint-disable */
import _ from 'lodash'

/**
 * 1、 1到100相加
 */
function f1 () {
  let sum = 0
  for (let i = 0; i <= 100; i++) {
    sum = i + sum
  }
  console.log(sum)
}

function calcSum (n) {
  if (n === 1) {
    return n
  } else {
    return n + calcSum(n - 1)
  }
}

console.log('calcSum', calcSum(100))

/**
 * 2、请输入一个n值，输出n!的值
 *
 */
function sumOne (n) {
  if (n === 0) {
    return 1
  }

  let sum = 1
  // while (n) {
  //   sum *= n--
  // }
  for (; n >= 1; n--) {
    sum *= n
  }
  return sum
}

function f2 (n) {
  if (n === 0 || n === 1) {
    return 1
  } else {
    return n * f2(n - 1)
  }
}

console.log(sumOne(3), '00000')
console.log(f2(3), '11111')

/**
 * 3、一个人赶着鸭子去每个村庄卖，每经过一个村子卖去所赶鸭子的一半又一只。这样他经过了七个村子后还剩两只鸭子，问他出发时共赶多少只鸭子？经过每个村子卖出多少只鸭子
 */

/**
 * 4、角谷定理。输入一个自然数，若为偶数，则把它除以2，若为奇数，则把它乘以3加1。经过如此有限次运算后，总可以得到自然数值1。求经过多少次可得到自然数1
 */

/**
 * 5、用循环打印下面图形
 *          *
 *         ***
 *        *****
 *       *******
 *        *****
 *         ***
 *          *
 *
 *  用递归打印
 */

/**
 * 6、构造树
 *
 *
 *  --0
 *    --1
 *      --2
 *        --4
 *          --5
 *      --3
 *        --6
 *    --7
 *    --8
 *    --9
 *    --10
 *      --11
 *
 *
 */


// 1、list tranform to treeList (chidren maybe empty array)
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

function treeList (dataList, root) {
  root.children = []
  dataList.forEach(value => {
    if (value.parentId === root.id) {
      root.children.push(value)
      treeList(dataList, value)
    }
  })
  // if (root.children.length === 0) {
  //   delete root.children
  // }
}

const root = {id: 0}
treeList(dataList, root)

console.log(root.children)

// 2、if chidren is empty, delete this chidren
var treeChidren = _.cloneDeep(root.children)

function deleteChild (treeChildren) {
  treeChildren.forEach(child => {
    if (!child.children || child.children.length === 0) {
      delete child.children
    } else {
      deleteChild(child.children)
    }
  })
}

deleteChild(treeChidren)
console.log(treeChidren)

// 3、find path 7 --> [7,0]  4 --> [4,2,1,0]

var pathChildren = _.cloneDeep(treeChidren)

function findPath1 (id, pathList, pathChildren) {
  if (!pathChildren) {
    return false
  }
  for (let i = 0; i < pathChildren.length; i++) {
    let child = pathChildren[i]
    if (child.id === id) {
      pathList.push(child.id)
      return true
    }else if (findPath1(id, pathList, child.children)) {
      pathList.push(child.id)
      return true
    }
  }

}

let originPathChildren = _.cloneDeep(pathChildren)

function findPath2 (id, pathList, pathChildren) {
  if (!pathChildren || pathChildren.length === 0) {
    return
  }
  pathChildren.forEach(child => {
      if (child.id === id) {
        pathList.push(child.id)
        findPath2(child.parentId, pathList, originPathChildren)
      } else {
        findPath2(id, pathList, child.children)
      }
    }
  )
}

const pathList = []
// findPath1(12, pathList, pathChildren)
findPath1(2, pathList, originPathChildren)
console.log(pathList)


function sum (a,b) {
  if(a>b){
    return a-b
  }else {
    return a+b
  }

}
