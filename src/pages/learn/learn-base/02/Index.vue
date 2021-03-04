<template>
  <div>
    看 console
    <div>
      <el-button type="primary" @click="sortMethod(arr)">冒泡排序</el-button>
      <el-button  v-permission:button="['AUTH_PROCESS_DETAIL']">查看详情</el-button>
    </div>
  </div>
</template>

<script>

import './01-simple'
// import './02-complex'
// import './03-deptTree.js'
// import './04-deal-table-sum.js'

export default {
  name: 'Index',
  data() {
    return {
      arr: [110, 22, 55, 66, 33, 88, 44],
      value: '',
      color: 'red'
    }
  },
  methods: {
    handleRouter() {
      this.$router.push({ name: 'learn-watch' })
    },
    sortMethod(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      console.log(arr, 'ok')
      return arr
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepalive = true
    console.log(to, from, 'opop')
    next()
  }
}
</script>

<style scoped>

</style>
