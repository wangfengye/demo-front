
<template>
  <div id="main-container" :class="{hideNav: isCollapse}">
    <nav-menu class="nav" :collapse="isCollapse" />
    <div class="main">
      <el-menu mode="horizontal">
        <hamburger class="hamburger" :isActive='isCollapse' :toggleClick="changeCollapse" />
        <levelbar class="levelbar" />
        <strong class="logout">{{account}}</strong>
        <i  @click="handleClose"  class="el-icon-upload2 logout"></i>
      </el-menu>
      <router-view class="container" />
    </div>
  </div>
</template>

<script>
import Hamburger from '../components/hamburger'
import Levelbar from './layout/levelbar'
import NavMenu from './layout/navMenu'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      dialogVisible: false
    }
  },
  components: {
    Hamburger, Levelbar, NavMenu
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
      console.log(this.addRouters)
    },
    logout () {
      Cookies.remove('Token')
      location.reload()// 为了重新实例化vue-router对象 避免bug
      console.log('login_role: ' + Cookies.get('Token'))
    },
    handleClose (done) {
      this.$confirm('确认退出登录？')
        .then(_ => {
          this.logout()
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='scss' scoped>
#main-container {
  position: relative;
  height: 100%;
  width: 100%;
  .nav {
    z-index: 1001;
    transition: width 0.28s linear;
    width: 201px;
    position: fixed;
  }
  .main {
    transition: width 0.28s linear;
   margin-left: 200px;
   min-height: 100%;
  }
  &.hideNav {
    .nav {
      width: 64px;
    }
    .main {
      margin-left: 64px;
    }
  }
}

.main {
  height: 58px;
  .hamburger {
    line-height: 58px;
    height: 58px;
    float: left;
    text-align: center;
    padding-left: 10px;
  }
  .levelbar {
    float: left;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
  .logout{
    float: right;
    margin-right:20px; 
    line-height: 58px;
  }
}
.container{
    padding: 16px;
}
</style>

