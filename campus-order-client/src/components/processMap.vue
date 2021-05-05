<template>
  <div class="container">
    <button @click="closeMap" class="close-btn">关闭</button>
    <el-amap class="amap-box"
      :amap-manager="amapManager"
      :vid="'amap-vue'"
      :zoom="zoom"
      :center="center"
      :events="events"
    >
    <el-amap-marker  v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
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
  mounted () {
  },
  methods: {
    closeMap () {
      this.$emit('closeMap')
    },
    submitAddress () {
      console.log('经纬度', this.center)
      console.log('地址', this.address)
      this.$emit('addressControl', this.address, this.lng, this.lat)
    },
    initSearch () {
      console.log('Mapinit////////////////////')
      // let map = this.amapManager.getMap()

      // 添加用户 markers
      this.markers.push([this.order.cusLng, this.order.cusLat])
      // 添加商家 markers
      this.markers.push([this.order.storeLng, this.order.storeLat])
      // 视图中心应该在两点之间
      this.center = []
      this.center.push((this.order.cusLng + this.order.storeLng) / 2, (this.order.cusLat + this.order.storeLat) / 2)
      let map = this.amapManager.getMap()
      let driving = new AMap.Driving({
        map: map
      })
      driving.search(
        new AMap.LngLat(this.order.cusLng, this.order.cusLat),
        new AMap.LngLat(this.order.storeLng, this.order.storeLat),
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
<style>
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
    margin: 10px;
    border: 1px solid #999;
    max-height: 700px;
}
</style>
