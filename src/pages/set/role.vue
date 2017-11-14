<template>
  <div>
     <el-table align="left" :data="roles" stripe style="width: 100%">
      <el-table-column label="编号" prop="id" width="180">
      </el-table-column>
      <el-table-column
      label="角色"
      prop="role"
      width="180">
      </el-table-column>
     <el-table-column
      label="角色名"
      width="360"
      prop="description">
      </el-table-column>
    <el-table-column label="权限">
      <template slot-scope="scope">
        <el-tag :type="item.permission ==='manage'?'danger':'success'"
          closable @close="unCorrelation(scope.row.id, item.id)" 
          class="tag" v-for="item in scope.row.permissions" :key="item.id">
          {{item.permission}}
        </el-tag>
        <el-select class="select" size="mini" v-model="value[scope.row.id]" placeholder="+ permission" @change="correlation(scope.row.id ,value[scope.row.id])">
          <el-option
            v-for="item in options"
            v-if="!checkContain(item, scope.row.permissions)"
            :key="item.id"
            :label= "item.permission"
            :value="item.id">
          </el-option>
        </el-select>
        </el-select>
      </template>
    </el-table-column>
     <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    <div slot="append"> <el-button @click="dialogVisible = true" type="text" icon="el-icon-edit">添加角色</el-button></div>
  </el-table>
  <el-dialog
  title="添加角色"
  :visible.sync="dialogVisible"
  width="30%">
<el-form label-width="80px" :model="dialogForm">
  <el-form-item label="角色符">
    <el-input v-model="dialogForm.role"></el-input>
  </el-form-item>
  <el-form-item label="角色名">
    <el-input v-model="dialogForm.description"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createRole(dialogForm.role, dialogForm.description)">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {getRoles, createRole, deleteRole, correlation, unCorrelation} from '@/api/role.js'
import {findAll} from '@/api/permission.js'
export default {
  data () {
    return {
      roles: [],
      dialogVisible: false,
      dialogForm: {},
      options: [],
      // el-select 选中的值
      value: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      getRoles().then(response => {
        _this.roles = response.data
      })
      this.findAllPermissions()
    },
    createRole (role, description) {
      this.dialogVisible = false
      let _this = this
      createRole(role, description).then(response => {
        _this.init()
      })
    },
    handleDelete (roleId) {
      let _this = this
      deleteRole(roleId).then(response => {
        _this.init()
      })
    },
    correlation (roleId, permissionId) {
      if (!permissionId) return
      let _this = this
      correlation(roleId, permissionId).then(response => {
        _this.init()
        _this.value = []
      })
    },
    unCorrelation (roleId, permissionId) {
      let _this = this
      unCorrelation(roleId, permissionId).then(response => {
        _this.init()
      })
    },
    findAllPermissions () {
      let _this = this
      findAll().then(response => {
        _this.options = response.data
      })
    },
    // 判断权限是否包含
    checkContain (target, list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.id === target.id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang='scss' scoped>
.tag{
  margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    width: 96px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .select{
    width: 80px;
  }
</style>