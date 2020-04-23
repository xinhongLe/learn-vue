<template>
  <div>
    <h3>插槽</h3>
    <children-slot>
      <template v-slot:default="{user}">
        <p>{{ user.lastName }}</p>
        <el-button @click="handleClick(user.lastName)">{{ msg }}</el-button>
      </template>
      <template v-slot:other="{other}">
        <p>other</p>
        <p>{{ other.name }}</p>
      </template>

      <template v-slot:todo="{item}">
        <p v-if="item.isShow">
          {{ item.name }}
        </p>
      </template>
    </children-slot>
    <hr>
    <button @click="$router.push({name:'index'})">点击跳转首页</button>
  </div>
</template>

<script>
import childrenSlot from './components/children-slot'

export default {
  name: 'LearnSlot',
  components: {
    childrenSlot
  },
  data() {
    return {
      msg: 'hello word'
    }
  },
  methods: {
    handleClick(msg) {
      this.$message(msg)
    }
  }
}
</script>

<style scoped>

</style>
