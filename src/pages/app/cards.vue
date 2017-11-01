<template>
  <div id="app-main-container">
    <el-row class="content" :hidden="isContentHidden">
      <el-col :span="6" v-for="(o, index) in apks" :key="index">
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div style="padding: 14px;">
            <p class="title">{{o.name}} <span class="hint">{{o.version}}</span></p>
            <div class="bottom clearfix">
              <el-button v-on:click="linkToHistory(o.name)" type="text">历史版本</el-button>
              <el-button v-on:click="download(o.apkUrl)" type="primary" class="right">下载</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {findAllApp} from '@/api/app'
export default {
  data () {
    return {
      apks: [],
      isContentHidden: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.containerShow()
      let _this = this
      findAllApp().then(function (response) {
        _this.apks = response.data
      })
        .catch(function (err) {
          console.log(err)
        })
    },
    download (url) {
      window.location.href = process.env.BASE_API + '/' + url
    },
    linkToHistory (name) {
      this.$router.push({path: './main/history', query: { name: name }})
    },
    containerShow () {
      // 根据路由名判断是否显示列表
      let name = this.$route.name
      if (name === '软件列表') {
        this.isContentHidden = false
      } else {
        this.isContentHidden = true
      }
    }
  },
  watch: {
    $route () {
      this.containerShow()
    }
  }
}
</script>

<style lang='scss' scoped>
#app-main-container {
  position: relative;
}

.content {
  position: absolute;
  width: 100%;
}
.title{
  font-size: 24px;
}

.right {
    float: right;
}

.card {
  margin: 4px;
  text-align: left;
}

.hint {
  color: gray;
  font-size: 1px;
}
</style>