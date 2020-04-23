<template>
  <div style="margin: 20px;">
    <h1> 需要添加 test-ooooo@0.0.1 依赖</h1>
    <hr>

    <el-tabs ref="tabs" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first" :tip="1">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second" :tip="tip">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-button type="success" @click="changeTipCount">点击我</el-button>
  </div>
</template>

<script>
export default {
  name: 'MyTabTip',
  data() {
    return {
      activeName: 'second',
      tip: 8
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    changeTipCount() {
      this.tip += 1
    }
  }
}
</script>

<style scoped>

</style>
