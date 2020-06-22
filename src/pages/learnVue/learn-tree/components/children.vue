<template>
  <div>
    <div>子组件</div>
    {{ dept }}
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadDate" :key="item">{{ item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div :style="{color: theme.color}">字体颜色</div>
  </div>
</template>
<script>
export default {
  name: 'Children',
  inject: ['childrenData', 'treeList', 'theme'],
  computed: {
    dept() {
      return this.childrenData()
    },
    tree() {
      return this.treeList()
    }
  },
  watch: {
    dept() {
      this.breadDate = []
      this.findParent(this.dept.id, this.tree, this.breadDate)
    }
  },
  data() {
    return {
      breadDate: []
    }
  },
  methods: {
    findParent(id, treeData, currentList) {
      treeData.forEach(item => {
        if (item.id === id) {
          currentList.unshift(item.deptName)
          this.findParent(item.deptParentId, this.tree, currentList)
        } else if (item.enterpriseDeptTree && item.enterpriseDeptTree.length) {
          this.findParent(id, item.enterpriseDeptTree, currentList)
        }
        return currentList
      })
    }
  },
  mounted() {
     this.findParent(this.dept.id, this.tree, this.breadDate)
  }
}
</script>
<style scoped>
</style>
