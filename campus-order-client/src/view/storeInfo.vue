<template>
  <div class="wrapper">
    <el-button type="info"  class="logout" @click="logout">退出</el-button>
    <div style="min-height:800px;">
      <div v-if="type === 'create'"><h1>检测到您尚未注册店铺，请完善以下店铺基本信息</h1></div>
      <div class="content">
        <el-form ref="store" :model="store" style="width:80%;" label-width="100px">
          <el-form-item label="店铺名：">
            <el-input v-model="store.name"  placeholder="storeName"></el-input>
          </el-form-item>
          <el-form-item label="注册人：">
            <el-input v-model="store.ownerName"  placeholder="store.owner" disabled></el-input>
          </el-form-item>
          <el-form-item label="地理信息：">
            <el-input v-model="store.location" placeholder="接入地图接口，获取位置信息，待办" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-input v-model="store.registerTime"  placeholder="store.owner" disabled>{{store.registerTime}}</el-input>
          </el-form-item>
          <el-form-item label="总收入：">
            <el-input v-model="store.income"  placeholder="store.owner" disabled>{{store.income}}</el-input>
          </el-form-item>
          <el-form-item label="上传店铺主页图片：">
            <el-image
              v-if="store.src"
              :src='store.src'
              :preview-src-list="[store.src]"
              style="width:148px;height:148px;"></el-image>
            <el-upload
              v-else
              action="api/file/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :limit="1">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="宣传语：">
            <el-input class="textarea" type="textarea" placeholder="例：欢迎光临，五折优惠等" v-model="store.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="type === 'create'" type="primary"  style="width:380px;" @click="register">注册</el-button>
            <span v-else>
              <el-button type="primary"  style="width:380px;" @click="goback">返回</el-button>
              <el-button type="primary"  style="width:380px;margin-left:0px;margin-top:20px;" @click="updateStore">修改</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
const shortid = require('shortid')
export default {
  data () {
    return {
      store: {
        id: '',
        name: '',
        src: '',
        location: '',
        ownerId: '',
        ownerName: '',
        income: '',
        registerTime: '',
        info: ''
      }
    }
  },
  computed: {
    type () {
      return this.store.id ? 'edit' : 'create'
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    logout () {
      console.log('logout')
      sessionStorage.clear()
      this.$router.push({
        path: '/'
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      console.log('preview')
    },
    handleAvatarSuccess (res, file) {
      this.store.src = res[0]
    },
    register () {
      this.store.id = shortid.generate()
      this.store.ownerId = sessionStorage.getItem('userId')
      this.store.registerTime = (new Date()).toLocaleString()
      console.log(this.store.registerTime)
      this.$axios
        .post('api/store/register', this.store)
        .then(res => {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.$router.push({
            path: 'store/ownDishs'
          })
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    updateStore () {
      console.log('111', this.store)
      this.$axios
        .post('api/store/updateStore', this.store)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push({
            path: 'store/ownDishs'
          })
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    getStore () {
      this.$axios
        .get('api/store/getStoreById', {
          params: {
            ownerId: sessionStorage.getItem('userId')
          }
        })
        .then(res => {
          if (res.data) {
            this.store = res.data
          }
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  },
  mounted () {
    this.getStore()
    this.store.ownerName = sessionStorage.getItem('userName')
  }
}
</script>
<style scoped>
.wrapper {
  background-image: linear-gradient(45deg,#409EFF,#67C23A);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  margin: 20px 0px;
}
.logout {
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>
<style>
</style>
