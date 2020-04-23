<template>
  <td>
    <slot :row="$parent.$props.item">{{ value }}</slot>
    <!--    <span>{{value}}</span>-->
  </td>
</template>

<script>
export default {
  name: 'MyTd',
  props: {
    prop: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      // value: '我是td'
    }
  },
  computed: {
    value() {
      return this.$parent.$props.item[this.prop]
    }
  },
  mounted() {
    // console.log(this.prop)
    // console.log(this.$parent.$props.item)
    // console.log(this.$parent.$props.item[this.prop])
  }

}
</script>

<style scoped>

</style>
