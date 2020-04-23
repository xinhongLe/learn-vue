<template>
  <div class="box">
    <div class="header"></div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'LearnDisplay'
}
</script>

<style scoped lang="scss">
  .box {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 60px;
      background-color: skyblue
    }
    .main {
      flex: 1;
    }
    .footer {
      flex: 0 0 60px;
      background-color: pink
    }
  }
</style>
