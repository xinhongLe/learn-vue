<template>
  <div>
    <el-button type="primary" @click="closeWindow">关闭当前浏览器</el-button>
    <div style="margin: 20px 0">
      <el-button type="primary" @click="handleClick(5)">函数</el-button>
      <el-button type="primary">防抖</el-button>
    </div>
    <div style="width: 400px">
      <p>watch监听(防抖)</p>
      {{ fullValue }}
      <el-input v-model="value" placeholder="placeholder"></el-input>
    </div>
    <div>
      <p>当前时间：{{ $moment().format('YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
    <div>
      <el-button type="primary">上传</el-button>
      <input ref="File" type="file" @change="handleUpload">
    </div>
    <div>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      date: [],
      data: 'pop',
      value: '',
      fullValue: '',
      arr: [
        { id: 1, name: 'hha' },
        { id: 2, name: 'lla' },
        { id: 3, name: 'yya' }
      ]
    }
  },
  watch: {
    value(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fullValue = val
      }, 500)
    }
  },
  mounted() {
    console.log(obj, '000')
    window.addEventListener('resize', this.debounce(this.conFn, 500), true)
    this.date = this.getLast7Days()
    console.log(this.$moment().add(7, 'd').format('YYYY-MM-DD'))
  },
  methods: {
    getLast7Days() {
      const date = []
      date.push(this.$moment().subtract('days', 6).format('YYYY-MM-DD'))
      date.push(this.$moment().subtract('days', 0).format('YYYY-MM-DD'))
      return date
    },
    handleUpload(e) {
      const file = e.target.files[0]
      console.log(e, 'ok')
    },
    closeWindow() {
      // ie
      window.opener = null
      window.open('', '_self')
      window.close()
    },
    handleOne(id) {
      if (id > 4) return
      return ['0', '1']
    },
    handleClick(id) {
      this.one = this.handleOne(id)
      console.log(this.one, 'one')
    },
    conFn() {
      console.log(this.data, 'ok')
    },
    debounce(fn, wait) {
      var timeout = null
      return function() {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    }
  }
}
</script>
<style scoped>
</style>
