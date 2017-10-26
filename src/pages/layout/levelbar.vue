
<template>
  <!-- 面包屑导航 -->
  
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in levelList" :key="item.name">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      levelList: null
    }
  },
  mounted () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // $route.matched 获取url的每个路径
      let matched = this.$route.matched.filter(item => { return { path: item.path, name: item.name } })
      if (!matched[0].name) {
        matched.splice(0, 1)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>