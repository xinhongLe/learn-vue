<template>
  <div>
    <B />
  </div>
</template>

<script>
import B from './B'

export default {
  name: 'A',
  components: { B },
  data() {
    return {
      name: 'aaa'
    }
  },
  provide() {
    return {
      A: this,
      // 获取子组件的实例， 可以利用方法setchild,但需要使用箭头函数
      setChild: (name, val) => {
        this[name] = val
        console.log(this)
      }
    }
  }
}
</script>

<style scoped>

</style>
