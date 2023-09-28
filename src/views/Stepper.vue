<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxStepper from "@/packages/steper/src/index.vue";
import VuxTag from "@/packages/tag/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";

export default {
  components: {VuxCell, VuxTag, VuxStepper, DemoBlock, VuxAvatar, DemoPage},
  data() {
    return {
      value: 1,
      value1: 1,
      value2: 1,
      value3: 1,
      value4: 1,
      value5: 1,
      value6: 1.1,
    }
  }
}
</script>

<template>
  <div>
    <vux-cell title="基本用法">
      <vux-stepper v-model="value"></vux-stepper>
    </vux-cell>
    <vux-cell title="步长设置">
      <vux-stepper v-model="value1" :step="2"></vux-stepper>
    </vux-cell>
    <vux-cell title="限制输入范围">
      <vux-stepper v-model="value2" :max="10"></vux-stepper>
    </vux-cell>
    <vux-cell title="限制输入整数">
      <vux-stepper v-model="value5" integer></vux-stepper>
    </vux-cell>
    <vux-cell title="禁用输入框">
      <vux-stepper v-model="value4" disable-input></vux-stepper>
    </vux-cell>
    <vux-cell title="可输入小数">
      <vux-stepper v-model="value6" :decimal-length="1" :step="0.2" autoFixed></vux-stepper>
    </vux-cell>
  </div>
</template>

<style lang="less" scoped>

</style>
