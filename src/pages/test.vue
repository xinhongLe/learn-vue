<template>
  <div class="wxLogin">
    <iframe scrolling="no" width="100%" height="200px" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
    <div class="tip">扫码登录，安全快捷</div>
    <!--<textarea name="text" id="text" cols="30" rows="10"></textarea>-->
    <div id="text">我们被复制了</div>
    <button @click="myCopy()">点击复制文本框内的内容</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 应用唯一标识，在微信开放平台提交应用审核通过后获得
      appid: 'wxe1f5def243e0390b',
      // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
      scope: 'snsapi_login',
      // 重定向地址，需要进行UrlEncode
      redirect_uri: 'https://abstest.tenpay.com/abs/author/callBack.do',
      // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
      state: '',
      // 提供"black"、"white"可选，默认为黑色文字描述。
      theme: 'black',
      // 自定义样式链接，第三方可根据实际需求覆盖默认样式。由node生成
      href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE4MHB4O2hlaWdodDogMTgwcHg7fQ0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMTgwcHg7fQ0KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30='

    }
  },
  computed: {
    setSrc() {
      const _url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + this.appid +
          '&scope=' + this.scope +
          '&redirect_uri=' + this.redirect_uri +
          '&state=' + this.state +
          '&login_type=jssdk&self_redirect=default&style=' + this.theme +
          '&href=' + this.href
      return _url
    }
  },
  methods: {
    myCopy() {
      const div = document.getElementById('text')
      let range = ''
      // 非IE内核
      if (window.getSelection) {
        const selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(div)
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('Copy') // 执行浏览器复制命令
        this.$showTips('复制成功', 'success')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .wxLogin{
    height: 290px;
    text-align: center;
    .tip{
      font-size: 16px;
      font-weight: bold;
      color:#666666;
      margin-top: 20px;
      margin-bottom: 43px;
    }
  }
</style>
