<template>
  <div class="xxx">
    <div class="block" @click="switchLogin('qy')">
      <div :class="{'active':active === 'qy'}" class="mask qy"></div>
      <span>企业开票</span>
    </div>
    <div class="block" @click="switchLogin('self')">
      <div :class="{'active':active === 'self'}" class="mask self"></div>
      <span>个人/其他</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XXX',
  data() {
    return {
      active: 'qy'
    }
  },
  methods: {
    switchLogin(type) {
      this.active = type
    }
  }
}
</script>

<style scoped lang="scss">

  .xxx {
    margin: 50px 10px;
    font-size: 0;
    height: 40px;
    position: relative;
    .block {
      display: inline-block;
      vertical-align: middle;
      width: 40%;
      height: 100%;
      text-align: center;
      line-height: 45px;
      font-size: 14px;
      position: relative;
      &.active {
        color: #44b0c3;
      }
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        padding-left: 100px;
        z-index: -1;
        &.qy.active {
          border: 50px solid #cccccc;
          border-right-color: transparent;
          border-bottom: 0;
        }
        &.self.active {
          border: 50px solid #cccccc;
          border-left-color: transparent;
          border-bottom: 0;
        }
      }
    }
  }
</style>
