<template>
  <div>
    <el-table :data="tableData" :header-row-style="headerMethod" :summary-method="getSummaries" show-summary :span-method="objectSpanMethod" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="total" label="合计"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1">
        <template slot-scope="{row}">
          <el-input v-model="row.amount1"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
    </el-table>

    <el-form ref="form" :model="form">
      <el-table :data="form.tableDataCol" border style="width: 100%;margin-top: 40px">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column v-for="(colTitle,index) in colData" :key="index" :label="colTitle">
          <template slot-scope="{row, $index }">
            <el-form-item :prop="`tableDataCol[${$index}][${index}]`" :rules="[{ required: true, message: '请输入',trigger:'blur'}]">
              <el-input v-model.trim="row[index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import * as testData from './data.js'
export default {
  name: 'Index',
  data() {
    return {
      ...testData,
      spanArr: [],
      pos: '',
      num: 0,
      form: {
        tableDataCol: []
      },
      colData: []
    }
  },
  created() {
    // this.getSpanArr(this.tableData)
    // this.sumRowMethod()
    // this.getHeight(200)

    this.transformData()
  },
  methods: {
    transformData() {
      const arr = []
      for (let i = 0; i < 5; i++) {
        arr[i] = []
      }
      const len = this.tableDataTest.length
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < len; j++) {
          arr[i][j] = this.tableDataTest[j]['a' + (i + 1)]
        }
      }
      this.form.tableDataCol = arr
      this.colData = this.tableDataTest.map(item => item.name)
    },
    getHeight(reduce) {
      if (!this.reduce) this.reduce = reduce
      this.tableHeight = window.innerHeight - this.reduce
      console.log(reduce, this.reduce, this.tableHeight, 'ok')
    },
    headerMethod({ row, rowIndex }) {
      console.log(row, rowIndex, 'ok')
      if (rowIndex === 0) {
        return { display: 'none' }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 2
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      this.sumRowMethod()
      // if (rowIndex === 0) {
      //   if (columnIndex === 2) {
      //     return [1, 5]
      //   } else if (columnIndex > 2) {
      //     return [0, 0]
      //   }
      // }
    },
    sumRowMethod() {
      this.tableData.forEach(item => {
        let sum = 0
        for (const key in item) {
          if (key.includes('amount')) {
            sum += Number(item[key])
          }
        }
        item.total = sum
      })
    },
    getSpanArr(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>

</style>
