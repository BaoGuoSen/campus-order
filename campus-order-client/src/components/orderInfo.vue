<template>
  <div class="order-info">
    <el-form :label-position="labelPosition" label-width="100px" :model="order">
      <el-form-item label="订单号:">
        <el-input v-model="order.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="店铺名:">
        <el-input v-model="order.storeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="店铺地址:">
        <el-input v-model="order.storeLocation" disabled></el-input>
      </el-form-item>
      <el-form-item label="美食:">
        <el-image
          style="width: 300px;height: 150px;"
          :src="order.dishSrc"
          :fit="fit"
          :preview-src-list="src"></el-image>
        <p class="dish-name">{{order.dishName}}</p>
      </el-form-item>
      <el-form-item label="下单时间:">
        <el-input v-model="startTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="送达时间:">
        <el-input v-model="endTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="配送员姓名:">
        <el-input v-model="order.riderName" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注信息:">
        <el-input v-model="order.note" disabled></el-input>
      </el-form-item>
      <el-form-item label="交易金额:">
        <el-input v-model="order.amount" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户评价:">
        <el-input v-model="order.customerEvaluate" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户评分:">
        <el-rate
          disabled
          v-model="order.rate"
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      order: {},
      labelPosition: 'right',
      fit: 'cover'
    }
  },
  computed: {
    src () {
      return [this.order.dishSrc]
    },
    startTime () {
      let date = new Date(Number(this.order.startTime))
      return date.toLocaleString()
    },
    endTime () {
      if (this.order.endTime) {
        let date = new Date(Number(this.order.endTime))
        return date.toLocaleString()
      } else {
        return '尚未送达'
      }
    }
  },
  mounted () {
    this.getOrderById()
  },
  methods: {
    getOrderById () {
      this.$axios
        .get('api/order/getOrderById', {
          params: {
            id: this.$route.params.id
          }
        })
        .then(res => {
          this.order = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  }
}
</script>
<style scoped>
.order-info {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dish-name {
  margin-top: -20px;
}
.order-info /deep/ .el-rate {
  line-height: 2.5;
  float: left;
}
</style>
