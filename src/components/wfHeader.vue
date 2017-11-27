<template>
  <div id="header">
    <div class="logo">{{title}}</div>
    <div class="user">
      <el-dropdown trigger="click" @command="handleClose">
          <img class="logo" :src="image">
          <span>{{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>   
      </el-dropdown>
    </div>
  </div>
</template>

<script>
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
    },
    out: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleClose (command) {
      if (command !== 'out') { return }
      this.out()
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