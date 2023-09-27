<template>
  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-progress v-model="value">
    </vux-progress>
    <DemoBlock title="线条粗细"></DemoBlock>
    <vux-progress v-model="value" size="base">
    </vux-progress>
    <DemoBlock title="样式定制"></DemoBlock>
    <vux-progress v-model="value" strokeColor="#07c160" tipText="绿色">
    </vux-progress>
    <vux-progress v-model="value1" strokeColor="#ff976a" tipText="橙色">
    </vux-progress>
    <vux-progress v-model="value2" strokeColor="rgb(114, 50, 221)" tipText="紫色">
    </vux-progress>
  </DemoPage>

</template>

<script>
import VuxProgress from "@/packages/process/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: "Progress",
  data() {
    return {
      value: 50,
      value1: 60,
      value2: 70,
    }
  },
  components: {DemoPage, DemoBlock, VuxProgress}

}
</script>

<style scoped>

</style>
