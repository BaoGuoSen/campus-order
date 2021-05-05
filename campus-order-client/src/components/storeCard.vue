<template>
  <el-card shadow="hover" class="card" @click.native="toAllDishs">
    <el-image
      :src='store.src'
      :fit="fit"
      style="width:233px;height:300px;"></el-image>
    <div class="name-price">
      <span style="font-size:20px;"><strong>{{store.name}}</strong></span>
    </div>
    <div class="cardDown">
      <span>{{store.location}}</span>
    </div>
    <div class="down">
      <span class="distance">{{formDistance}}</span>
      <el-button type="text" class="operate" >进入店铺</el-button>
    </div>
  </el-card>
</template>
<script>
import {getDistance} from '../util/amap-getDistance'
export default {
  name: '',
  props: {
    store: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      distance: '',
      fit: 'cover',
      dialogVisible: false,
      order: {
        dishId: '',
        dishSrc: '',
        storeId: '',
        customerId: ''
      }
    }
  },
  computed: {
    formDistance () {
      let distance = this.distance / 1000
      return `${distance.toFixed(2)} km`
    }
  },
  mounted () {
    this.distance = getDistance(this.store.lng, this.store.lat, sessionStorage.getItem('lng'), sessionStorage.getItem('lat'))
    console.log(this.distance)
  },
  methods: {
    toAllDishs () {
      this.$router.push({
        path: '/customer/allDishs',
        query: {
          storeId: this.store.id,
          storeName: this.store.name
        }
      })
    }
  }
}
</script>
<style scoped>
.card {
  width: 270px;
  margin: 20px 32px 20px 0px;
}
.image {
  display: block;
}
.name-price {
  padding: 5px 0px;
  text-align: left;
}
.cardDown {
  padding: 5px 0px;
  text-align: left;
  color: #909399;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.down {
  overflow: hidden;
}
.distance {
  float: left;
  padding: 12px 0px 0px 0px;
}
.operate {
  float: right;
  padding: 12px 0px 0px 0px;
}
.el-button .btn {
  padding: 0px;
}
</style>
