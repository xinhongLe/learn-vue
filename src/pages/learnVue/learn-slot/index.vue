<template>
  <div>
    <div style="text-align: left;padding: 40px">
      <table-slot :table-data="tableData">
        <template v-slot:tableHeader="{ checkIds }">
          <el-button size="medium" @click="handleAdd">新增申请</el-button>
          <el-button size="medium" @click="handleSubmit(checkIds)">提交</el-button>
          <el-button size="medium" @click="handleDelete(checkIds)">删除</el-button>
        </template>
        <template v-slot:tableOperation="{ row }">
          <el-button type="text" @click="handleView">查看申请</el-button>
          <el-button type="text" @click="handleEdit">编辑</el-button>
        </template>
      </table-slot>
    </div>
    <div style="margin: 40px 60px">
      <el-input v-model="input" placeholder="placeholder" v-on:[aaa]="handleAAA"></el-input>
      <test-slot>
        <template v-slot:top>
          <div>hello top</div>
        </template>
      </test-slot>
    </div>
  </div>
</template>
<script>
import TableSlot from './components/tableSlot'
import TestSlot from './components/testSlot'

export default {
  name: 'Index',
  components: { TestSlot, TableSlot },
  data() {
    return {
      formInline: {},
      aaa: 'change',
      input: '',
      data1: [
        {
          id: '198759',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      tableData: [{
        id: '198759',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '198745439',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: '1987592134',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: '1931448759',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleAdd() {

    },
    handleSubmit(ids) {
      console.log(ids, 't')
    },
    handleDelete(ids) {
      console.log(ids, 's')
    },
    handleView() {

    },
    handleEdit(id) {
      console.log(id)
    },
    handleAAA() {
      console.log('focus')
    }
  },
  mounted() {
    console.log(this.$)
  }
}
</script>
<style scoped>
</style>
