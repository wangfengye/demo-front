<template>
    <div id="container">
        <el-form class="card-box login-form" ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules">
            <h3 class="title">APP管理系统</h3>
            <el-form-item prop="account"  >
                <el-input class="ac" name="account" placeholder="请输入账号" v-model="loginForm.account">
                    <template slot="prepend">
                        <i class="el-icon-message i-color"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" name="password" placeholder="请输入密码" autoComplete="on" v-model="loginForm.password">
                    <template slot="prepend">
                        <i class="el-icon-setting"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submitForm('loginForm')">登录</el-button>
        </el-form>
        <router-view/>
    </div>
</template>

<script>
// import {asyncRouterMap} from '../router'
import Cookies from 'js-cookie'
export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value != null && value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: { account: null, password: null },
      loginRules: {
        account: [{ required: true, message: '账号不能为空', trigger: 'blur,change' }],
        password: [{ required: true, trigger: 'blur,change', validator: validatePassword }]
      }
    }
  },
  methods: {
    submitForm (formName) {
     /*  this.$router.addRoutes(asyncRouterMap) */
     // element示例,
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkLogin () {
      if (this.loginForm != null) {
        Cookies.set('login_role', this.loginForm.account, 1)
        this.$message.success('登录成功')
        this.$router.push('/')
      } else {
        this.$message.error('登录失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
#container {
    @include relative;
    /* vh 相对高度(1vh=1% * 视口高度) */
    height: 100vh;
    width: 100%;
    background-image:url('../assets/images/home_bg.jpg');
  
}
.ac{
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
}

.i-color {
    color: $dark_gray;
}

.title {
    font-size: 24px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}

.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px, 35px, 35px, 35px;
    margin: 120px auto;
}
</style>