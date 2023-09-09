<template>
  <vux-segmented v-model="value" :options="['1','2','3']" block></vux-segmented>
</template>

<script>
import VuxSegmented from "@/packages/segmented/src/index.vue";

export default {
  name: "Segmented",
  components: {VuxSegmented},
  data() {
    return {
      value: '1'
    }
  }

}
</script>

<style scoped>

</style>
