<template>
  <div class="wrapper1">
    <div class="header" >
      <div class="title">
        <h1 style="display: inline-block">{{title}}</h1>
        <el-tooltip content="美食广场" placement="right-end" effect="light">
          <i class="el-icon-s-home" @click="toHome()"></i>
        </el-tooltip>
      </div>
      <div class="right">
        <el-dropdown trigger="click">
          <el-avatar  :size=35 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="cursor: pointer;"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="drawer = true">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="toOrder()">我的订单</el-dropdown-item>
            <el-dropdown-item @click.native="addressControl()">重新定位</el-dropdown-item>
            <el-dropdown-item  @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
      title="个人信息"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="drawerClose"
      custom-class="demo-drawer"
      ref="drawer">
      <div>
        <el-form :model="user" style="margin:25px;" label-width="100px">
          <el-form-item label="用户Id：">
            <el-input v-model="user.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="user.userName" :disabled='isEdit === false'></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-input v-model="role" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址信息：">
            <el-input v-model="user.location" :disabled='isEdit === false'></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="drawerInit">取 消</el-button>
          <el-button type="primary" v-if="!isEdit" @click="isEdit = !isEdit">修改</el-button>
          <el-button v-else type="primary" @click="updateUser">提交</el-button>
        </div>
      </div>
    </el-drawer>
    <div class="content">
      <router-view v-if="!mapShow"></router-view>
    </div>
    <keep-alive>
      <mymap
        @addressControl = "addressControl"
        class="map"
        v-if="mapShow"
        @closeMap="closeMap">
      </mymap>
    </keep-alive>
  </div>
</template>
<script>
import mymap from '../components/myMap.vue'
import {updateUser, getAllRiders, getOwnerIdByOrderId} from '../api/user'
import {getOrderById, updateOrder} from '../api/order'
import {getMinDistanceRider} from '../util/amap-getDistance'
import {getStoreByStoreId} from '../api/store'
export default {
  components: {
    mymap
  },
  data () {
    return {
      mapShow: false,
      isEdit: false,
      drawer: false,
      store: {},
      user: {
        id: '',
        userName: '',
        type: '',
        location: '',
        lng: '',
        lat: ''
      },
      wsUrl: 'ws://127.0.0.1:8080/ws/',
      usefulRiders: [],
      usefulOrder: {},
      fitRider: {}
    }
  },
  computed: {
    role () {
      if (this.user.type === '1') {
        return '商家'
      } else if (this.user.type === '2') {
        return '骑手'
      } else if (this.user.type === '3') {
        return '顾客'
      }
    },
    title () {
      if (this.mapShow) {
        return '高德地图'
      } else if (this.$route.name === 'cusOrderList') {
        return '我的订单'
      } else if (this.$route.name === 'orderInfo') {
        return '订单详情'
      } else if (this.$route.name === 'allDishs') {
        return this.$route.query.storeName
      } else {
        return '美食广场'
      }
    }
  },
  created () {
    this.userinit()
    this.wsUrl = this.wsUrl + this.user.id
    this.socket.initWebSocket(this.wsUrl)
    this.websocketSend() // 自定义接收函数初始化
  },
  mounted () {
    getStoreByStoreId(this.$route.params.storeId)
      .then(res => {
        console.log(res.data, '1')
        this.store = res.data
      })
  },
  methods: {
    closeMap () {
      this.mapShow = false
    },
    initStore () {
      getStoreByStoreId(this.$route.params.storeId)
        .then(res => {
          console.log(res.data, '1')
          this.store = res.data
        })
    },
    toHome () {
      if (this.mapShow) {
        this.mapShow = !this.mapShow
      }
      this.$router.push({
        path: '/customer/allStores',
        query: {}
      })
    },
    toOrder () {
      this.$router.push({
        path: '/customer/cusOrderList',
        query: {}
      })
    },
    addressControl (location, lng, lat) {
      this.mapShow = !this.mapShow
      if (location) {
        this.user.location = location
        this.user.lng = lng
        this.user.lat = lat
        sessionStorage.setItem('userLocation', location)
        sessionStorage.setItem('lng', lng)
        sessionStorage.setItem('lat', lat)
        this.updateUser()
      }
    },
    drawerClose () {
      this.drawer = false
      this.isEdit = false
    },
    userinit () {
      this.user.id = sessionStorage.getItem('userId')
      this.user.userName = sessionStorage.getItem('userName')
      this.user.type = sessionStorage.getItem('userType')
      this.user.location = sessionStorage.getItem('userLocation')
      this.user.lng = sessionStorage.getItem('lng')
      this.user.lat = sessionStorage.getItem('lat')
    },
    drawerInit () {
      this.drawer = false
      this.isEdit = false
    },
    toStoreInfo () {
      this.$router.push({
        path: '/storeInfo'
      })
    },
    logout () {
      console.log('logout')
      sessionStorage.clear()
      this.$router.push({
        path: '/'
      })
    },
    updateUser () {
      updateUser(this.user)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.isEdit = !this.isEdit
          this.drawer = false
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    onmessage (data) {
      if (data) {
        console.log(data, '支付成功的订单id')
        // 支付成功后，骑手配送分配策略TODO
        // 查找有效的订单，获取商家地点
        getOrderById(data)
          .then(res => {
            this.usefulOrder = res.data
            getOwnerIdByOrderId(res.data.storeId) // 根据订单的店铺id找到拥有者的id
              .then(res => {
                this.websocketSend(res.data) // 给该商家发消息
              })
          })
        // 所有有效的骑手
        getAllRiders()
          .then(res => {
            this.usefulRiders = res.data
            console.log(this.usefulRiders)
            // 获取离商家距离最近的骑手
            this.fitRider = getMinDistanceRider(this.usefulOrder, this.usefulRiders)
            // 更新订单信息,分配骑手配送
            this.deliveryRider()
          })
      }
    },
    deliveryRider () {
      this.usefulOrder.riderId = this.fitRider.id
      this.usefulOrder.riderName = this.fitRider.userName
      updateOrder(this.usefulOrder)
        .then(res => {
          this.websocketSend(this.fitRider.id) // 订单更新后，给骑手发送消息
          console.log(res, '更新后的订单')
        })
      // this.websocketSend(`配送员是 ${this.usefulOrder.riderName}`)
    },
    websocketSend (data) {
      this.socket.sendSock(data, this.onmessage)
    }
  },
  destroyed () {
    this.socket.webSocketClose()
  }
}
</script>
<style scoped>
.wrapper1 {
  height: 100%;
  min-height: 600px;
}
.header {
  z-index: 3;
  outline: 0;
  padding: 0 4%;
  box-sizing: border-box;
  box-shadow: 0 0 10px #ccc;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-image: linear-gradient(45deg,#409EFF,#67C23A);
}
.title {
  float: left;
}
.title /deep/ .el-icon-s-home {
  position: relative;
  top: -20px;
  cursor: pointer;
}
.header .right {
  float: right;
  margin: 21.44px 0;
}
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 4%;
  min-height: 600px;
}
.map {
  position: absolute;
  top: 90px;
  left: 0px;
  z-index: 100;
  width: 98%;
  height: 600px;
}
</style>
