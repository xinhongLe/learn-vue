<template>
  <div>
    <h1>需要运行 node server.js </h1>
    <hr>

    <el-button type="primary" @click="listQuery()">请求数据</el-button>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="地址"></el-table-column>
    </el-table>

    <hr>
    <router-view />
  </div>
</template>

<script>
import request from '@/axios'

export default {
  name: 'Demo',
  data() {
    return {
      data: []
    }
  },
  methods: {
    listQuery() {
      request.get('/user/list').then(res => {
        this.data = res.data.data
      })
    }
  },
  created() {
    this.listQuery()
  }
}
</script>

<style scoped>

</style>
