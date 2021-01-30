<template>
  <div>
    <div class="order">
      <p class="order-storeName">{{title}}</p>
      <div class="order-dish">
        <el-image
          style="width: 150px;height: 100px;"
          :src="order.dishSrc"
          :fit="fit"
          :preview-src-list="src"></el-image>
        <p class="order-dishName">{{order.dishName}}</p>
      </div>
      <p class="order-time">下单时间: {{time}}</p>
      <div class="order-button-list">
        <el-button type="primary" plain v-if="payButton" @click="alipay()">立即付款</el-button>
        <el-button type="primary" plain v-if="confirmButton" @click="confirm()">确认送达</el-button>
        <el-button type="primary" plain v-if="evaluationButton" @click="evaluationDialog = true">评价</el-button>
        <el-button type="primary" plain @click="toOrderInfo()">详情</el-button>
      </div>
      <div class="order-status-contain">
        <span class="order-status">{{statusLabels[order.status]}}</span>
      </div>
      <el-dialog
        title="评价"
        :visible.sync="evaluationDialog"
        :modal="false"
        width="40%">
        <span style="float: left;">评分:</span>
        <el-rate
          v-model="order.rate"
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="order.customerEvaluate">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="evaluationDialog = false">取消</el-button>
          <el-button type="primary" @click="updateOrderRate()" v-show="evaluationDialog && rateSubmit">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: '',
  data () {
    return {
      fit: 'cover',
      statusLabels: ['待付款', '未完成', '已完成'],
      evaluationDialog: false,
      rateSubmit: true // 评价提交后，不再允许重复提交
    }
  },
  computed: {
    payButton () {
      return this.order.status === 0
    },
    confirmButton () {
      return this.order.status === 1
    },
    evaluationButton () {
      return this.order.status === 2
    },
    time () {
      let date = new Date(Number(this.order.startTime))
      return date.toLocaleString()
    },
    src () {
      return [this.order.dishSrc]
    },
    title () {
      return this.order.storeName ? this.order.storeName : 'NULL'
    }
  },
  mounted () {
    if (this.order.rate) {
      this.rateSubmit = false
    }
  },
  methods: {
    updateOrderRate () {
      this.$axios
        .post('api/order/updateOrderRate', this.order)
        .then(res => {
          this.evaluationDialog = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    toOrderInfo () {
      this.$router.push({
        name: 'orderInfo',
        params: {
          id: this.order.id
        }
      })
    },
    alipay () {
      this.$axios
        .post('api/pay/confirm', this.order)
        .then(res => {
          document.body.innerHTML = res.data
          this.$nextTick(() => {
            document.forms[0].submit()
          })
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    confirm () {
      this.$axios
        .get('/api/order/updateOrderStatusConfirm', {
          params: {
            id: this.order.id,
            endTime: new Date().getTime()
          }
        })
        .then(res => {
          this.order.status = 2
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    }
  }
}
</script>
<style scoped>
.order {
  margin: 20px 0px;
  background:#F2F6FC;
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
}
.order-storeName {
  text-align: left;
  margin: 0px 0px 0px 20px;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 26px;
}
.order-dish {
  display: block;
  width: 150px;
  height: 120px;
  margin-left: 20px;
}
.order-dishName {
  margin: 0px 0px 10px 0px;
  font-size: 14px;
}
.order-time {
  color: #909399;
  font-size: 14px;
  text-align: left;
  margin: 5px 20px;
}
.order-button-list {
  float: right;
  padding-right: 10px;
}
.order-status {
  position: absolute;
  left: 10px;
  bottom: 20px;
  transform: rotate(45deg);
  color: red;
  font-size: 12px;
}
.order-status-contain {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  border: 5px solid red;
  border-radius: 50%;
}
.order /deep/ .el-rate {
  float: left;
  margin: 0px 0px 10px 5px;
}
</style>
