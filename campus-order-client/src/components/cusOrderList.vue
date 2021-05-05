<template>
  <div>
    <processmap
      :order="order"
      @closeMap="closeMap"
      class="map"
      v-if="isMapShow">
    </processmap>
    <el-tabs v-if="!isMapShow" v-model="activeName" @tab-click="handleClick" class="cus-taps">
      <el-tab-pane label="待付款" name="noPay"></el-tab-pane>
      <el-tab-pane label="未完成" name="noDone"></el-tab-pane>
      <el-tab-pane label="已完成" name="Done"></el-tab-pane>
      <el-tab-pane label="全部订单" name="All"></el-tab-pane>
    </el-tabs>
    <div ref="list" class="orderList-contain" @scroll="scrollDebounce()" v-if="!isMapShow">
      <div class="infinite-list-phantom" :style="{ height: orderListHeight + 'px' }"></div>
      <div class="infinite-list" :style="{ transform: getTransform }">
        <cus-order
          @mapControl="mapControl"
          class="orderList"
          v-for="order in visibleData"
          :key="order.id"
          :order="order"></cus-order>
      </div>
    </div>
  </div>
</template>
<script>
import cusOrder from './cusOrder'
import processmap from '../components/processMap.vue'
export default {
  components: {
    cusOrder,
    processmap
  },
  data () {
    return {
      order: '',
      isMapShow: false,
      activeName: 'All',
      orders: [],
      curOrders: [],
      itemHeight: 140,
      screenHeight: 0,
      startOffset: 0,
      start: 0,
      end: null,
      scrollDebounce: () => {}
    }
  },
  created () {
    this.scrollDebounce = this.debounce(this.scrollEvent, 100)
  },
  computed: {
    orderListHeight () {
      return this.curOrders.length * this.itemHeight
    },
    visibleCount () {
      return Math.ceil(this.screenHeight / this.itemHeight)
    },
    visibleData () {
      return this.curOrders.slice(this.start, Math.min(this.end, this.curOrders.length))
    },
    getTransform () {
      return `translate3d(0, ${this.startOffset}px,0)`
    }
  },
  mounted () {
    this.getOrdersByCusId()
    this.screenHeight = 550
    console.log(this.screenHeight, document.body.clientHeight)
    this.end = this.start + this.visibleCount
  },
  methods: {
    closeMap () {
      this.isMapShow = false
    },
    mapControl (order) {
      this.isMapShow = !this.isMapShow
      this.order = order
      console.log(order, 'map')
    },
    debounce (fn, wait) {
      let timeout = null
      return function () {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn.apply(this, arguments)
        }, wait)
      }
    },
    scrollEvent (e) {
      let scrollTop = this.$refs.list.scrollTop
      console.log(scrollTop)
      this.start = Math.floor(scrollTop / this.itemHeight)
      this.end = this.start + this.visibleCount
      this.startOffset = scrollTop - (scrollTop % this.itemHeight)
    },
    handleClick () {
      if (this.activeName === 'noPay') {
        this.curOrders = this.orders.filter(item => item.status === 0)
      } else if (this.activeName === 'noDone') {
        this.curOrders = this.orders.filter(item => item.status === 1)
      } else if (this.activeName === 'Done') {
        this.curOrders = this.orders.filter(item => item.status === 2)
      } else {
        this.curOrders = this.orders.filter(item => item.status >= 0)
      }
    },
    getOrdersByCusId () {
      this.$axios
        .get('api/order/getOrderByCustomerId', {
          params: {
            customerId: sessionStorage.getItem('userId')
          }
        })
        .then(res => {
          this.orders = res.data
          this.curOrders = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  }
}
</script>
<style scoped>
.map {
  position: absolute;
  top: 90px;
  left: 0px;
  z-index: 100;
  width: 98%;
  height: 80%;
}
.cus-taps {
  margin-top: 100px;
}
.orderList {
  width: 47%;
}
.orderList-contain {
  height: 550px;
  overflow: auto;
  position: relative;
}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.infinite-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  width: 100%;
}

</style>
