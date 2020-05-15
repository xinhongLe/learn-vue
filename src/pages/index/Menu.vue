<template>
  <el-menu
    @select="handleSelect"
  >
    <menu-item v-for="item in menus" :key="item.path" :menu="item" />
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
import settings from '@/router/settings'

export default {
  name: 'Menu',
  components: { MenuItem },
  computed: {
    menus() {
      return settings
    }
  },
  methods: {
    _findMenu(menus, k, v) {
      if (!menus || menus.length === 0) return
      for (let i = 0; i < menus.length; i++) {
        let menu = menus[i]
        if (menu[k] === v) return menu
        menu = this._findMenu(menu.children, k, v)
        if (menu) return menu
      }
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
      const menu = this._findMenu(this.menus, 'name', index)
      console.log(menu, 'open')
      if (menu.blank) {
        const newRoute = this.$router.resolve(menu)
        console.log(newRoute, 'ppp')
        // window.open(newRoute.href, '_blank')
      } else {
        this.$router.push({ name: index })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
