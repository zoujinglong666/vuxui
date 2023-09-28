<template>
  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-radio-group v-model="value">
      <vux-radio name="上海">上海</vux-radio>
      <vux-radio name="深圳">深圳</vux-radio>
      <vux-radio name="北京">北京</vux-radio>
    </vux-radio-group>
    <DemoBlock title="水平排列"></DemoBlock>
    <vux-radio-group v-model="value" direction="horizontal">
      <vux-radio name="上海">上海</vux-radio>
      <vux-radio name="深圳">深圳</vux-radio>
      <vux-radio name="北京">北京</vux-radio>
    </vux-radio-group>
    <DemoBlock title="不同形状"></DemoBlock>
    <vux-radio-group v-model="value">
      <vux-radio name="上海" shape="square">上海</vux-radio>
      <vux-radio name="深圳" shape="square">深圳</vux-radio>
      <vux-radio name="北京" shape="square">北京</vux-radio>
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
      value: '上海'
    }
  }

}
</script>

<style scoped>

</style>
