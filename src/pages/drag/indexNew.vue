<template>
  <div class="content">
    <div class="left">
      <div v-for="(item,index) in dragList" class="drag-class" :key="index" :data-id="'target'+ index" @mousedown="handleMousedown">
        <p>科目：{{item.name}}</p>
        <p>分数：{{item.score}}</p>
      </div>
    </div>
    <div class="right" id="rightDom">
      <div v-for="(item,index) in targetList" :key="index" class="target-class" :id="'target'+ index">
        <p>班级：{{item.class}}</p>
        <p>科目：{{item.name ? item.name : '无排课'}}</p>
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
        targetList: [
          {class: '班级1',score: '80'},
          {class: '班级2',score: '90'},
          {class: '班级3',score: '10'},
          {class: '班级3',score: '10'},
          {class: '班级3',score: '10'},
          {class: '班级3',score: '10'},
          {class: '班级3',score: '10'},
          {class: '班级3',score: '10'},
        ],
        dragStartOptions:{
          offsetX: '',
          offsetY: '',
        },
        dragIndex: '',
        dragDom: null,
        rightDom: null,
      }
    },
    methods: {
      handleMousedown(e) {
        this.dragStartOptions = {
          offsetX: e.offsetX,
          offsetY: e.offsetY,
        }
        this.dragIndex = e.target.getAttribute('data-id')

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
      removeClsClass() {
        const cls = document.getElementsByClassName('target-class')
        for (let i = 0; i < cls.length; i++) {
          cls[i].classList.remove('active')
        }
      },
    },
    mounted() {
      document.addEventListener('mousemove',(e) => {
        if(this.dragDom){
          this.dragDom.style.left = e.clientX - this.dragStartOptions.offsetX +'px'
          this.dragDom.style.top = e.clientY - this.dragStartOptions.offsetY + 'px'

          const dragX = e.clientX
          const dragY = e.clientY

          this.rightDom = document.getElementById('rightDom')
          const scrollTop = this.rightDom.scrollTop
          const parent = this.rightDom.getBoundingClientRect()
          // console.log(parent,'parent')
          const top = parent.top
          const bottom = parent.bottom
          const left = parent.left
          const right = parent.right

          if (dragX > left && dragX < right && dragY > top && dragY < bottom) {

            const child = this.rightDom.firstElementChild.getBoundingClientRect()
            const childHeight = child.height

            this.removeClsClass()

            this.targetList.some((item, index)=>{
              if (dragX > left && dragX < right && dragY > top  + childHeight * index - scrollTop && dragY < top  + childHeight + childHeight * index - scrollTop) {
                this.targetDom = document.getElementById('target' + index)
                this.targetDom.classList.add('active')
                console.log(index, 'index')
                return true
              }
            })
          }
        }
      }),

      document.addEventListener('mouseup', e => {
        if(this.dragDom){
          document.body.removeChild(this.dragDom)
          this.dragDom = null
          this.dragIndex = ''
        }

        if(this.targetDom){
          this.removeClsClass()
          this.targetDom = ''

        }

      })
    }
  }
</script>

<style scoped lang="scss">
.content{
  display: flex;
  justify-content: space-between;
  margin: 100px;
  .left{
    width: 200px;
    box-sizing: border-box;
    border:1px solid #333;
    >div{
      width: 100%;
      background-color: #fff;
      padding: 20px;
      margin-bottom: -1px;
      border: 1px solid rgba(0,0,0,.125);
      cursor: pointer;
    }
  }

  .right{
    width: 200px;
    box-sizing: border-box;
    border:1px solid #333;
    height: 400px;
    overflow-y: auto;
    >div{
      width: 100%;
      background-color: #fff6b2;
      padding: 20px;
      margin-bottom: -1px;
      border: 1px solid rgba(0,0,0,.125);
      cursor: pointer;
    }
    .active{
      background-color: pink;
    }
  }
}
</style>
