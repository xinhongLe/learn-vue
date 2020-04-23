<template>
  <div>
    函数式组件， 传值
    <functional-component :a="1" :b="2">
      <template v-slot:default="{a, b}">
        a的值为{{ a }}
        <br>
        b的值为{{ b }}
        <hr>
      </template>
      <template v-slot:xxx="{a, b, c}">
        a的值为{{ a }}
        <br>
        b的值为{{ b }}
        <br>
        c的值为{{ c }}
      </template>
    </functional-component>
  </div>
</template>

<script>
import FunctionalComponent from '@learn/learn-component/01/functional-component'

export default {
  name: 'A',
  components: { FunctionalComponent }
}
</script>

<style scoped>

</style>
