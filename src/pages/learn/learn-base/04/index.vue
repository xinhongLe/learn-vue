<template>
  <div>
    <!--:header-row-style="headerMethod"-->
    <el-table :data="tableData" class="customTable" :summary-method="getSummaries" show-summary :span-method="objectSpanMethod" border style="width: 100%">
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

    <div style="margin-top: 40px">
      <div>
        <el-button type="primary" @click="handleShowDom">显示设置</el-button>
        <div v-if="showDom" style="margin-top: 10px">
          <div>
            <el-button size="mini" type="primary" @click="handleReset">重置</el-button>
            <el-button size="mini" type="primary" @click="handleConfirm">确认</el-button>
          </div>
          <el-table ref="multipleTable" :data="selectData" style="width: 100%" :show-header="false" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :selectable="isDisabledSelect">
            </el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-table :data="tableData1" border style="width: 100%;margin-top: 40px">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column v-for="(item,index) in selectData.filter(item => item.check)" :key="index" :label="item.name">
          <template slot-scope="{row}">
            <span>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 40px">
      <el-table :data="tableData1" border style="width: 100%;margin-top: 40px">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column v-for="(item,index) in selectData.filter(item => item.check)" :key="index" :label="item.name">
          <template slot-scope="{row}">
            <span>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 40px">
      <el-table :data="tableData2" border style="width: 80%" size="small">
        <el-table-column align="center" header-align="center" type="index" label="序号" width="60"> </el-table-column>
        <el-table-column align="center" header-align="center" prop="name" label="名称" width="200"> </el-table-column>
        <el-table-column align="center" header-align="center" prop="name" label="题量"></el-table-column>
        <el-table-column align="center" header-align="center" prop="address" label="预计用时"> </el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.$index, scope.row, 'up')" type="text" size="small"> 上移 </el-button>
            <el-button @click="deleteRow(scope.$index, scope.row, 'down')" type="text" size="small"> 下移 </el-button>
            <el-button @click="deleteRow(scope.$index, scope.row, 'del')" type="text" size="small" class="dangerBtn"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

   <div style="margin-top: 20px">
     <el-switch v-model="value" @change="handleSwitchChange" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
   </div>
  </div>
</template>

<script>
import * as testData from './data.js'
export default {
  name: 'Index',
  computed: {

  },
  data() {
    return {
      value: true,
      ...testData,
      spanArr: [],
      pos: '',
      num: 0,
      form: {
        tableDataCol: []
      },
      colData: [],
      multipleSelection: [],
      showDom: false
    }
  },
  created() {
    this.getSpanArr(this.tableData)
    // this.sumRowMethod()
    // this.getHeight(200)

    this.transformData()
    localStorage.setItem('value', JSON.stringify({ name: 'hong' }))
    this.$once('hook:beforeDestroy', () => {
      localStorage.removeItem('value')
    })
  },
  // beforeDestroy() {
  //   localStorage.removeItem('value')
  // },
  methods: {
    deleteRow (index, e, type) {
      if (type === 'up') {
        if (index === 0) {
          return
        }
        // 在上一项插入该项
        this.tableData2.splice(index - 1, 0, (this.tableData2[index]))
        // 删除后一项
        this.tableData2.splice(index + 1, 1)
      } else if (type === 'down') {
        if (index === (this.tableData2.length - 1)) {
          return
        }
        // 在下一项插入该项
        this.tableData2.splice(index + 2, 0, (this.tableData2[index]))
        // 删除前一项
        this.tableData2.splice(index, 1)
      } else if (type === 'del') {
        this.tableData2.splice(index, 1)
      }
    },
    handleSwitchChange() {
      const ref = document.querySelector('.switchClass .el-switch__input')
      ref.blur()
    },
    handleReset() {
      this.selectData.forEach((item, index) => {
        if (index !== 0) {
          item.check = false
        }
      })
      this.toggleSelection(this.selectData)
    },
    handleShowDom() {
      this.showDom = !this.showDom
      if (this.showDom) {
        this.toggleSelection(this.selectData)
      }
    },
    handleConfirm() {
      const arr = this.multipleSelection.map(item => item.name)
      console.log(arr, 'opp')
      this.selectData.forEach(item => {
        if (!arr.includes(item.name)) {
          item.check = false
        } else {
          item.check = true
        }
      })
    },
    isDisabledSelect(row, index) {
      if (index === 0) {
        return false
      }
      return true
    },
    toggleSelection(rows) {
      rows.forEach((row, index) => {
        if (row.check) {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, false)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
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
      console.log(columns, data)
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
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
    },
    showSummariesPosition() {
     /* const table = document.querySelector('.customTable')
      const footer = document.querySelector('.customTable .el-table__footer-wrapper')
      const body = document.querySelector('.customTable .el-table__body-wrapper')
      table.removeChild(footer)
      table.insertBefore(footer, body)*/
    }
  },
  mounted() {
    this.showSummariesPosition()
  }
}
</script>

<style scoped>

</style>
