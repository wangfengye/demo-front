<template>
  <div id="app-main-container">
    <div class="content" v-if="!isContentHidden">
      <el-card :body-style="{ padding: '0px' }" class="card"  v-for="(o, index) in apks" :key="index">
          <div style="padding: 14px;">
                <i v-if="isAdmin()" @click="deleteById(o.id)" class="el-icon-close delete-icon"/>     
            <p class="title">{{o.name}} <span class="hint">{{o.version}}</span> </p>
            <div class="bottom clearfix">
              <el-button v-on:click="linkToHistory(o.name)" type="text">历史版本</el-button>
              <el-button v-on:click="download(o.apkUrl)" type="primary" class="right">下载</el-button>
            </div>
          
          </div>
        </el-card>
    </div>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {findAllApp, deleteById} from '@/api/app'
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
        this.initData()
      } else {
        this.isContentHidden = true
      }
    },
    isAdmin () {
      return Cookies.get('Token').indexOf('admin') >= 0
    },
    deleteById (id) {
      deleteById(id).then(res => {
        // 根据 数据的id 查数组下标
        for (let i = 0; i < this.apks.length; i++) {
          if (this.apks[i].id === id) {
            this.apks.splice(i, 1)
            return
          }
        }
      })
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.title{
  font-size: 24px;
}

.right {
    float: right;
}

.card {
  width: 360px;
  margin: 4px;
  text-align: left;
}

.hint {
  color: gray;
  font-size: 1px;
}
.delete-icon{
  float: right;
}
</style>