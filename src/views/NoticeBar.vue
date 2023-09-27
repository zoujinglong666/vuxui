<script>

import DemoPage from "@/components/DemoPage.vue";
import VuxNavbar from "@/packages/navBar/src/index.vue";
import VuxNoticeBar from "@/packages/NoticeBar/src/index.vue";

export default {
  components: {VuxNoticeBar, VuxNavbar, DemoPage},
  data() {
    return {}
  }
}
</script>

<template>
  <div>
    <vux-notice-bar content="不敢打开信封啊。因为，打开了就结束了啊。 --旋风管家" type="success"></vux-notice-bar>
    <vux-notice-bar content="不敢打开信封啊。因为，打开了就结束了啊。 --旋风管家" type="warning"></vux-notice-bar>
    <vux-notice-bar content="不敢打开信封啊。因为，打开了就结束了啊。 --旋风管家"></vux-notice-bar>
    <vux-notice-bar content="不敢打开信封啊。因为，打开了就结束了啊。 --旋风管家"></vux-notice-bar>
  </div>
</template>

<style lang="less" scoped>

</style>
