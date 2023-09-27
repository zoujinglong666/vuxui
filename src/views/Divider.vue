<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-divider></vux-divider>
    <DemoBlock title="展示文本"></DemoBlock>
    <vux-divider>2002-2023</vux-divider>
    <DemoBlock title="内容位置"></DemoBlock>
    <vux-divider contentPosition="left">再见2022</vux-divider>
    <vux-divider contentPosition="right">欢迎2023</vux-divider>
    <DemoBlock title="虚线"></DemoBlock>

    <vux-divider lineShape="dashed">
      虚线
    </vux-divider>
    <DemoBlock title="自定义样式"></DemoBlock>
    <vux-divider borderColor="blue" contentColor="blue">自定义样式</vux-divider>
  </div>
</template>

<script>
import DemoBlock from "@/components/DemoBlock.vue";
import VuxDivider from "@/packages/divider/src/index.vue";

export default {
  name: "Divider",
  components: {VuxDivider, DemoBlock}

}
</script>

<style scoped>

</style>
