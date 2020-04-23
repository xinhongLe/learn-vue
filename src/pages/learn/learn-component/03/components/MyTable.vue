<template>
  <table>
    <my-tr v-for="item in data" :key="item.id" :item="item">
      <!--      <my-td prop="name"></my-td>-->
      <slot></slot>
    </my-tr>
  </table>
</template>

<script>
import MyTr from './MyTr'

export default {
  name: 'MyTable',
  components: { MyTr },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
