<template>
  <div class="contain">
    <div class="main"></div>
  </div>
</template>

<script>
export default {
  name: 'C'
}
</script>

<style scoped lang="scss">
.contain{
  height: 800px;
  width: 100%;
  border: 1px solid blue;
  text-align: center;
  &::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    background: #000;
    height: 100%;
    width: 0;
  }
  .main{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 200px;
    background-color: red;
  }
}
</style>
