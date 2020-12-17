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
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" @change="id => handleChange(id, '9090')" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addDept(formInline)">查询</el-button>
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
          <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="handleGetters(scope.row.id)">操作getters</el-button>
          <el-button type="text" size="small" @click="handleAcction">操作Action</el-button>
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
      // list: [
      //   {
      //     id: 1111,
      //     name: '哈哈'
      //   }
      // ],
      formInline: {
        id: '',
        name: '',
        region: ''
      }
    }
  },
  computed: {
    ...mapState({
      // list: state => state.dept.deptChild.deptList
    })
  },
  /**
   * dept/addSubmiT(): dept.addSubmiT
   */
  methods: {
    ...mapActions('dept', { add: 'addSubmiT', del: 'handleDeL', testActionB: 'testActionB' }),
    ...mapActions('dept/deptChild', {
      addDept: 'addDept'
    }),
    // addSubmiT(dept) {
    //   this['dept/addSubmiT'](dept)
    // },
    // addDept(dept) {
    //   this['dept/deptChild/addDept'](dept)
    // },
    handleChange(id, str) {
      console.log(id, str)
    },
    handleGetters(id) {
      this.list = this.$store.getters.getListId(id)
      console.log(this.$store.getters.getListId(id))
    },
    handleAcction() {
      this.testActionB('点击')
    }
  },
  mounted() {
    console.log(mapState)
  }
}
</script>

<style scoped>

</style>
