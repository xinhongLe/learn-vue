<template>
  <div class="container">
    <!--  选择项目  -->
    <el-dialog
      title="选择项目"
      width="30%"
      :visible.sync="projectVisible"
      :center="false"
      append-to-body
      @close="handleCancelProjectDialog"
    >
      <el-tree
        ref="projectTree"
        :data="projectList"
        show-checkbox
        node-key="id"
        :props="{children: 'children',label: 'label'}"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelProjectDialog">取 消</el-button>
        <el-button type="primary" @click="handleConfirmProjectDialog">确 定</el-button>
      </div>
    </el-dialog>

    <el-form ref="tempForm" :model="tempStaff" label-width="100px">
      <el-form-item label="所属项目" class="select-project">
        <div class="el-select el-select--medium">
          <div class="el-select__tags" style="width: 100%; max-width: 277.438px;">
            <span>
              <span
                v-for="(item, i) in tempStaff.projects"
                :key="item.id"
                class="el-tag el-tag--info el-tag--small el-tag--light"
              >
                <span class="el-select__tags-text">{{ item.label }}</span>
                <i
                  class="el-tag__close el-icon-close"
                  @click="handleDeleteProjects(i)"
                ></i>
              </span>
            </span>
          </div>
          <div class="el-input el-input--medium el-input--suffix">
            <input type="text" readonly="readonly" class="el-input__inner" style="height: 40px;">
          </div>
        </div>
        <el-button @click="handleSelectProject">+项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      projectList: [
        { id: '1', label: '11' },
        { id: '2', label: '22' }
      ],
      projectVisible: false,
      tempStaff: {
        projects: []
      }
    }
  },
  methods: {
    handleSelectProject() {
      this.projectVisible = true
    },
    handleDeleteProjects(index) {
      this.tempStaff.projects.splice(index, 1)
      this.$refs.projectTree.setCheckedNodes(this.tempStaff.projects)
    },
    handleConfirmProjectDialog() {
      this.tempStaff.projects = this.$refs.projectTree.getCheckedNodes()
      this.projectVisible = false
    },
    handleCancelProjectDialog() {
      this.projectVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    margin: 400px 0 0 400px;
  }
  .select-project {
    .el-form-item__content {
      .el-button {
        margin-left: 30px;
      }
    }
  }
</style>
