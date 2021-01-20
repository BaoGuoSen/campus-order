<template>
  <div>
    <search
      @searchByValue="searchByValue"></search>
    <hr class="scale-half">
    <div class="contentDish">
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
        .get('api/store/getAllDishs')
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
