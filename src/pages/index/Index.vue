<template>
  <el-container>
    <el-aside width="280px">
      <Menu />
    </el-aside>
    <el-container>
      <!--      <el-header>Header</el-header>-->
      <el-main>
        <router-view />
      </el-main>
      <!--      <el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
import Menu from './Menu'

export default {
  name: 'Index',
  components: { Menu }
}
</script>

<style lang="scss">
  .el-container {
    height: calc(100vh);
  }
</style>
