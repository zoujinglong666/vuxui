<template>
  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-radio-group v-model="value">
      <vux-radio name="1">1</vux-radio>
      <vux-radio name="2">2</vux-radio>
      <vux-radio name="3">3</vux-radio>
    </vux-radio-group>
    <DemoBlock title="水平排列"></DemoBlock>
    <vux-radio-group v-model="value" direction="horizontal">
      <vux-radio name="1">1</vux-radio>
      <vux-radio name="2">2</vux-radio>
      <vux-radio name="3">3</vux-radio>
    </vux-radio-group>
    <DemoBlock title="不同形状"></DemoBlock>
    <vux-radio-group v-model="value">
      <vux-radio name="1" shape="square">1</vux-radio>
      <vux-radio name="2" shape="square">2</vux-radio>
      <vux-radio name="3" shape="square">3</vux-radio>
    </vux-radio-group>
  </DemoPage>

</template>

<script>
import VuxRadioGroup from "@/packages/radioGroup/src";
import VuxRadio from "@/packages/radio/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Radio",
  components: {DemoBlock, DemoPage, VuxRadio, VuxRadioGroup},
  data() {
    return {
      value: '1'
    }
  }

}
</script>

<style scoped>

</style>
