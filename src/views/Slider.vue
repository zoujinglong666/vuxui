<template>

  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-slider :value.sync="value" type="single"></vux-slider>
    <DemoBlock title="双滑块"></DemoBlock>
    <vux-slider :value.sync="value" type="range"></vux-slider>
    <DemoBlock title="显示间断点"></DemoBlock>
    <vux-slider :value.sync="value" type="step"></vux-slider>
  </DemoPage>

</template>
<script>
import VuxSlider from "@/packages/slider/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  components: {DemoBlock, DemoPage, VuxSlider},
  data() {
    return {
      value: [0, 100]
    }
  },
}

</script>
<style lang="less" scoped>

</style>
