<template>
  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-data-checkbox v-model="value1" :options="options1"></vux-data-checkbox>
    <DemoBlock title="点击可取消"></DemoBlock>
    <vux-data-checkbox v-model="value1" :options="options1" cancelable></vux-data-checkbox>
    <DemoBlock title="圆形"></DemoBlock>
    <vux-data-checkbox v-model="value1" :options="options1" round></vux-data-checkbox>
    <DemoBlock title="多选"></DemoBlock>
    <vux-data-checkbox v-model="value2" :options="options1" type="multiple"></vux-data-checkbox>
    <DemoBlock title="限制最大可选数"></DemoBlock>
    <vux-data-checkbox v-model="value3" :max="2" :options="options1" type="multiple"></vux-data-checkbox>
    <DemoBlock title="显示对勾"></DemoBlock>
    <vux-data-checkbox v-model="value3" :options="options1" checkMark noBorder></vux-data-checkbox>
    <DemoBlock title="样式风格"></DemoBlock>
    <vux-space direction="vertical" size="12">
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="primary" noBorder></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="success" noBorder></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="danger" noBorder></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="warning" noBorder></vux-data-checkbox>
    </vux-space>

  </DemoPage>
</template>

<script>
import VuxDataCheckbox from "@/packages/dataCheckBox/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: "DataCheckBox",
  data() {
    return {
      options1: ['上海', '深圳', '北京', '广州'],
      value1: '上海',
      value2: ['上海'],
      value3: ['上海']
    }
  },
  components: {DemoPage, DemoBlock, VuxSpace, VuxDataCheckbox}

}
</script>

<style scoped>

</style>
