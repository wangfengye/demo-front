<template>
<div id="sketch">
  <p v-for ="item in text" :key="item.key">{{ item.key + ":"}} <el-tag type="success">{{ item.value }}</el-tag></p>
</div>
</template>
<script>
export default {
  data () {
    return {
      text: [{key: 'Front-end', value: 'vue'}, {key: 'Back-end', value: 'spring-boot'}, {key: 'Front-end api', value: 'axios'}, {key: 'Component', value: 'element-ui'}]
    }
  }
}
</script>

<style lang='scss' scoped>
#sketch{
  background-color: #f0f8ff;
  text-align: left;
}
h3{
  text-align: center
}
</style>