<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
    <DemoBlock title="手风琴"></DemoBlock>
    <vux-collapse v-model="activeNames" accordion>
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
    <DemoBlock title="禁用状态"></DemoBlock>
    <vux-collapse v-model="activeNames" default-expand-all>
      <vux-collapse-item disabled name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
  </div>
</template>

<script>
import VuxCollapse from "@/packages/collapse/src";
import VuxCollapseItem from "@/packages/collapseItem/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Collapse",
  data() {
    return {
      activeNames: ['1']
    }
  },
  components: {DemoBlock, VuxCollapseItem, VuxCollapse}
}
</script>

<style scoped>

</style>
