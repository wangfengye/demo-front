/**直接设置点击事件在选中项上
 */
<template>
  <div id="app">
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog title="提示" :visible.sync="dialogVisible" width="20rem" >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import wfHeader from '@/components/wfHeader'
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  components: {
    wfHeader
  },
  methods: {
  }
}
</script>
<style>
.right{
  margin-right: 200px; 
}
</style>
