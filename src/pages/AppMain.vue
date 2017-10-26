
<template>
  <div id="main-container" :class="{hideNav: isCollapse}">
    <nav-menu class="nav" :routeData="routeDatas" :collapse="isCollapse" />
    <div class="main">
      <el-menu mode="horizontal">
        <hamburger class="hamburger" :isActive='isCollapse' :toggleClick="changeCollapse" />
        <levelbar class="levelbar" />
        <i @click="logout"  class="el-icon-upload2 logout"></i>
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
export default {
  data () {
    return {
      routeDatas: [{title: '简述', url: '/sketch'},
                   {title: 'APP管理', children: [{ url: '/app/main', title: '软件列表' }, { url: '/app/add', title: '添加应用'}]},
                   {title: '个性评论', url: '/quote'}],
      isCollapse: false
    }
  },
  components: {
    Hamburger, Levelbar, NavMenu
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      Cookies.remove('login_role')
      location.reload()// 为了重新实例化vue-router对象 避免bug
      console.log('login_role: ' + Cookies.get('login_role'))
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
    width: 200px;
    position: fixed;
  }
  .main {
    transition: width 0.28s linear;
    margin-left: 200px;
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
</style>

