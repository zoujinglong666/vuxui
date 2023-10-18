<script>
import VuxLoading from "@/packages/loading/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  components: {DemoPage, VuxLoading}
}
</script>

<template>
  <DemoPage>
    <vux-loading></vux-loading>
    <vux-loading loading-text="加载中"></vux-loading>
  </DemoPage>

</template>

<style lang="less" scoped>

</style>
