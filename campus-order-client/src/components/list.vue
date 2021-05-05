<template>
  <div>
    <el-table
    :data="curOrders"
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="订单号"
      width="160">
    </el-table-column>
    <el-table-column
      prop="dishName"
      label="美食名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="交易金额"
      width="100">
    </el-table-column>
    <el-table-column
      prop="customerName"
      label="顾客姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="下单时间"
      width="190">
    </el-table-column>
    <el-table-column
      label="好评度"
      width="150">
      <template slot-scope="scope">
        <el-rate
          disabled
          v-model="scope.row.rate"
          text-color="#ff9900"
          >
        </el-rate>
      </template>
    </el-table-column>
    <el-table-column
      prop="riderName"
      label="骑手姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="送达时间"
      width="190">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="toOrderInfo(scope.row.id)"
          type="text"
          size="small">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orders.length">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    curOrders () {
      let total = this.orders.length
      let startIndex = this.pageSize * (this.currentPage - 1)
      let endIndex = startIndex + this.pageSize
      return startIndex < endIndex ? this.orders.slice(startIndex, endIndex) : this.orders.slice(startIndex, total)
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    toOrderInfo (orderId) {
      console.log(orderId)
      this.$router.push({
        name: 'storeOrderInfo',
        params: {
          id: orderId
        }
      })
    }
  }
}
</script>
