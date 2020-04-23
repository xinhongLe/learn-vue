<template>
  <el-submenu v-if="hasChildren" :index="menu.path">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ title }}</span>
    </template>
    <MenuItem v-for="item in children" :key="item.path" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="menu.name || menu.path">{{ title }}</el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: Object
  },
  computed: {
    title() {
      if (this.menu.title) return this.menu.title
      if (this.menu.meta && this.menu.meta.title) return this.menu.meta.title
      return this.path
    },
    hasChildren() {
      if (!this.menu.children || this.menu.children.length === 0) return false
      const childMenus = this.menu.children.filter(item => item.hidden === undefined || item.hidden === false)
      return childMenus.length > 0
    },
    children() {
      if (!this.hasChildren) return []
      return this.menu.children.filter(item => item.hidden === undefined || item.hidden === false)
    }
  }
}
</script>

<style scoped>

</style>
