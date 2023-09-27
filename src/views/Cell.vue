<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-cell isLink label="描述信息" title="单元格"></vux-cell>
  </div>

</template>

<script>
import VuxCell from "@/packages/cell/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "cell",
  components: {DemoBlock, VuxCell}
}
</script>

<style scoped>

</style>
