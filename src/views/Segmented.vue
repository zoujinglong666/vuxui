<template>
  <vux-segmented v-model="value" :options="['上海','北京','深圳']" block></vux-segmented>
</template>
<script>
import VuxSegmented from "@/packages/segmented/src/index.vue";

export default {
  name: "Segmented",
  components: {VuxSegmented},
  data() {
    return {
      value: '深圳'
    }
  }

}
</script>

<style scoped>

</style>
