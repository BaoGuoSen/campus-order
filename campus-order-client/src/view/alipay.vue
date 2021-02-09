<template>
  <div v-html="apply">{{apply}}</div>
</template>
<script>
export default {
  data () {
    return {
      apply: ''
    }
  },
  mounted () {
    let form = this.$route.query.html
    this.apply = form
    this.$nextTick(() => {
      document.forms[0].submit()
    })
  }
}
</script>
