<!--suppress ALL -->
<template>
  <div>
    <el-form :model="form">
      <el-table :data="form.infoList" border>
        <el-table-column prop="title" label="标题" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'infoList['+scope.$index+'].title'">
              <el-input v-model.trim="form.infoList[scope.$index].title" placeholder="输入信息标题"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="上传图片" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item :prop="'infoList['+scope.$index+'].url'">
              <template v-if="!form.infoList[scope.$index].url">
                <el-button size="mini" type="primary" @click="$refs.imgFile.click()">点击上传</el-button>
              </template>
              <div v-else>
                <input
                  ref="imgFile"
                  style="display: none;"
                  type="file"
                  name="file"
                  @change="handleImgUpload($event,scope.$index)"
                />
                <span class="blue-txt" @click="$refs.imgFile.click()">
                  {{ form.infoList[scope.$index].url + ' ---- ' + scope.$index }}
                </span>
              </div>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleRemove(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      form: {
        infoList: [
          { title: '111', url: 'http://xxxx' },
          { title: '222', url: 'http://yyyy' },
          { title: '333', url: 'http://zzzz' }
        ]
      }
    }
  },
  methods: {
    handleRemove(index) {
      console.log('index', index)
    },
    handleImgUpload(e, index) {
      console.log('index', index)
    }
  }
}
</script>

<style scoped>

</style>
