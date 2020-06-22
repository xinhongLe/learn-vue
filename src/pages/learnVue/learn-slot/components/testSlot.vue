<template>
  <div>
    <slot name="top" ></slot>
    <p>动态插槽</p>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
export default {
  nHme: 'TestSlot'
}
</script>
<style scoped>
</style>
