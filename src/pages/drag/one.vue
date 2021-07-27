<template>
  <div class="content">
    <div class="left">
      <div v-for="(item,index) in dragList" class="drag-class" :key="index" :data-id="'target'+ index" @mousedown="handleMousedown">
        <p>科目：{{item.name}}</p>
        <p>分数：{{item.score}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexNew",
  data() {
    return {
      targetDom: '',
      dragList:  [
        {name: '语文',score: '80'},
        {name: '数学',score: '90'},
        {name: '英语',score: '10'},
      ],
      dragStartOptions:{
        offsetX: '',
        offsetY: '',
      },
    }
  },
  methods: {
    handleMousedown(e) {
      console.log(e.target, 'ppp')
      this.dragStartOptions = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
      }

      if (e.target.classList.contains('drag-class')) {
        this.dragDom = e.target.cloneNode(true)
      } else {
        this.dragDom = e.target.parentNode.cloneNode(true)
      }
      console.log(this.dragDom, 'dragdom')

      document.body.appendChild(this.dragDom)
      this.dragDom.style.position = 'absolute'
      this.dragDom.style.left = e.clientX - e.offsetX + 'px'
      this.dragDom.style.top = e.clientY - e.offsetY + 'px'
      this.dragDom.classList.add('drag-dom-class')

    },
  },
  mounted() {
    document.addEventListener('mousemove',(e) => {
      if(this.dragDom){
        this.dragDom.style.left = e.clientX - this.dragStartOptions.offsetX +'px'
        this.dragDom.style.top = e.clientY - this.dragStartOptions.offsetY + 'px'
      }
    }),

      document.addEventListener('mouseup', e => {
        if(this.dragDom){
          document.body.removeChild(this.dragDom)
          this.dragDom = null
          this.dragIndex = ''
        }

      })
  }
}
</script>

<style scoped lang="scss">
.content{
  display: flex;
  justify-content: space-between;
  margin: 40px;
  .left{
    width: 200px;
    box-sizing: border-box;
    border:1px solid #333;
    margin-bottom: 1px;
    >div{
      width: 100%;
      background-color: #fff;
      padding: 20px;
      border-bottom: 1px solid rgba(0,0,0,.125);
      cursor: pointer;
    }
  }
}
</style>
