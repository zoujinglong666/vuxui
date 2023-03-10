<template>
  <vux-tabs v-model="activeIndex">
    <vux-tab :title="1">1</vux-tab>
    <vux-tab :title="2">2</vux-tab>
    <vux-tab :title="3">3</vux-tab>
    <vux-tab :title="4">4</vux-tab>
    <vux-tab :title="5">5</vux-tab>
  </vux-tabs>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {activeIndex: 0}
  },
  components: {}

}
</script>

<style scoped>

</style>
