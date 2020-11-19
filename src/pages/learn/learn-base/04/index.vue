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
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987122',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],
      spanArr: [],
      pos: '',
      num: 0,
      arr: [1, 2, 3, 4]
    }
  },
  mounted() {
    this.getSpanArr(this.tableData)
    // this.sumRowMethod()
    // this.getHeight(200)
    this.aa(...this.arr)
  },
  methods: {
    aa(res, ...aa) {
      console.log(res, aa, 'ppp')
      // this.timer = setInterval(() => {
      //   console.log(this.timer, 'ok')
      //   this.num++
      //   if (this.num > 4) {
      //     clearInterval(this.timer)
      //     console.log(this.timer, 'pp')
      //   }
      // }, 1000)
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
