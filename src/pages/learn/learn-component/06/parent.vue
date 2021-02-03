<template>
  <div style="height: 100%">
    <iframe name="myFrame" src="/static/childIframe.html" style="width: 100%;height: 100%"></iframe>
  </div>
</template>
<script>
  export default {
    name: "parent",
    methods: {
      name() {

      }
    },
    methods: {
      handleReg() {
        const url = 'http:www.baidu.com/index?name=username&age=27&pwd=zbc|123@&likes=lol&likes=beautifull girl'
        const reg = /([^?&=]+)=([^?&=]*)/g
        const arr = url.match(reg) // ["name=username", "age=27", "pwd=zbc|123@", "likes=lol", "likes=beautifull girl"]
        const obj = {} // {name: "username", age: "27", pwd: "zbc|123@", likes: "beautifull girl"}
        arr.forEach(item => {
          let query = item.split('=')
          obj[query[0]] = query[1]
        })
      }
    },
    mounted() {
      this.handleReg()
      window.addEventListener('message',(msg) => {
        //
        if(msg.data.name){
          const host = window.location.href
          console.log(host, 'host')
          window.location.href = host + '?applyCode=' + msg.data.name
        }
        console.log(msg.data,'ok')
      })
    }
  }
</script>
<style scoped>
</style>
