<template>
  <div class="container">
    <div class="layout">
      <button
        v-for="val in layoutOptions"
        :key="val.value"
        class="layout-btn"
        @click="layoutType=val.value"
      >{{ val.label }}</button>
    </div>

    <div
      v-for="(group,gindex) in data"
      :key="gindex"
      class="group"
      :class="{'left-top-container': gindex===0,
               'right-top-container': gindex===1,
               'bottom-container': gindex===2,
               'top-container': gindex<2}"
    >
      <div
        v-for="(item,cindex) in group.children"
        :key="cindex"
        class="cls-default"
        :data-id="gindex+'-'+cindex"
        draggable="true"
        @dragstart="onDragstart($event)"
        @dragend="onDragend($event)"
        @dragover="onDragover($event)"
        @drop="onDrop($event)"
        :style="{'background-color': item.color}"
        :class="{'cls1-0': cindex ===0 && layoutType==1,
                 'cls2-0': (cindex ===0 || cindex ===1) && layoutType==2,
                 'cls3-0': cindex ===0 && layoutType==3,
                 'cls3-1': (cindex ===1 || cindex ===2) && layoutType==3,
                 'cls4-0': cindex <4 && layoutType==4,
                 'cls6-0': cindex === 0 && layoutType==6
        }"
      >
        <div class="content">{{ item.color ? item.color : '我是空对象' }}
        </div>
        <div>{{ item.text ? item.text : '' }}</div>
      </div>
    </div>
    <div class="tips">上面两个区域内是展示区的内容能互相拖拽
      <br>下面的是资源区，只能复制出去覆盖目标区域，本身不会被替换掉
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stargindex: '',
      endIndex: '',
      layoutType: '6',
      layoutOptions: [
        { label: '单分屏', value: 1 },
        { label: '二分屏', value: 2 },
        { label: '三分屏', value: 3 },
        { label: '四分屏', value: 4 },
        { label: '六分屏', value: 6 },
        { label: '九分屏', value: 9 }
      ],
      data: [
        {
          group: 'left-show',
          title: '视频播放区一',
          children: [
            {
              id: 6,
              color: 'orange'
            },
            {
              id: 2,
              color: 'yellow'
            },
            {},
            // {},
            // {},
            // {},
            // {
            //   id: 3,
            //   color: 'cyan'
            // },
            // {},
            // {
            //   id: 5,
            //   color: 'brown'
            // }
          ]
        },
        {
          group: 'right-show',
          title: '视频播放区二',
          children: [
            {},
            {
              id: 7,
              color: 'pink'
            },
            {},
            {},
            { id: 4, color: 'purple' },
            // {},
            // {},
            // {},
            // {
            //   id: 10,
            //   color: 'gray'
            // }
          ]
        },
        {
          group: 'source',
          title: '视频资源区',
          children: [
            {
              id: 11,
              color: 'white'
            },
            {
              id: 12,
              color: 'black'
            },
            // {
            //   id: 13,
            //   color: 'red'
            // },
            // {
            //   id: 14,
            //   color: 'green'
            // },
            // {
            //   id: 15,
            //   color: 'blue'
            // }
          ]
        }
      ]
    }
  },
  methods: {
    onDragstart(event) {
      // console.log(event, 'event')
      this.stargindex = event.target.getAttribute('data-id')
      console.log(this.stargindex, ' this.stargindex')
    },
    onDragend(event) {
      console.log('onDragend')
      const startGroupIndex = this.stargindex.split('-')[0]
      const startChildIndex = this.stargindex.split('-')[1]
      const endGroupIndex = this.endIndex.split('-')[0]
      const endChildIndex = this.endIndex.split('-')[1]
      // 对数据做简单的深拷贝 目前不需要
      // let endObj = JSON.parse(
      //  JSON.stringify(this.data[endGroupIndex].children[endChildIndex])
      // );
      // let startObj = JSON.parse(
      //  JSON.stringify(this.data[startGroupIndex].children[startChildIndex])
      // );
      // alert('确认')
      const endObj = Object.assign({}, this.data[endGroupIndex].children[endChildIndex], { text: '测试一下啦' })
      // console.log(endObj, 'endObj')
      // const startObj = this.data[startGroupIndex].children[startChildIndex]
      // if (this.data[endGroupIndex].group === 'source') {
      //   // 往资源区拖拽时 不做任何替换操作
      //   return
      // }
      this.data[endGroupIndex].children.splice(endChildIndex, 1, endObj)
      // if (this.data[startGroupIndex].group !== 'source') {
      //   // 拖拽起始区域不是 source时 把起始区域替换成拖拽后区域的数据
      //   this.data[startGroupIndex].children.splice(startChildIndex, 1, endObj)
      // }
    },
    onDragenEnter(event) {
      // event.style.color = 'red'
      console.log(event.target, 'onDragenEnter', event.target.classList.contains('cls-default'))
      const cls = document.getElementsByClassName('cls-default')
      console.log(cls, 'cls')
      if (!event.target.classList.contains('cls-default')) {
        this.removeClsClass(cls)
        return
      }
      // 移除所有的标签选中样式
      this.removeClsClass(cls)
      // 目标元素增加高亮
      event.target.classList.add('active')
    },
    removeClsClass(cls) {
      for (let i = 0; i < cls.length; i++) {
        cls[i].classList.remove('active')
      }
    },
    onDrop(event) {
      // event.target.remove()
      console.log(event.target, 'onDrop')
      // if (event.target.className.indexOf('cls-default') > -1) {
      //   this.endIndex = event.target.getAttribute('data-id')
      //   console.log(this.endIndex, 'onDrop-data-id--11')
      // } else {
      //   this.endIndex = event.target.parentElement.getAttribute('data-id')
      //   console.log(this.endIndex, 'onDrop-data-id--22')
      // }
    },
    onDragover(event) {
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #eee;
  height: 800px;
}
.layout .layout-btn {
  background-color: #409eff;
  color: #fff;
  padding: 10px 15px;
  margin: 10px 15px;
}
.tips {
  font-size: 24px;
  text-align: center;
}
.group {
  float: left;
  overflow: hidden;
  box-sizing: border-box;
}
.group-title {
  height: 40px;
  line-height: 40px;
}
.cls-default {
  float: left;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #999;
}
.cls-default.active {
  border: 2px solid #f60000;
}
.cls-default .content {
  text-align: center;
  padding-top: 20px;
  font-size: 20px;
}
.top-container {
  height: 400px;
  width: 40%;
  margin: 15px 5%;
}
.top-container .cls-default {
  width: 33.33%;
  height: 33.33%;
}
.top-container .cls1-0 {
  width: 100%;
  height: 100%;
}
.top-container .cls2-0 {
  width: 50%;
  height: 100%;
}
.top-container .cls3-0 {
  width: 50%;
  height: 100%;
}
.top-container .cls3-1 {
  width: 50%;
  height: 50%;
}
.top-container .cls4-0 {
  width: 50%;
  height: 50%;
}
.top-container .cls6-0 {
  width: 66.66%;
  height: 66.65%;
}
.bottom-container {
  width: 90%;
  height: 200px;
  margin: 15px 5%;
}
.bottom-container .cls-default {
  width: 15%;
  height: 150px;
}
</style>

<!--
<template>
    <div>
    &lt;!&ndash;使用draggable组件&ndash;&gt;
    <div class="itxst">
      <div class="col">
        <div class="title" >国内网站</div>
        <draggable v-model="arr1" group="site"  animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
          <transition-group>
            <div class="item" v-for="item in arr1" :key="item.id">{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
      <div  class="col">
        <div class="title" >你可以把左边的元素拖到右边</div>
        <draggable v-model="arr2" group="site" animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
          <transition-group>
            <div class="item" v-for="item in arr2" :key="item.id">{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
&lt;!&ndash;  <div>
    <div id="source" style="width: 100px;height: 100px;background-color: pink" draggable="true"></div>
    <div id="target" style="width: 200px;height: 120px;border: 1px solid seagreen" class="box2"></div>
  </div>&ndash;&gt;
</template>

<script>
// 导入draggable组件
import draggable from 'vuedraggable'
export default {
  // 注册draggable组件
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      // 定义要被拖拽对象的数组
      arr1: [
        { id: 1, name: 'www.itxst.com' },
        { id: 2, name: 'www.jd.com' },
        { id: 3, name: 'www.baidu.com' },
        { id: 3, name: 'www.taobao.com' }
      ],
      arr2: [
        { id: 1, name: 'www.google.com' },
        { id: 2, name: 'www.msn.com' },
        { id: 3, name: 'www.ebay.com' },
        { id: 4, name: 'www.yahoo.com' }
      ]
    }
  },
  methods: {
    // //开始拖拽事件
    // onStart(){
    //   this.drag=true;
    // },
    // //拖拽结束事件
    // onEnd() {
    //   this.$alert('oklala')
    //   this.drag=false;
    // },

  },
  /*mounted() {
    var source = document.getElementById('source')
    var target = document.getElementById('target')
    source.ondragstart = function(event) {
      var e = event || window.event
      console.log('开始拖拽')
      e.dataTransfer.setData('text', e.target.id)
    }
    target.ondragenter = function() {
      console.log('进入目标元素')
    }
    target.ondragover = function(event) {
      var event = event || window.event
      console.log('在目标元素中拖拽')
      event.preventDefault()
    }
    target.ondragleave = function() {
      console.log('拖放离开目标元素')
    }
    target.ondrop = function(event) {
      alert('确定')
      console.log('拖放')
      var e = event || window.event
      var data = e.dataTransfer.getData('text')
      e.target.appendChild(document.getElementById(data))
    }
  }*/
}
</script>

<style scoped>
/*定义要拖拽元素的样式*/
.ghostClass{
  background-color:  blue !important;
}
.chosenClass{
  background-color: red !important;
  opacity: 1!important;
}
.dragClass{
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow:none !important;
  outline:none !important;
  background-image:none !important;
}
.itxst{
  margin: 10px;

}
.title{
  padding: 6px 12px;
}
.col{
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius:5px ;
  float: left;
}
.col+.col{
  margin-left: 10px;
}

.item{
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border:  solid 1px #eee;
  background-color: #f1f1f1;
}
.item:hover{
  background-color: #fdfdfd;
  cursor: move;
}
.item+.item{
  border-top:none ;
  margin-top: 6px;
}
</style>
-->
