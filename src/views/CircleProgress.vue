<script>
import VuxCircleProgress from "@/packages/circleProgress/src/index.vue";

export default {
  name: "CircleProgress",
  components: {VuxCircleProgress},
  data() {
    return {
      value: 60
    }
  }
}
</script>

<template>

  <div>
    <vux-circle-progress v-model="value">
      {{ value }}%
    </vux-circle-progress>
  </div>

</template>

<style lang="less" scoped>

</style>
