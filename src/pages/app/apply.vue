<template>
  <el-form style="max-width:560px" ref='applyForm' :model="applyForm" :rules="applyRule" label-width="80px">
    <el-form-item label="Imei" prop="imei">
      <el-input v-model="applyForm.imei" placeholder="请输入账号(手机串号)"></el-input>
    </el-form-item>
    <el-form-item label="事由" prop='desc'>
      <el-input v-model="applyForm.desc" placeholder="例如: 申请app(WXLDB) ,申请人(***)"></el-input>
    </el-form-item>
    <el-form-item label="申请日期">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="applyForm.time"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click="onSubmit('applyForm')">生成密码</el-button>
    </el-form-item>
    <el-form-item label="密码" prop='password' >
      <el-col :span="16">
        <el-input :type="showPassword?'':'password'" v-model="applyForm.password" :disabled="true">
        </el-input>
      </el-col>
       <el-col class="line" :span="2">
         <i :class="!showPassword?'el-icon-view':'el-icon-goods'" @click="showPassword=!showPassword"  style="font-size:18px"></i>
       </el-col>
      <el-col :span="4">
        <el-button class="btn-copy" type="primary">复制</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import {getTime} from '@/util/time.js'
import {submitApply} from '@/api/appApply.js'
export default {
  data () {
    let checkIsNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('该选项不能为空'))
      } else {
        callback()
      }
    }
    return {
      showPassword: false,
      applyForm: {
        imei: '',
        desc: '',
        time: getTime(),
        password: ''
      },
      applyRule: {
        imei: [{validator: checkIsNull, trigger: 'blur'}],
        desc: [{validator: checkIsNull, trigger: 'blur'}]
      }
    }
  },
  mounted () {
    let applyForm = this.applyForm
    let clipboard = new Clipboard('.btn-copy', {
      text: function (trigger) {
        return applyForm.password
      }
    })
    clipboard.on('success', () => {
      this.$message.success('复制成功')
    })
  },
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    onSubmit (form) {
      let _this = this
      let account = this.account
      this.$refs[form].validate((valid) => {
        if (valid) {
          let applyForm = _this.applyForm
          submitApply(account, applyForm.desc, applyForm.imei, applyForm.time).then(resp => {
            this.$message.success('生成成功')
            applyForm.password = resp.data
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>