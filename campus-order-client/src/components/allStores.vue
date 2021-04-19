<template>
  <div>
    <search
      @searchByValue="searchByValue"></search>
    <hr class="scale-half">
    <div class="cus-contentDish">
      <store-card
        v-for="(item, index) in stores"
        :key="index"
        :store="item"></store-card>
    </div>
  </div>
</template>
<script>
import search from './search.vue'
import storeCard from './storeCard.vue'
export default {
  components: {
    search,
    storeCard
  },
  data () {
    return {
      stores: []
    }
  },
  computed: {
  },
  mounted () {
    this.getAllStores()
  },
  methods: {
    getAllStores () {
      this.$axios
        .get('api/store/getAllStores')
        .then(res => {
          this.stores = res.data
        })
        .catch(e => {
          this.$message.error(e.status + ' ' + e.error)
        })
    },
    searchByValue (value) {
      this.$axios
        .get('api/store/searchByStoreName', {
          params: {
            storeName: value
          }
        })
        .then(res => {
          this.stores = res.data
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
