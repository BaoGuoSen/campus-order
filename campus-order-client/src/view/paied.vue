<template>
  <div>
    <div class="paied">
      <span>该页面已过期，请自行关闭。</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.paied {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
  background:url('../image/paied.jpg') no-repeat center;
  background-size: cover;
  color: red;
  font-size: 34px;
}
</style>
