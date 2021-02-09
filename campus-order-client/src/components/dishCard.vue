<template>
  <el-card shadow="hover" class="card">
    <el-image
      :src='dish.src'
      :fit="fit"
      :preview-src-list="imageList"
      style="width:233px;height:300px;"></el-image>
    <div class="name-price">
      <span style="font-size:20px;"><strong>{{dish.name}}</strong></span>
      <span style="float:right;color:red;">RMB {{dish.price}}</span>
    </div>
    <div class="cardDown">
      <span>已售:{{dish.sellCount}}</span>
      <el-button type="text" class="operate" v-if="!isEdit" @click="apply">立即下单</el-button>
      <el-dropdown trigger="click" class="operate" v-if="isEdit">
        <el-button type="text" class="btn" >操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogVisible = true">编辑</el-dropdown-item>
          <el-dropdown-item @click.native="deleteDish">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改菜品"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="dish" style="width:80%;">
        <el-form-item label="菜名:" label-width="140px">
          <el-input v-model="dish.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:" label-width="140px">
          <el-input v-model="dish.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片:" label-width="140px">
          <el-image
              v-if="dish.src"
              :src='dish.src'
              :preview-src-list="[dish.src]"
              style="width:148px;height:148px;"></el-image>
          <el-upload
            v-else
            action="api/file/upload"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-exceed="handleExceed"
            :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateDish">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>
<script>
export default {
  name: '',
  props: {
    isEdit: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    dish: {
      type: Object,
      default: () => {
        return {}
      }
    },
    imageList: {
      type: Array,
      default: () => {
        return []
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
    deleteDish () {
      console.log('delete')
      this.$emit('deleteDish', this.dish)
    },
    updateDish () {
      this.$emit('updateDish', this.dish)
      this.dialogVisible = false
    },
    handleAvatarSuccess (res, file) {
      console.log(res[0], 'res')
      console.log(file, 'file')
      this.dish.src = res[0]
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请将当前文件删除后在执行上传操作`)
    },
    apply () {
      this.$prompt('您将支付' + this.dish.price + '元，是否支付?', '提示', {
        confirmButtonText: '支付',
        cancelButtonText: '取消',
        type: 'warning',
        inputPlaceholder: '备注信息'
      }).then(({ value }) => {
        this.order.note = value
        this.addOrder()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消支付'
        })
      })
    },
    addOrder () {
      this.orderInit()
      this.$axios
        .post('api/order/addOrder', this.order)
        .then(res => {
          this.$message({
            message: '下单成功',
            type: 'success'
          })
          if (res.status === 200) {
            let routerData = this.$router.resolve({
              path: '/apply',
              query: {
                html: res.data
              }
            })
            window.open(routerData.href, '_blank')
          }
          this.dish.sellCount = this.dish.sellCount + 1
          this.update()
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    // 由后端在addorder后直接调用
    // alipay () {
    //   this.$axios
    //     .post('api/pay/confirm', this.dish)
    //     .then(res => {
    //       document.body.innerHTML = res.data
    //       this.$nextTick(() => {
    //         document.forms[0].submit()
    //       })
    //     })
    //     .catch(e => {
    //       this.$message.error(e.status + ' ' + e.error)
    //     })
    // },
    update (dish) {
      this.$axios
        .post('api/store/updateDish', this.dish)
        .then(res => {
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    orderInit () {
      this.order.dishId = this.dish.id
      this.order.dishSrc = this.dish.src
      this.order.storeId = this.dish.storeId
      this.order.customerId = sessionStorage.getItem('userId')
      this.order.startTime = new Date().getTime()
      this.order.dishName = this.dish.name
      this.order.customerName = sessionStorage.getItem('userName')
      this.order.amount = this.dish.price
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
}
.operate {
  float: right;
  margin-top: -10px;
}
.el-button .btn {
  padding: 0px;
}
</style>
