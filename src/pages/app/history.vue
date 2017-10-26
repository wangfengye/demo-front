<template>
  <div id="content">
    <el-table :data="apkVersions" style="width:100%" v-on:expand="expand">
      <el-table-column label="详情" type="expand">
        <template scope="scope">
          <div class="markdown" v-html="scope.row.desc"></div>
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="version">
      </el-table-column>
      <el-table-column label="内部编号" prop="code">
      </el-table-column>
      <el-table-column label="发布时间" prop="updateDate">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.updateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope" >
          <el-button class="btn_download" v-on:click="download(scope.row.apkUrl)" type="primary" size="mini">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      apkVersions: [],
      name: ''
    }
  },
  mounted () {
    this.name = this.$route.query.name
    this.initData()
  },
  methods: {
    initData () {
      let _this = this
      axios.get('http://192.168.168.39:8888/api/appVersion/' + this.name)
      .then(function (response) {
        _this.apkVersions = response.data
        console.log(_this.apkVersions)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    download (url) {
      window.location.href = url
      console.log(url)
    },
    expand (row, expanded) {
      let text = row.desc
      if (text != null) {
        import('showdown').then(showdown => {
          const converter = new showdown.Converter()
          // element ui使用了内部样式,这里使用内部样式最高级覆盖
          row.desc = '<style>body li{list-style-type: disc!important;}</style>' + converter.makeHtml(text)
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.markdown{
  float: left;
  text-align: left;
}
.btn_download{
float: left;
}
</style>