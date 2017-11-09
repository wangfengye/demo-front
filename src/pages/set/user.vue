<template>
<div>
  <el-table :data="users" style="width: 100%">
    <el-table-column label="编号" prop="id" width="90"></el-table-column>
    <el-table-column label="账号" prop="account" width="360"></el-table-column>
    <el-table-column label="密码" prop="password" width="360"></el-table-column>
    <el-table-column label="角色">
       <template slot-scope="scope">
        <el-tag :type="item.role ==='admin'?'danger':'success'"
          closable @close="unCorrelation(scope.row.id, item.id)" 
          class="tag" v-for="item in scope.row.roles" :key="item.id">
          {{ item.role }}
        </el-tag>
        <el-select size="mini" class="select" v-model="value[scope.row.id]" placeholder="+ role" @change="correlation(scope.row.id,value[scope.row.id])">
          <el-option v-for="item in roleOptions" 
          v-if="!checkContain(item, scope.row.roles)"
          :key="item.id" :label="item.role" :value="item.id">
          </el-option>
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
   <div slot="append"><el-button @click="dialogVisible = true" class="center" type="text">添加角色</el-button></div> 
  </el-table>
     <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="formUser.account"/>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="formUser.password"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="createUser(formUser.account, formUser.password)">确 定</el-button>
    </span>
   </el-dialog>
</div>

</template>

<script>
import {getUsers, createUser, changePassword, deleteUser, correlation, unCorrelation} from '@/api/user.js'
import {getRoles} from '@/api/role.js'
export default {
  data () {
    return {
      users: [],
      selectValue: {},
      // 可添加角色
      roleOptions: [],
      // 选项值
      value: {},
      dialogVisible: false,
      formUser: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      getUsers().then(resp => {
        _this.users = resp.data
      })
      getRoles().then(resp => {
        _this.roleOptions = resp.data
      })
    },
    createUser (account, password) {
      let _this = this
      this.dialogVisible = false
      createUser(account, password).then(resp => {
        _this.init()
      })
    },
    changePassword (userId, newPassword) {
      let _this = this
      changePassword(userId, newPassword).then(resp => {
        _this.init()
      })
    },
    correlation (userId, roleId) {
      if (!userId || !roleId) return
      let _this = this
      correlation(userId, roleId).then(resp => {
        _this.init()
        _this.value = []
      })
    },
    unCorrelation (userId, roleId) {
      let _this = this
      unCorrelation(userId, roleId).then(resp => {
        _this.init()
      })
    },
    handleDelete (userId) {
      let _this = this
      deleteUser(userId).then(resp => {
        _this.init()
      })
    },
    // 判断权限是否包含
    checkContain (target, list) {
      if (!list) return
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
.select{
  width:56px
}
</style>