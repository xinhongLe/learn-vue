<template>
  <div>
    <p>子组件</p>
    <slot :user="user">{{ user.firstName }}</slot>
    <slot name="other" v-bind="$data"></slot>
    <slot v-for="item in todoList" name="todo" :item="item">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ChildrenSlot',
  data() {
    return {
      user: {
        firstName: '后备内容',
        lastName: 'honghong'
      },
      other: {
        name: 'jiejie'
      },
      todoList: [
        { id: '1', name: 'one', isShow: true },
        { id: '2', name: 'two', isShow: false },
        { id: '3', name: 'three', isShow: true }
      ]
    }
  }
}
</script>

<style scoped>

</style>
