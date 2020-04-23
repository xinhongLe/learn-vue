<template>
  <div>
    {{ name }}
    <button @click="handleClickChangeA">点击一下改变父组件的name属性</button>
    <hr>
    <button @click="handleClickChangeApp">点击一下改变APP组件的name属性</button>
  </div>
</template>

<script>
export default {
  name: 'B',
  inject: ['A', 'app', 'setChild'],
  data() {
    return {
      bName: 'b-component-name'
    }
  },
  methods: {
    handleClickChangeA() {
      this.A.name = 'BBB'
      this.setChild('B-component', this)
    },
    handleClickChangeApp() {
      this.app.name = 'changed APP'
    }
  },
  computed: {
    name() {
      return this.A.name
    }
  }
}
</script>

<style scoped>

</style>
