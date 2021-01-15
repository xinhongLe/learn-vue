<template>
  <div>
    <div style="margin: 20px 0">
      <span>附件列表：</span>
      <el-button type="primary" :disabled="formDisabled" @click="$refs.file.click()">上传附件</el-button>
      <input ref="file" type="file" accept=".png,.doc,.docx,.xls,.xlsx,.pdf," style="display: none" @change="uploadFileChange">
    </div>
    <el-table border :data="form.fileIds" style="width: 50%">
      <el-table-column prop="fileName" align="center" label="文件名">
        <template slot-scope="scope">
          <span style="cursor:pointer;text-decoration:underline" @click="handleView(scope.row)">{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="small" @click="handleDownload(row)">下载</el-button>
          <el-button type="text" size="small" :disabled="formDisabled" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { uploadFile, delFile, viewFile } from '@/api/file'
export default {
  name: 'UploadFile',
  data() {
    return {
      formDisabled: false,
      form: {
        fileIds: []
      },
      base64Url: ''
    }
  },
  methods: {
    uploadFileChange(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      uploadFile(formData).then(res => {
        if (res.code === '0000' || res.code === 200) {
          this.form.fileIds.push({ fileId: res.fileId, fileName: res.fileName, mongoId: res.mongoId, fileSize: res.fileSize })
          this.$message.success('上传文件成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleView(row) {
      if (+row.fileSize === 1) {
        window.location.href = `estateApi/mongofile/downFile?mongoId=${row.mongoId}&fileName=${row.fileName}`
      } else {
        window.open(`estateView/onlinePreviewToLg?url=/mongofile/downFile?mongoId=${row.mongoId}&fileName=${row.fileName}`)
      }
    },
    handleDelete(row, index) {
      delFile({ mongoId: row.mongoId, fileId: row.fileId }).then(res => {
        if (res.code === '0000' || res.code === 200) {
          this.form.fileIds.splice(index, 1)
          this.$message.success('删除文件成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDownload(row) {
      window.location.href = `estateApi/mongofile/downFile?mongoId=${row.mongoId}&fileName=${row.fileName}`
    }
  }
}
</script>
<style scoped>
</style>
