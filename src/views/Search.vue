<template>
  <vux-search v-model="value" @on-search="search">
  </vux-search>
</template>
<script>
import VuxSearch from "@/packages/search/src/index.vue";

export default {
  name: "Search",
  components: {VuxSearch},
  data() {
    return {
      value: "再难也要坚持"
    }
  },
  methods: {
    search(val) {
      this.$msg({
        type: "success",
        message: "搜索结果:" + val
      })

    }
  }
}
</script>

<style scoped>

</style>
