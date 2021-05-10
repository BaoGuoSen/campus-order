<template>
  <div class="wrapper1">
    <div class="header">
      <div class="right">
        <el-dropdown trigger="click">
          <!-- <el-switch
            v-model="user.turn"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch> -->
          <el-badge :value="0" class="item">
            <el-avatar  :size=35 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="cursor: pointer;"></el-avatar>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="drawer = true">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="mapShow = true">重新定位</el-dropdown-item>
            <el-dropdown-item  @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-menu
        :router="true"
        default-active="riderNavigation"
        class="navigation"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="riderNavigation">配送导航</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
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
      <router-view
        :key="key"></router-view>
    </div>
    <keep-alive>
      <mymap
        @closeMap="closeMap"
        @addressControl = "addressControl"
        class="map"
        v-if="mapShow">
      </mymap>
    </keep-alive>
  </div>
</template>
<script>
import mymap from '../components/myMap.vue'
import {updateUser} from '../api/user'
export default {
  name: '',
  components: {
    mymap
  },
  data () {
    return {
      key: new Date().getTime(),
      wsUrl: 'ws://127.0.0.1:8080/ws/',
      mapShow: false,
      activeIndex2: '1',
      isEdit: false,
      drawer: false,
      user: {
        id: '',
        userName: '',
        type: '',
        location: ''
      }
    }
  },
  created () {
    this.userinit()
    this.wsUrl = this.wsUrl + this.user.id
    this.socket.initWebSocket(this.wsUrl)
    this.websocketSend() // 自定义接收函数初始化
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
    }
  },
  mounted () {
  },
  methods: {
    closeMap () {
      this.mapShow = false
    },
    websocketSend (data) {
      this.socket.sendSock(data, this.onmessage)
    },
    onmessage (data) {
      this.$message('收到新订单了')
      console.log(data, 'rider onmessage')
      this.key = new Date().getTime()
    },
    userinit () {
      this.user.id = sessionStorage.getItem('userId')
      this.user.userName = sessionStorage.getItem('userName')
      this.user.type = sessionStorage.getItem('userType')
      this.user.location = sessionStorage.getItem('userLocation')
      this.user.lng = sessionStorage.getItem('lng')
      this.user.lat = sessionStorage.getItem('lat')
    },
    logout () {
      console.log('logout')
      sessionStorage.clear()
      this.$router.push({
        path: '/'
      })
    },
    drawerClose () {
      this.drawer = false
      this.isEdit = false
    },
    drawerInit () {
      this.drawer = false
      this.isEdit = false
    },
    addressControl (location, lng, lat) {
      this.mapShow = !this.mapShow
      if (location) {
        this.user.location = location
        this.user.lng = lng
        this.user.lat = lat
        sessionStorage.setItem('userLocation', location)
        this.updateUser()
      }
    },
    updateUser () {
      updateUser(this.user)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          if (this.isEdit) this.isEdit = !this.isEdit
          this.drawer = false
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  }
}
</script>
<style scoped>
.wrapper1 {
  height: 100%;
  min-height: 600px;
}
.navigation {
  position: fixed;
  width: 15%;
  height: 100%;
  z-index: 100;
  top: 0px;
  left: 0px;
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
.header .right {
  float: right;
  margin: 21.44px 0;
}
.content {
  box-sizing: border-box;
  width: 85%;
  height: 100%;
  overflow: hidden;
  padding: 0 2%;
  min-height: 600px;
  margin-left: 15%;
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
