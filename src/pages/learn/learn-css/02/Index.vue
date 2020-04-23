<template>
  <el-row :gutter="25">
    <el-col :span="16" :offset="3">
      <el-form ref="inlineForm" class="inline-form" :inline="true" :model="inlineForm">
        <el-form-item label="申请码ID:" class="apply-id" prop="applyId">
          <el-input v-model="inlineForm.applyId" />
        </el-form-item>
        <el-form-item label="授权书编号:" class="authorization-no" prop="authorizationNo">
          <el-input v-model="inlineForm.authorizationNo" />
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="300px">
        <el-form-item label="贸易信息单号:" prop="tradeNO">
          <el-input v-model="form.tradeNO" />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      inlineForm: {
        applyId: '',
        authorizationNo: ''
      },
      form: {
        tradeNO: ''
      }
    }
  }

}
</script>

<style scoped lang="scss">
  .el-row {
    margin-top: 100px;
  }
  /deep/ .inline-form {
    padding-left: 226px;
    .el-form-item {
      width: calc(50% - 1px);
      margin-right: 0;

      &.apply-id {
        .el-form-item__content {
          /* 两个input之间留出间隔*/
          width: calc(100% - 150px);
        }
      }
      &.authorization-no {
        /* 两个form-item都是用float，都是设置width, 其中一个用calc*/
        .el-form-item__label {
          float: left;
          width: 100px;
        }
        .el-form-item__content {
          float: left;
          width: calc(100% - 100px);
        }
      }
    }
  }
</style>
