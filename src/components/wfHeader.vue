<template>
  <div id="header">
    <div class="logo">{{title}}</div>
    <div class="user">
      <el-dropdown trigger="click" @command="handleClose">
          <img class="logo" :src="image">
          <span>{{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>   
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    username: {
      type: String,
      default: '无名'
    },
    image: {
      type: String,
      default: '../assets/images/home_bg.jpg'
    }
  },
  methods: {
    logout () {
      Cookies.remove('Token')
      location.reload()// 为了重新实例化vue-router对象 避免bug
      console.log('login_role: ' + Cookies.get('Token'))
    },
    handleClose (command) {
      if (command !== 'loginout') { return }
      this.$confirm('确认退出登录？')
        .then(_ => {
          this.logout()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='scss' scoped>
#header{
  z-index: 1000;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  background-color: #242f42;;
  color: #fff;
  line-height: 4rem;
  float: left;
}
.logo{
  float: left;
  padding-left:2rem; 
  font-size: 20px;
  text-align: center
}
.user{
  float: right;
  padding-right: 2rem; 
  span{
    color: white;
  }
  .logo{
    margin: .5rem;
    padding: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
  }
}
</style>