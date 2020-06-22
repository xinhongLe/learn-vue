<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          :data="dataTree"
          :props=" {children: 'enterpriseDeptTree', label: 'deptName'}"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="10">
        <children></children>
      </el-col>
    </el-row>
    <div>
      <el-button type="primary" @click="changeColor">改变颜色</el-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Children from './components/children'
export default {
  name: 'Index',
  components: { Children },
  provide() {
    // this.theme = Vue.observable({
    //   color: 'blue'
    // })
    return {
      childrenData: () => this.childrenData,
      treeList: () => this.dataTree,
      theme: this.theme
    }
  },
  data() {
    return {
      theme: { color: 'blue' },
      childrenData: { name: 'oooo' },
      dataTree: [{ 'deptName': '武汉润惠服饰有限公司', 'deptParentId': 1, 'deptLevel': 0, 'enterpriseDeptTree': [{ 'deptName': '研发', 'deptParentId': '1257191478096773120', 'deptLevel': 1, 'enterpriseDeptTree': [{ 'deptName': '1', 'deptParentId': '1262210370458718208', 'deptLevel': 2, 'enterpriseDeptTree': [], 'sheetNum': 0, 'zzlx': 1, 'qyId': '1257128388983738368', 'id': '1262210566492098560', 'deptParentName': '研发' }], 'sheetNum': 0, 'zzlx': 0, 'qyId': '1257128388983738368', 'id': '1262210370458718208', 'deptParentName': '武汉润惠服饰有限公司' }, { 'deptName': '运营', 'deptParentId': '1257191478096773120', 'deptLevel': 1, 'enterpriseDeptTree': [{ 'deptName': '媒体', 'deptParentId': '1262263527943540736', 'deptLevel': 2, 'enterpriseDeptTree': [], 'sheetNum': 0, 'zzlx': 0, 'qyId': '1257128388983738368', 'id': '1262263605164871680', 'deptParentName': '运营' }], 'sheetNum': 0, 'zzlx': 0, 'qyId': '1257128388983738368', 'id': '1262263527943540736', 'deptParentName': '武汉润惠服饰有限公司' }, { 'deptName': '测试', 'deptParentId': '1257191478096773120', 'deptLevel': 1, 'enterpriseDeptTree': [], 'sheetNum': 0, 'zzlx': 1, 'qyId': '1257128388983738368', 'id': '1257512610488176640', 'deptParentName': '武汉润惠服饰有限公司' }], 'sheetNum': 0, 'zzlx': 0, 'qyId': '1257128388983738368', 'id': '1257191478096773120' }]
    }
  },
  methods: {
    handleNodeClick(data) {
      this.childrenData = data
      console.log(data)
    },
    changeColor() {
      this.theme.color = this.theme.color === 'blue' ? 'red' : 'blue'
      console.log(this.theme)
    }
  }
}
</script>
<style scoped>
</style>
