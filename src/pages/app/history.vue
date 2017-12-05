<template>
  <div id="content">
    <el-table align="left" :data="apkVersions" style="width:100%" v-on:expand-change="expand">
      <el-table-column label="详情" type="expand">
        <template slot-scope="props">
          <div class="markdown" v-html="props.row.desc"></div>
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="version">
      </el-table-column>
      <el-table-column label="内部编号" prop="code">
      </el-table-column>
      <el-table-column label="发布时间" prop="updateDate">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.updateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-on:click="download(scope.row.apkUrl)" type="primary" size="mini">下载</el-button>
          <el-button v-if="hasPermission()" v-on:click="deleteById(scope.row.id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
       <div slot="append"> <el-button @click="toAdd" type="text" icon="el-icon-edit">新增版本</el-button></div>
    </el-table>
  </div>
  
</template>

<script>
import Cookies from 'js-cookie'
import {findByName, deleteById} from '@/api/appVersion'
export default {
  data () {
    return {
      apkVersions: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _this = this
      let appName = this.$route.query.name
      if (!appName) {
        this.$router.push('/apk/main')
      } else {
        findByName(appName).then(function (response) {
          _this.apkVersions = response.data
        })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    download (url) {
      window.location.href = process.env.BASE_API + '/' + url
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
    },
    hasPermission () {
      return Cookies.get('Token').indexOf('admin') >= 0
    },
    deleteById (id) {
      deleteById(id).then(res => {
        // 根据 数据的id 查数组下标
        for (let i = 0; i < this.apkVersions.length; i++) {
          if (this.apkVersions[i].id === id) {
            this.apkVersions.splice(i, 1)
            return
          }
        }
      })
    },
    toAdd () {
      let appName = this.$route.query.name
      this.$router.push({path: '../add', query: { name: appName }})
    }
  }
}
</script>

<style lang='scss' scoped>
.markdown{
  float: left;
  text-align: left;
}

</style>