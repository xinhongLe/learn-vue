<template>
  <div class="hello">
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        height="600"
        :row-class-name="tableRowClassName"
        row-key="id"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name | nameFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    '$route': {
      handler(to, from) {
        console.log('to', to, 'from', from)
      },
      // 代表在wacth里声明了$route这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  filters: {
    nameFilter: function(value) {
      // 鼠标移入每次都会调用过滤器
      return value + '1'
    }
  },
  data() {
    return {
      currentPage: 4,
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '5',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '6',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '7',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '8',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  mounted() {
    // document.getElementsByClassName('table-wrapper')[0].style.height = (document.documentElement.clientHeight - 300) + 'px'
  }
}
</script>

<style scoped lang="scss">
  .hello {
    padding-left: 210px;
    padding-top: 100px;
    .table-wrapper {
      /*max-height: 500px;*/
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      /*border: 1px solid #cccccc;*/
    }
    .block {
      text-align: right;
      position: fixed;
      bottom: 5%;
      right: 5%;
    }
  }

</style>
