<template>
  <div>
    <navigation-map
      v-if="mapShow && haveData"
      :key="key"
      @confirmArrive="confirmArrive"
      class="map"
      @closeMap="closeMap"
      :order="order">
    </navigation-map>
    <div v-if="!mapShow && !haveData" class="waiting">
      订单全部配送完毕，暂未接到新订单哦。
    </div>
  </div>
</template>
<script>
import navigationMap from './navigationMap.vue'
import {getOrderByRiderId, updateOrderStatusConfirm} from '../api/order'
export default {
  components: {
    navigationMap
  },
  data () {
    return {
      mapShow: true,
      haveData: false,
      orders: [],
      key: new Date().getTime() // 不用order.id 是因为异步，初始化组件key，还未获取结果,所以默认第一个key是时间戳
    }
  },
  computed: {
    order () {
      return this.orders[this.orders.length - 1]
    }
  },
  mounted () {
    this.getOrderByRiderId()
  },
  methods: {
    closeMap () {
      this.mapShow = false
    },
    confirmArrive () {
      let tempOrder = this.orders.pop()
      if (this.orders.length === 0) {
        this.mapShow = false
        this.haveData = false
      } else {
        this.key = this.orders[this.orders.length - 1].id
      }
      updateOrderStatusConfirm(tempOrder.id) // 送达之后，修改订单状态
        .then(res => {
          // console.log(res)
        })
    },
    getOrderByRiderId () {
      getOrderByRiderId(sessionStorage.getItem('userId'))
        .then(res => {
          this.orders = res.data
          if (this.orders.length === 0) {
            this.mapShow = false
          } else {
            this.haveData = true
          }
        })
    }
  }
}
</script>
<style scoped>
.map {
  margin-top: 90px;
  height: 600px;
}
.waiting {
  margin-top: 90px;
  height: 600px;
  background:url('../image/riderWaiting.jpg') no-repeat center;
  background-size: contain;
  font-size: 34px;
}
</style>
<style>
.hr .scale-half {
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
</style>
