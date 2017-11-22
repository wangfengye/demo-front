<template>
<div>
  <el-table align="left" :data="applys" stripe style="width: 100%">
      <el-table-column label="编号" prop="id">
      </el-table-column>
       <el-table-column label="Imei" prop="imei">
      </el-table-column>
      <el-table-column label="申请人" prop="user">
      </el-table-column>
      <el-table-column label="申请时间" prop="applyDate">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.applyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请详情" prop="desc">
      </el-table-column>
  </el-table>
</div>
</template>

<script>
import {findAll} from '@/api/appApply.js'
export default {
  data () {
    return {
      applys: []
    }
  },
  mounted () {
    findAll().then(resp => {
      this.applys = resp.data
    })
  }

}
</script>

<style lang='scss' scoped>
</style>