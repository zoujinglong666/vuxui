<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxSteps from "@/packages/steps/src/index.vue";
import VuxStep from "@/packages/step/src/index.vue";

export default {
  components: {VuxStep, VuxSteps, DemoBlock, VuxAvatar, DemoPage},
  data() {
    return {
      active: 1
    }
  }
}
</script>

<template>
  <div>
    <demo-block title="基本用法"></demo-block>
    <vux-steps v-model="active">
      <vux-step title="买家下单"></vux-step>
      <vux-step title="商家接单"></vux-step>
      <vux-step title="买家提货"></vux-step>
      <vux-step title="交易完成"></vux-step>
    </vux-steps>
  </div>

</template>

<style lang="less" scoped>

</style>
