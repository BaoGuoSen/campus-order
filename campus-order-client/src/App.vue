<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-submenu__title {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-menu .el-menu--inline .el-menu-item{
  text-align: center;
}
</style>
