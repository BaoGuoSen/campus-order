<template>
  <div>
    <h1>Campus-Order</h1>
    <h2>注册</h2>
    <el-form ref="user" :model="user" style="width:300px" :rules="rules" status-icon>
      <el-form-item prop="userName">
        <el-input v-model="user.userName"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password"  placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkpassword">
        <el-input v-model="user.checkpassword"  placeholder="请确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:300px;" @click="register('user')">注册</el-button>
      </el-form-item>
      <el-form-item>
        <a class="logon" href="/#/index/login">立即登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const shortid = require('shortid')
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user: {
        password: '',
        checkpassword: '',
        userName: '',
        id: ''
      },
      rules: {
        userName: [
          {validator: checkName, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkpassword: [
          {validator: validateCheckPass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register (user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.user.id = shortid.generate()
          this.user.userType = this.$route.query.userType
          this.$axios
            .post('api/register', this.user)
            .then(res => {
              if (res.data === true) {
                this.$message({
                  message: '注册成功，请点击右下角登录按钮进行登录',
                  type: 'success'
                })
              } else {
                this.$message.error('该用户名已被注册，请更改您的用户名')
              }
            })
            .catch(e => {
              this.$message.error(e.status + ' ' + e.error)
            })
        } else {
          this.$message.error('请将表单填写完整或者两次密码不一致')
        }
      })
    }
  }
}
</script>
