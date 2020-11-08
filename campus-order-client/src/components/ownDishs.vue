<template>
  <div>
    <search
      @searchByValue="searchByValue"></search>
    <el-button type="primary"  @click="showAddDialog" style="float:right;margin-top:-65px;">新建菜品</el-button>
    <hr class="scale-half">
    <div class="contentDish">
      <dish-card
        :isEdit="true"
        @showEditDialog="showEditDialog"
        @deleteDish="deleteDish"
        @updateDish="update"
        v-for="(item, index) in dishs"
        :key="index"
        :dish="item"
        :imageList="imageList"></dish-card>
    </div>
    <mydialog
      :dialogDishVisible="dialogDishVisible"
      @hideDialog="hideDialog"
      @addDish="addDish"
      :dish="dish"></mydialog>
  </div>
</template>
<script>
import search from './search.vue'
import dishCard from './dishCard.vue'
import mydialog from './mydialog.vue'
export default {
  components: {
    search,
    dishCard,
    mydialog
  },
  data () {
    return {
      dialogType: '',
      dialogDishVisible: false,
      dish: {
        id: '',
        src: '',
        name: '',
        price: '',
        sellCount: '',
        storeId: ''
      },
      dishs: []
    }
  },
  computed: {
    imageList () {
      let res = []
      this.dishs.forEach(item => {
        res.push(item.src)
      })
      return res
    }
  },
  mounted () {
    this.getDishs()
  },
  methods: {
    showAddDialog () {
      this.dialogType = 'create'
      this.dialogDishVisible = true
    },
    showEditDialog (dish) {
      this.dialogType = 'edit'
      this.dish = dish
      this.dialogDishVisible = true
    },
    hideDialog () {
      this.dialogDishVisible = false
    },
    addDish (dish) {
      this.$axios
        .post('api/store/addDish', dish)
        .then(res => {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.getDishs()
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    update (dish) {
      this.$axios
        .post('api/store/updateDish', dish)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    getDishs () {
      this.$axios
        .get('api/store/getDishsByStoreId', {
          params: {
            storeId: localStorage.getItem('storeId')
          }
        })
        .then(res => {
          this.dishs = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    deleteDish (dish) {
      this.$axios
        .post('api/store/deleteDish', dish)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          console.log(333, res.data)
          this.getDishs()
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    searchByValue (value) {
      this.$axios
        .get('api/store/searchByValue', {
          params: {
            value: value
          }
        })
        .then(res => {
          this.dishs = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    getStore () {
      this.$axios
        .get('api/store/getStoreById', {
          params: {
            ownerId: localStorage.getItem('userId')
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
          if (!localStorage.getItem('storeId')) {
            localStorage.setItem('storeId', res.data.id)
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

</style>
<style>
.hr .scale-half {
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
.content .contentDish {
  display: flex;
  flex-wrap: wrap;
}
</style>
