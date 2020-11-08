<template>
  <div class="search">
    <el-input v-model="searchValue" placeholder="请输入关键字，按回车键搜索"  @keydown.enter.native="search" class="input"></el-input>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    search () {
      console.log(this.searchValue)
      this.$emit('searchByValue', this.searchValue)
    }
  }
}
</script>
<style scoped>
.search {
  height: 40px;
  padding: 2% 0;
  margin-top: 90px;
}
.input {
  width: 300px;
  float: left;
}
</style>
