<template>
  <div>
    <div style="margin-bottom: 20px">
      <slot name="tableHeader" :checkIds="checkIds"></slot>
    </div>
    <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" align="center" label="日期"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="address" align="center" label="地址"></el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <slot name="tableOperation" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TableSlot',
  props: {
    tableData: {
      type: Array
    }
  },
  data() {
    return {
      checkRows: [],
      checkIds: []
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.checkRows = rows
      this.checkIds = rows.map(val => val.id)
    }
  }
}
</script>
<style scoped>
</style>
