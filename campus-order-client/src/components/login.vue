<template>
  <div>
    <h1>Campus-Order</h1>
    <h2>登录</h2>
    <el-form ref="user" :model="user" style="width:300px">
      <el-form-item>
        <el-input v-model="user.userName"  placeholder="userName" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.password"  placeholder="password" @keydown.enter.native="login" type="password"></el-input>
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
          .post('api/user/login', this.user)
          .then(res => {
            if (res.data !== '') {
              console.log('登录成功')
              // document.cookie = 'userId = ' + res.data.id
              // document.cookie = 'userType = ' + res.data.userType
              // console.log(document.cookie)
              sessionStorage.setItem('userId', res.data.id)
              sessionStorage.setItem('userType', res.data.userType)
              sessionStorage.setItem('userName', res.data.userName)
              sessionStorage.setItem('userLocation', res.data.location)
              sessionStorage.setItem('lng', res.data.lng)
              sessionStorage.setItem('lat', res.data.lat)
              let userType = res.data.userType
              this.getStore(res.data.id, userType)
            } else {
              this.$message.error('用户名或密码错误，请重新输入')
            }
          })
          .catch(e => {
            this.$message.error(e.status + ' ' + e.error)
          })
      }
    },
    getStore (ownerId, userType) {
      this.$axios
        .get('api/store/getStoreByOwnerId', {
          params: {
            ownerId: ownerId
          }
        })
        .then(res => {
          if (userType === 1 && !res.data) {
            this.$router.push({
              name: 'storeInfo',
              params: {
                type: 'create'
              }
            })
          }
          this.store = res.data
          sessionStorage.setItem('storeId', res.data.id)
          if (userType === 1) {
            this.$router.push({
              path: '/store/ownDishs',
              query: {}
            })
          } else if (userType === 2) {
            this.$router.push({
              path: '/rider',
              query: {}
            })
          } else {
            this.$router.push({
              path: '/customer/allStores',
              query: {}
            })
          }
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  },
  mounted () {
    // if (sessionStorage.getItem('userId')) {
    //   let userType = sessionStorage.getItem('userType')
    //   console.log(typeof userType)
    //   if (userType === '1') {
    //     this.$router.push({
    //       path: '/store/ownDishs',
    //       query: {}
    //     })
    //   } else if (userType === '2') {

    //   } else {
    //     this.$router.push({
    //       path: '/customer/allDishs',
    //       query: {}
    //     })
    //   }
    // }
  }
}
</script>
