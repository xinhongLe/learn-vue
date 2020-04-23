<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: 'App'
    }
  },
  provide() {
    return {
      app: this
    }
  }
}
</script>
