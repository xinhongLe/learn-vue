<template>
  <div>
    <p v-for="item in 80" :key="item">
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>

</style>
