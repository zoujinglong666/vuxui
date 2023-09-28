<script>


import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  components: {VuxButton, VuxSpace, DemoBlock, DemoPage}
}
</script>

<template>
  <demo-page>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-space size="12">
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
    </vux-space>
    <DemoBlock title="垂直排列"></DemoBlock>
    <vux-space direction="vertical" fill size="12">
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
    </vux-space>
    <DemoBlock title="垂直排列"></DemoBlock>
    <vux-space wrap>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
      <vux-button type="primary">按钮</vux-button>
    </vux-space>
  </demo-page>
</template>

<style lang="less" scoped>

</style>
