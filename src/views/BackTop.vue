<template>
  <div class="data" style="height: 667px;overflow: auto">
    <div v-for="item  in 10">

      <div class="item">{{ item }}</div>

    </div>
    <vux-back-top target=".data"></vux-back-top>
  </div>

</template>

<script>
import VuxFab from "@/packages/fab/src/index.vue";
import VuxBackTop from "@/packages/backTop/src/index.vue";

export default {
  name: "BackTop",
  components: {VuxBackTop, VuxFab}
}
</script>

<style scoped>
.data {
  height: 500px;
  overflow-y: auto;
}

.item {
  width: 100%;
  height: 180px;
  border: 1px solid #eee;
}
</style>
