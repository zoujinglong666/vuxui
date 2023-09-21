<template>
  <div>
    <vux-slider :value.sync="value" type="single"></vux-slider>
  </div>


</template>
<script>
import VuxSlider from "@/packages/slider/src/index.vue";

export default {
  components: {VuxSlider},
  data() {
    return {
      value: [0, 100]
    }
  },
}

</script>
<style lang="less" scoped>

</style>
