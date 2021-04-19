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
      <span>已售:55</span>
      <el-button type="text" class="operate" >进入店铺</el-button>
    </div>
  </el-card>
</template>
<script>
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
  methods: {
    toAllDishs () {
      this.$router.push({
        name: 'allDishs',
        params: {
          storeId: this.store.id
        }
      })
    }
  //   deleteDish () {
  //     console.log('delete')
  //     this.$emit('deleteDish', this.dish)
  //   },
  //   updateDish () {
  //     this.$emit('updateDish', this.dish)
  //     this.dialogVisible = false
  //   },
  //   handleAvatarSuccess (res, file) {
  //     console.log(res[0], 'res')
  //     console.log(file, 'file')
  //     this.dish.src = res[0]
  //   },
  //   handleExceed (files, fileList) {
  //     this.$message.warning(`当前限制选择 1 个文件，请将当前文件删除后在执行上传操作`)
  //   },
  //   apply () {
  //     this.$prompt('您将支付' + this.dish.price + '元，是否支付?', '提示', {
  //       confirmButtonText: '支付',
  //       cancelButtonText: '取消',
  //       type: 'warning',
  //       inputPlaceholder: '备注信息'
  //     }).then(({ value }) => {
  //       this.order.note = value
  //       this.addOrder()
  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消支付'
  //       })
  //     })
  //   },
  //   addOrder () {
  //     this.orderInit()
  //     this.$axios
  //       .post('api/order/addOrder', this.order)
  //       .then(res => {
  //         this.$message({
  //           message: '下单成功',
  //           type: 'success'
  //         })
  //         if (res.status === 200) {
  //           let routerData = this.$router.resolve({
  //             path: '/apply',
  //             query: {
  //               html: res.data
  //             }
  //           })
  //           window.open(routerData.href, '_blank')
  //         }
  //         this.dish.sellCount = this.dish.sellCount + 1
  //         this.update()
  //       })
  //       .catch(e => {
  //         this.$message.error(e.status + ' ' + e.error)
  //       })
  //   },
  //   // 由后端在addorder后直接调用
  //   // alipay () {
  //   //   this.$axios
  //   //     .post('api/pay/confirm', this.dish)
  //   //     .then(res => {
  //   //       document.body.innerHTML = res.data
  //   //       this.$nextTick(() => {
  //   //         document.forms[0].submit()
  //   //       })
  //   //     })
  //   //     .catch(e => {
  //   //       this.$message.error(e.status + ' ' + e.error)
  //   //     })
  //   // },
  //   update (dish) {
  //     this.$axios
  //       .post('api/store/updateDish', this.dish)
  //       .then(res => {
  //       })
  //       .catch(e => {
  //         this.$message.error(e.status + ' ' + e.error)
  //       })
  //   },
  //   orderInit () {
  //     this.order.dishId = this.dish.id
  //     this.order.dishSrc = this.dish.src
  //     this.order.storeId = this.dish.storeId
  //     this.order.customerId = sessionStorage.getItem('userId')
  //     this.order.startTime = new Date().getTime()
  //     this.order.dishName = this.dish.name
  //     this.order.customerName = sessionStorage.getItem('userName')
  //     this.order.amount = this.dish.price
  //   }
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
}
.operate {
  float: right;
  margin-top: -10px;
}
.el-button .btn {
  padding: 0px;
}
</style>
