<template>
  <div>
    <div class="container">
      <button @click="confirmArrive" class="close-btn">确认送达</button>
      <el-amap
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :center="center"
        :events="events"
      >
      <el-amap-marker  v-for="(marker, index) in markers" :position="marker.position" :icon="marker.icon" :key="index"></el-amap-marker>
      </el-amap>
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import endIcon from '../image/end.png'
import storeIcon from '../image/store.png'
import riderIcon from '../image/rider.png'
let amapManager = new AMapManager()
export default {
  props: {
    order: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    let self = this
    return {
      address: null,
      searchKey: '',
      amapManager,
      markers: [],
      searchOption: {
        city: '全国',
        citylimit: true
      },
      center: [106.791971, 29.710871],
      zoom: 15,
      lng: 0,
      lat: 0,
      loaded: false,
      markerEvent: {
        click (e) {
          console.log(e)
        }
      },
      events: {
        init () {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch()
          })
        }
      }
    }
  },
  computed: {
    // isShow () {
    //   if (this.order) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    // orderId () {
    //   return this.order.id
    // }
  },
  watch: {
    // orderId (newVal, oldVal) {
    //   console.log(newVal, oldVal)
    //   if (newVal) {
    //     this.initSearch()
    //   }
    // }
  },
  mounted () {
  },
  methods: {
    closeMap () {
      this.$emit('closeMap')
    },
    confirmArrive () {
      this.$emit('confirmArrive')
    },
    submitAddress () {
      console.log('经纬度', this.center)
      console.log('地址', this.address)
      this.$emit('addressControl', this.address, this.lng, this.lat)
    },
    initSearch () {
      console.log('Mapinit////////////////////')
      console.log(this.order)
      if (!this.order.id) {
        console.log('cccc')
        return
      }
      this.markers = []
      // 添加用户 marker
      this.markers.push({
        position: [this.order.cusLng, this.order.cusLat],
        icon: endIcon // 添加 Icon 图标 URL
      })

      // 添加商家 marker
      this.markers.push({
        position: [this.order.storeLng, this.order.storeLat],
        icon: storeIcon // 添加 Icon 图标 URL
      })

      // 添加骑手 marker
      this.markers.push({
        position: [sessionStorage.getItem('lng'), sessionStorage.getItem('lat')],
        icon: riderIcon // 添加 Icon 图标 URL
      })

      // 视图中心应该在两点之间
      this.center = []
      this.center.push((this.order.cusLng + this.order.storeLng) / 2, (this.order.cusLat + this.order.storeLat) / 2)
      let map = this.amapManager.getMap()
      let driving = new AMap.Driving({
        map: map,
        panel: 'panel'
      })
      driving.search(
        new AMap.LngLat(sessionStorage.getItem('lng'), sessionStorage.getItem('lat')),
        new AMap.LngLat(this.order.cusLng, this.order.cusLat),
        {
          waypoints: [new AMap.LngLat(this.order.storeLng, this.order.storeLat)]
        },
        function (status, result) {
          if (status === 'complete') {
            console.log('绘制驾车路线完成')
            console.log(result)
          } else {
            console.log('获取驾车数据失败：' + result)
          }
        }
      )
    },
    searchByHand () {
      if (this.searchKey !== '') {
        this.poiPicker.searchByKeyword(this.searchKey)
      }
    }
  }
}
</script>
<style scoped>
.close-btn {
  position: absolute;
  z-index: 5;
  width: 70px;
  right: 30px;
  top: 10px;
  height: 25px;
}
.container {
    position: relative;
    width:100%;
    height: 700px;
    border: 1px solid #999;
    max-height: 700px;
}
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 100px;
  width: 280px;
  background: red;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.container /deep/ .amap-lib-marker-to {
    background-image:url('../image/end.png');
    cursor: pointer;
}
.container /deep/ .amap-lib-marker-from {
    background: url('../image/end.png') no-repeat;
    cursor: pointer;
}
.container /deep/ .amap-lib-marker-mid {
    background: url('../image/end.png') no-repeat;
}
.container /deep/ .amap-icon img {
  height: 35px;
  width: 35px;
}
</style>
