/**直接设置点击事件在选中项上
 */
<template>
<div>
  <el-select v-model="value5" @change="getChange" placeholder="请选择">
    <el-option @click="getChange"
      v-for="item in options"
      :key="item.value"
      v-if="!item.hide"
      :label="item.label"
      :value="item.value">
        <span @click="getChange(item.value)" style="float: left;width:100%">{{ item.value }}
        </span>
    </el-option>
  </el-select>
  <el-button @click="getChange">getValue</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options: [{
          hide: false,
          value: '选项1',
          label: '黄金糕'
        }, {
          hide: false,
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: ''
      }
    },
    methods: {
      getChange (value) {
        console.log(value)
      }
    }
  }
</script>