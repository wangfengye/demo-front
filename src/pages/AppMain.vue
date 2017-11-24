
<template>
  <el-container :class="{hideNav: isCollapse}">
    <el-header style="padding: 0;height:100%">
      <wf-header title="APP管理后台" :username="account" image="http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg"/>
    </el-header>
    <el-main class="main">
      <nav-menu class="nav" :class="{nav_left: isCollapse}"  :collapse="isCollapse" />
      <div class="content" :class="{content_left: isCollapse}">
        <div class="levelbar">
          <hamburger class="hamburger" :isActive='isCollapse' :toggleClick="changeCollapse" />
          <levelbar class="levelbar" />
        </div>
        <router-view/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Hamburger from '../components/hamburger'
import Levelbar from './layout/levelbar'
import NavMenu from './layout/navMenu'
import wfHeader from '@/components/wfHeader'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      dialogVisible: false
    }
  },
  components: {
    Hamburger, Levelbar, NavMenu, wfHeader
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
      console.log(this.addRouters)
    }
  }
}
</script>

<style lang='scss' scoped>
  .main{
    margin-top: 4rem;
    padding: 0;
    z-index: 999
  }
  .content{
    margin-left:260px;
  }
  .content_left{
    margin-left:85px; 
  }
  .nav{
    width: 240px;
  }
  .nav_left{
     width: 65px;
  }
  .levelbar{
    z-index: 999; 
    display: flex;
    flex-direction: row;
    line-height: 2rem;
    .hamburger{
      padding-top: .3rem;
      margin-right: 1rem;
    }
  }
</style>

