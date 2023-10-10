<template>

  <DemoPage>
    <demo-block title="基本用法"></demo-block>
    <vux-switch v-model="value"></vux-switch>
    <demo-block title="自定义文字"></demo-block>
    <vux-switch v-model="value1" activeText="开启" inactiveText="关闭"></vux-switch>
    <demo-block title="自定义颜色"></demo-block>
    <vux-switch v-model="value2" active-color="red"></vux-switch>
    <demo-block title="loading状态"></demo-block>
    <vux-switch v-model="value3" loading></vux-switch>
    <demo-block title="禁用状态"></demo-block>
    <vux-switch v-model="value4" disabled></vux-switch>
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
      value: true,
      value1: true,
      value2: true,
      value3: true,
      value4: true,
    }
  },
  components: {DemoPage, DemoBlock, VuxCell, VuxSwitch}

}
</script>

<style scoped>

</style>
