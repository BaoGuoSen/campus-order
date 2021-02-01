<template>
  <div>
    <div class="search">
      <el-input v-model="searchId" placeholder="按订单号查询，按下回车查询"  @keydown.enter.native="searchById" style="float:left;width:300px;"></el-input>
      <el-input v-model="searchCustomerName" placeholder="按顾客名查询，按下回车查询"  @keydown.enter.native="searchByCustomerName" style="float:left;margin-left:20px;width:300px;"></el-input>
    </div>
    <el-button class="reset" type="info" @click="reset">重置</el-button>
    <hr class="scale-half">
    <list
    :orders="orders"></list>
  </div>
</template>
<script>
import list from './list.vue'
export default {
  components: {
    list
  },
  data () {
    return {
      searchId: '',
      searchCustomerName: '',
      orders: []
    }
  },
  computed: {
  },
  mounted () {
    this.getOrderByStoreId()
  },
  methods: {
    reset () {
      this.searchId = ''
      this.searchCustomerName = ''
      this.getOrderByStoreId()
    },
    searchById () {
      console.log('searching')
      this.$axios
        .get('api/order/searchById', {
          params: {
            id: this.searchId,
            storeId: sessionStorage.getItem('storeId')
          }
        })
        .then(res => {
          this.orders = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    searchByCustomerName () {
      console.log('searching')
      this.$axios
        .get('api/order/searchByCustomerName', {
          params: {
            customerName: this.searchCustomerName,
            storeId: sessionStorage.getItem('storeId')
          }
        })
        .then(res => {
          this.orders = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    getOrderByStoreId () {
      this.$axios
        .get('api/order/getOrderByStoreId', {
          params: {
            storeId: sessionStorage.getItem('storeId')
          }
        })
        .then(res => {
          this.orders = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
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
.reset {
  float: right;
  margin-top: -60px;
}
</style>
<style>
.hr .scale-half {
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
</style>
