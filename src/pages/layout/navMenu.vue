/**
 *  侧边栏
 * 
 */
<template>
  <div id="container" >
    <el-menu unique-opened background-color="#545c64" 
      text-color="#fff" class="el-menu-vertical-demo" :router="nav" mode="vertical" :default-active="$route.path" :collapse="collapse">
      <template v-for="item in addRouters">
        <template v-for="item in item.children">
        <el-menu-item class="item" :key="item.path" v-if="!item.menu" :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <!-- 二级列表 -->
        <el-submenu :key="item.path" v-if="item.menu" :index="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
             <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="item.path +'/' + child.path">
              {{child.name}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nav: true
    }
  },
  computed: {
    ...mapGetters(['addRouters'])
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
 #container{
  position: fixed;
  top: 4rem;
  bottom: 0;
  z-index: 1000;
}
#container > ul{
    height: 100%;
  }
.el-menu-vertical-demo{
  text-align:left;
}
</style>