<template>

  <DemoPage>
    <demo-block title="基本用法"></demo-block>
    <vux-switch v-model="loadingValue" activeText="开启" inactiveText="关闭"></vux-switch>
  </DemoPage>
</template>

<script>
import VuxSwitch from "@/packages/switch/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: "switch",
  data() {
    return {
      loadingValue: true
    }
  },
  components: {DemoPage, DemoBlock, VuxCell, VuxSwitch}

}
</script>

<style scoped>

</style>
