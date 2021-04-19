<template>
  <div>
    <search
      @searchByValue="searchByValue"></search>
    <hr class="scale-half">
    <div class="cus-contentDish">
      <dish-card
        :isEdit="false"
        v-for="(item, index) in dishs"
        :key="index"
        :dish="item"
        :imageList="imageList"></dish-card>
    </div>
  </div>
</template>
<script>
import search from './search.vue'
import dishCard from './dishCard.vue'
import mymap from './myMap.vue'
export default {
  components: {
    search,
    dishCard,
    mymap
  },
  data () {
    return {
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
    this.getAllDishs()
    console.log(this.$route.params.storeId)
  },
  methods: {
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
    getAllDishs () {
      this.$axios
        .get('api/store/getDishsByStoreId', {
          params: {
            storeId: this.$route.params.storeId
          }
        })
        .then(res => {
          this.dishs = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    searchByValue (value) {
      this.$axios
        .get('api/store/searchByValue', {
          params: {
            value: value,
            storeId: this.$route.params.storeId
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

</style>
<style>
.hr .scale-half {
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
.content .cus-contentDish {
  display: flex;
  flex-wrap: wrap;
}
.content .cus-contentDish /deep/ .card {
  margin-right: 73px;
}
</style>
