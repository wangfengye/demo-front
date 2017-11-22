<template>
<div>
  <el-table align="left" :data="permissions" stripe style="width: 100%">
      <el-table-column label="编号" prop="id">
      </el-table-column>
      <el-table-column
      label="权限符"
      prop="permission">
      </el-table-column>
     <el-table-column
      label="详情"
      prop="description">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <div slot="append">
      <el-button @click="handleAdd" type="text" icon="el-icon-edit">添加权限</el-button>
    </div>
  </el-table>
  <el-dialog
  title="添加权限"
  :visible.sync="dialogVisible"
  width="20rem">
<el-form label-width="5rem" :model="dialogForm">
  <el-form-item label="权限符">
    <el-input v-model="dialogForm.permission"></el-input>
  </el-form-item>
  <el-form-item label="详情">
    <el-input v-model="dialogForm.description"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPermission">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import {
  findAll,
  createPermission,
  deletePermission
} from '@/api/permission.js'
export default {
  data () {
    return {
      permissions: [],
      dialogVisible: false,
      dialogForm: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _this = this
      findAll().then(function (response) {
        _this.permissions = response.data
      })
    },
    handleDelete (index, data) {
      deletePermission(data.id).then(response => {
        this.initData()
      })
    },
    handleAdd () {
      this.dialogVisible = true
    },
    addPermission () {
      this.dialogVisible = false
      let _this = this
      createPermission(this.dialogForm.permission, this.dialogForm.description).then(response => {
        _this.permissions.push(response.data)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>