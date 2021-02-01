<template>
  <div>
    <div v-if="userId !== null">
      <h1> status code: 403</h1>
      <h1 style="color:red;">无访问权限</h1>
    </div>
    <div v-else>
      <h1> status code: 401</h1>
      <h1 style="color:red;">登录过期，请重新登录</h1>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userId: ''
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
  }
}
</script>
