<template>
  <div class="list">
    <div
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
        @dragend="dragend"
        draggable
        v-for="(item, index) in list"
        :key="item.label"
        class="list-item"
    >
      {{item.label}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { label: '列表1' },
        { label: '列表2' },
        { label: '列表3' },
        { label: '列表4' },
        { label: '列表5' },
        { label: '列表6' },
      ],
      dragIndex: '',
      enterIndex: '',
    };
  },
  methods: {
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      console.log(e.target,'ppp')
      this.enterIndex = index
    },
    dragend() {
      if (this.enterIndex && this.dragIndex !== this.enterIndex) {
        const source = this.list[this.dragIndex];
        this.list.splice(this.dragIndex, 1);
        this.list.splice(this.enterIndex, 0, source);
        this.dragIndex = ''
        this.enterIndex = ''
      }
    },
    dragover(e, index) {
      e.preventDefault();
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  margin: 40px;
  list-style: none;
  .list-item {
    cursor: move;
    width: 300px;
    background: skyblue;
    border-radius: 4px;
    color: #FFF;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
