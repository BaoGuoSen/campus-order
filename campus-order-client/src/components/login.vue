<template>
  <div>
    <h1>Campus-Order</h1>
    <h2>登录</h2>
    <el-form ref="user" :model="user" style="width:300px">
      <el-form-item>
        <el-input v-model="user.userName"  placeholder="userName" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.password"  placeholder="password" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login"  style="width:300px;">登录</el-button>
      </el-form-item>
      <el-form-item>
        <a class="logon" href="/#/index/chooseUserType">立即注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        userNme: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.userName === '' || this.user.password === '') {
        this.$message.error('请输入用户名或者密码')
      } else {
        this.$axios
          .post('api/login', this.user)
          .then(res => {
            if (res.data !== '') {
              console.log('登录成功')
            } else {
              this.$message.error('用户名或密码错误，请重新输入')
            }
          })
          .catch(e => {
            this.$message.error(e.status + ' ' + e.error)
          })
      }
    }
  }
}
</script>
