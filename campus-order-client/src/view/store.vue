<template>
  <div class="wrapper1">
    <div class="header" >
      <!-- :style="{backgroundImage: 'url(' + store.src + ')', backgroundSize:'contain', }" -->
      <!-- <div style="float:left;">
        <h1 style="cursor: pointer;" @click="toStoreInfo">{{store.name}}</h1>
      </div> -->
      <div class="avater">
        <el-dropdown trigger="click">
          <el-avatar  :size=35 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="drawer = true">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="toStoreInfo">店铺信息</el-dropdown-item>
            <el-dropdown-item  @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div >
      <el-menu
        :router="true"
        default-active="ownDishs"
        class="navigation"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="ownDishs">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{store.name}}</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="orderList">所有订单</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isEdit: false,
      drawer: false,
      store: '',
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
    this.getStore()
  },
  methods: {
    drawerClose () {
      this.drawer = false
      this.isEdit = false
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
      this.$axios
        .post('api/user/update', this.user)
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
    getStore () {
      this.$axios
        .get('api/store/getStoreByOwnerId', {
          params: {
            ownerId: sessionStorage.getItem('userId')
          }
        })
        .then(res => {
          if (!res.data) {
            this.$router.push({
              name: 'storeInfo',
              params: {
                type: 'create'
              }
            })
          }
          this.store = res.data
          if (!sessionStorage.getItem('storeId')) {
            sessionStorage.setItem('storeId', res.data.id)
          }
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
  margin-left: 15%;
  z-index: 100;
  outline: 0;
  box-sizing: border-box;
  box-shadow: 0 0 10px #ccc;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 85%;
  background-image: linear-gradient(45deg,#409EFF,#67C23A);
}
.header .avater {
  float: right;
  margin: 21.44px 20px;
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
</style>
