<template>
  <div class="contain">
    <div class="main"></div>
  </div>
</template>

<script>
export default {
  name: 'A'
}
</script>

<style scoped lang="scss">
  .contain {
    position: relative;
    border: 1px solid red;
    height: 800px;
    .main {
      width: 200px;
      height: 200px;
      background-color: pink;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
