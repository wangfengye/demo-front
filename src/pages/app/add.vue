<template>
  <div id="add-container">
    <el-form style="width:50%" ref="form" :model="form" label-width="80px">
      <el-form-item label="Apk 名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="form.version"></el-input>
      </el-form-item>
      <el-form-item label="内部编号">
        <el-input type="number" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="上传应用">
        <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :on-success="uploadSuccess">
          <el-button :disabled="!canUpload" size="small" multiple="false" icon="upload" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="更新说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="更新日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.updateDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      uploadUrl: 'http://192.168.168.39:8888/file/upload',
      mainThis: '',
      canUpload: true,
      form: {
        name: '',
        version: '',
        code: '',
        apkUrl: '',
        desc: '',
        updateDate: ''
      }
    }
  },
  mounted () {
    this.mainThis = this
    this.initData()
  },
  methods: {
    initData () {
      let date = new Date()
      this.form.updateDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    onSubmit () {
      let _this = this
      console.log('form' + _this.version)
    },
    handlePreview (file) { // 可选参数, 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
      console.log(file)
    },
    handleRemove () { // 可选参数, 文件列表移除文件时的钩子
      this.canUpload = true
    },
    uploadSuccess (response) {
      if (response.code === 200) {
        this.form.apkUrl = response
        this.canUpload = false
      } else {
        this.$message.error('文件上传失败')
        this.form.apkUrl = null
        this.fileList.splice(0, this.fileList.length)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
#add-container{
  padding: 10px;
  text-align: left;
}
</style>