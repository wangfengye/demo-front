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
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {findAll, deleteById} from '@/api/appApply.js'
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
  },
  methods: {
    handleDelete (id) {
      deleteById(id).then(res => {
        this.$message.success('删除成功')
        // 根据 数据的id 查数组下标
        for (let i = 0; i < this.applys.length; i++) {
          if (this.applys[i].id === id) {
            this.applys.splice(i, 1)
            return
          }
        }
      })
    }
  }

}
</script>

<style lang='scss' scoped>
</style>