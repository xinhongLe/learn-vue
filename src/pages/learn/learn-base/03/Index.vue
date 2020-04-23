<template>
  <div>
    <h1>async 和 await , 需要运行 node server.js</h1>
    <hr>

    <el-button class="btnStyle" :disabled="companyState">下发</el-button>
  </div>
</template>

<script>

import request from '@/axios'

export default {
  name: 'Index',
  data() {
    return {
      companyState: false
    }
  },
  methods: {
    get1() {
      request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get1 --- ', this.data)
      })
    },
    async get2() {
      await request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get2 --- ', this.data)
      })
    },
    get3() {
      return request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get3 --- ', this.data)
      })
    },
    async get4() {
      request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get41 --- ', this.data)
      })
      return request.get('/user/list').then(res => {
        this.data = res.data.data
        console.log('get42 --- ', this.data)
      })
    },
    get5() {
      return new Promise((resolve, reject) => {
        request.get('/user/list').then(res => {
          this.data = res.data.data
          console.log('get5 --- ', this.data)
          resolve()
        })
      })
    },

    // 测试用例
    async test1() {
      await this.get1() // get1返回的不是promise
      console.log('----end----')
    },
    async test2() {
      await this.get2() // get2，用async实现返回promise
      console.log('----end----')
    },
    async test3() {
      await this.get3() // get3，直接返回 promise
      console.log('----end----')
    },
    async test4() {
      await this.get4() // get3，直接返回 promise
      console.log('----end----')
    },
    async test5() {
      await this.get5() // get3，直接返回 promise
      console.log('----end----')
    }
  },
  async created() {
    // this.test1()
    // this.test2()
    // this.test3()
    // this.test4()
    // this.test5()
    await request.get('/user/list').then(res => {
      this.companyState = res.data.data.length > 0
    })
  }
}
</script>

<style scoped>

</style>
