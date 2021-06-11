<template>
  <div style="margin: 60px;display: flex;justify-content: space-around">
    <div>
      <h4 style="margin-bottom: 20px">拖拽区域</h4>
      <div class="course-class" draggable="true" :data-id="'course-'+ index"
           v-for="(item, index) in courseList"
           :key="index"
           @dragstart="onDragstart($event)"
           @dragend="onDragend($event)"
      >
        <p>{{item.name}}</p>
      </div>
    </div>
    <div>
      <h4 style="margin-bottom: 20px">目标区域</h4>
      <div class="target-class"
           v-for="(item,index) in targetList"
           :key="index"
           :data-id="'target-' + index"
           draggable="true"
           @drop="onDrop($event)"
           @dragenter="onDragenEnter($event)"
           @onDragover="onDragover($event)"

      >
        <p>{{item.name ? item.name : ''}}</p>
        <p>{{item.tag ? '有班级' : '没有班级'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      courseList: [
        {name: '语文',score: '80'},
        {name: '数学',score: '90'},
        {name: '英语',score: '10'},
      ],
      targetList: [
        {},
        {tag: true},
        {},
      ],
      stargindex: '',
      endindex: '',
      move: false
    }
  },
  methods:{
    // 元素开始被拖动时候触发
    onDragstart(event) {
      console.log(event.target, 'onDragstart')
      this.stargindex = event.target.getAttribute('data-id')
      console.log(this.stargindex, 'stargindex')
    },
    // 在拖动操作完成时触发
    onDragend(event) {
      if(!this.move){
        return
      }

      this.removeClsClass()
      const courseIndex = this.stargindex.split('-')[1]
      const targetIndex = this.endindex.split('-')[1]

      if(!this.targetList[targetIndex].tag){
        alert('没有班级')
      }else{
        const currentObj =  this.targetList[targetIndex]
        this.targetList.splice(targetIndex, 1, Object.assign(currentObj, this.courseList[courseIndex]))
      }

      this.move = false
    },

    // 当被拖动元素进入目的地元素所占据的屏幕空间时触发
    onDragenEnter(event) {
      this.move = false
      if(event.target.className.indexOf('target-class') > -1){
        this.move = true
      }
      console.log(event, 'onDragenEnter')
      this.removeClsClass()
      event.target.classList.add('active')
      this.endindex = event.target.getAttribute('data-id')
    },
    removeClsClass() {
      const cls = document.getElementsByClassName('target-class')
      for (let i = 0; i < cls.length; i++) {
        cls[i].classList.remove('active')
      }
    },
    // 当被拖动元素在目的地元素内时触发
    onDragover(event) {

    },

    // 当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为。
    onDrop(event) {
      console.log(event, 'onDrop')
      // this.endindex = event.target.getAttribute('data-id')
      // console.log(this.endindex, 'endindex')
    }
  }
}
</script>

<style scoped lang="scss">
.course-class,.target-class{
  width: 100px;
  height: 100px;
  border: 1px solid rosybrown;
}
.target-class.active {
  border: 4px solid skyblue;
}
</style>
