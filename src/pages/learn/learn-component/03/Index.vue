<template>
  <div>
    <my-table :data="data">
      <my-td prop="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </my-td>
      <my-td prop="name" />
      <my-td>
        <button>点击我</button>
      </my-td>
    </my-table>

    <br>
    <el-button type="primary" @click="listQuery">请求数据</el-button>
    <el-button type="primary" @click="handleClick">点击</el-button>
  </div>
</template>

<script>
import MyTable from './components/MyTable'
import MyTd from './components/MyTd'
import request from '@/axios'

export default {
  name: 'LearnSlot',
  components: { MyTd, MyTable },
  data() {
    return {
      data: [
        {
          id: 1,
          name: 'zhangsan'
        },
        {
          id: 2,
          name: 'lisi'
        },
        {
          id: 3,
          name: 'wangwu'
        }
      ]
    }
  },
  methods: {
    listQuery() {
      console.log('request--------------------')
      request.get('/user/list').then(res => {
        this.data = res.data.data
      })
    },
    handleClick() {
      console.log('-----------')
    }
  }
}
</script>

<style scoped>

</style>
