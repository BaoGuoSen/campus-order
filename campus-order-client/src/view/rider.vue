<template>
  <div>
    <div class="avater">
      <el-dropdown trigger="click">
        <el-avatar  :size=35 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <i class="el-icon-location-information" style="font-size:25px" @click="mapShow = true"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="drawer = true">个人信息</el-dropdown-item>
          <!-- <el-dropdown-item @click.native="toStoreInfo">店铺信息</el-dropdown-item> -->
          <el-dropdown-item  @click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-menu
      style="background-image: linear-gradient(45deg,#409EFF,#67C23A);"
      :default-active="activeIndex2"
      :router="true"
      mode="horizontal"
      text-color="#fff"
      background-color="#67C23A"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
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
    <keep-alive>
      <mymap
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
    this.user.id = sessionStorage.getItem('userId')
    this.user.userName = sessionStorage.getItem('userName')
    this.user.type = sessionStorage.getItem('userType')
    this.user.location = sessionStorage.getItem('userLocation')
  },
  methods: {
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
.avater {
  position: absolute;
  right: 30px;
  z-index: 1;
  cursor: pointer;
  top: 20px;
}
.location-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.map {
  position: absolute;
  top: 90px;
  left: 0px;
  z-index: 100;
  width: 98%;
}
</style>
