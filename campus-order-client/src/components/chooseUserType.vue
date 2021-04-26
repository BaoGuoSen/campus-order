<template>
  <div>
    <h1>Campus-Order</h1>
    <h2>选择身份</h2>
    <el-form style="width:300px">
      <el-form-item>
        <el-button type="danger" @click="jumpToRegister(1)"  style="width:300px;height:50px;">我是商家</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="jumpToRegister(3)"  style="width:300px;height:50px;">我是用户</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="jumpToRegister(2)"  style="width:300px;height:50px;">我是骑手</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    jumpToRegister (userType) {
      // 1 商家
      // 2 骑手
      // 3 用户
      this.$router.push({
        path: 'register',
        query: {userType: userType}
      })
    }
  }
}
</script>
