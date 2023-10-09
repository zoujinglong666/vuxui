<script>

import VuxRate from "@/packages/rate/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  components: {DemoBlock, VuxRate},
  data() {
    return {
      value: 3
    }
  }
}
</script>

<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-rate v-model="value"></vux-rate>
  </div>

</template>

<style lang="less" scoped>

</style>
