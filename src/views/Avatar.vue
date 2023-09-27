<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  components: {DemoBlock, VuxAvatar, DemoPage}
}
</script>

<template>
  <demo-page>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-avatar src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"></vux-avatar>
    <DemoBlock title="文字"></DemoBlock>
    <vux-avatar text="vux" type="text"></vux-avatar>
    <DemoBlock title="方形"></DemoBlock>
    <vux-avatar shape="square" text="vux" type="text"></vux-avatar>
  </demo-page>
</template>

<style lang="less" scoped>

</style>
