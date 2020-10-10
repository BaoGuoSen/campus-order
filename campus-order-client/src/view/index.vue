<template>
  <div class="wrapper">
    <div class="login_main">
      <div class="logo">theSen</div>
      <div class="login_left"></div>
      <div class="login_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style>
.wrapper {
  background-image: linear-gradient(45deg,#409EFF,#67C23A);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_main {
  width: 1200px;
  box-shadow: 0 5px 50px 0 rgba(0,0,0,.15);
  display: flex;
}
.logo {
  position: absolute;
  padding: 40px;
  z-index: 2;
}
.login_left {
  background-image:url('../image/login_bgi.jpg');
  height: 800px;
  width: 600px;
}
.login_right {
  height: 800px;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logon {
  cursor: pointer;
  text-decoration: none;
  float: right;
  margin-top: -20px;
}
</style>
