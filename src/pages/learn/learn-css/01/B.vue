<template>
  <div class="contain">
    <div class="main">
    </div>
  </div>
</template>

<script>
export default {
  name: 'B'
}
</script>

<style scoped lang="scss">
  .contain{
    display: flex;
    /*justify-content: center;*/
    /*align-items: center;*/
    height: 800px;
    border: 2px  solid pink;
    .main{
      /*margin-left: auto;*/
      /*margin-right: auto;*/
      width: 200px;
      height: 200px;
      background-color: #44b0c3;
      align-self: center;
    }
  }

</style>
