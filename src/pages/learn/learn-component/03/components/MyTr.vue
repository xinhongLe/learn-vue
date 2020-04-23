<template>
  <tr>
    <!--        <my-td prop="id"></my-td>-->
    <!--        <my-td prop="name"></my-td>-->
    <slot>222</slot>
  </tr>
</template>

<script>
export default {
  name: 'MyTr',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
