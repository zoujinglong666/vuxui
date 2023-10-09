<script>

import VuxEllipsis from "@/packages/ellipsis/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  components: {DemoBlock, DemoPage, VuxEllipsis}
}
</script>

<template>
  <DemoPage>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-ellipsis
        content="似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。"></vux-ellipsis>
  </DemoPage>

</template>

<style lang="less" scoped>

</style>
