<template>
  <div>
    <vux-slider :value.sync="value" type="single"></vux-slider>
  </div>


</template>
<script>
import {defineComponent} from "vue";
import VuxSlider from "@/packages/slider/src/index.vue";

export default defineComponent({
  components: {VuxSlider},
  data() {
    return {
      value: [0, 100]
    }
  },
})

</script>
<style lang="less" scoped>

</style>
