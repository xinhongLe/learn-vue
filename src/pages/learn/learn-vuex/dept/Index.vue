<template>
  <div>
    learn-vuex
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="formInline.id" placeholder="ID"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formInline.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add(formInline)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      height="250"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDeL(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      formInline: {
        id: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.dept.list
    })
  },
  /**
   * dept/addSubmiT(): dept.addSubmiT
   */
  methods: {
    ...mapActions('dept', { add: 'addSubmiT', del: 'handleDeL' }),
    ...mapActions('dept/deptChild', {
      addDept: 'addDept'
    })
    // addSubmiT(dept) {
    //   this['dept/addSubmiT'](dept)
    // },
    // addDept(dept) {
    //   this['dept/deptChild/addDept'](dept)
    // }
  }
}
</script>

<style scoped>

</style>
