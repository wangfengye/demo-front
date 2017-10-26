/**
 *  侧边栏
 * routeData :[ [{ url: '/perssion', title: '简述' },
 *    { title: 'APP管理', children: [{ url: '/', title: '软件列表' }] }]]
 */
<template>
  <div id="container">
    <el-menu theme="dark" class="el-menu-vertical-demo" :router="nav" mode="vertical" :default-active="$route.path" :collapse="collapse">
      <template v-for="item in routeData">
        <el-menu-item class="item" :key="item.title" v-if="item.url" :index="item.url">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <!-- 二级列表 -->
        <el-submenu :key="item.title" v-if="!item.url" index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
             <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="item in item.children" :key="item.url" :index="item.url">
              {{item.title}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nav: true
    }
  },
  props: {
    routeData: {
      default: []
    },
    collapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
#container {
  height: 100vh;
}
.el-menu-vertical-demo{
  height: 100vh;
  text-align:left;
}
</style>