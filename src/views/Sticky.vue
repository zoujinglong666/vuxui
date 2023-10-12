<template>
  <div>
    <DemoBlock title="基础用法"></DemoBlock>
    <vux-sticky @scroll="appScroll">
      <vux-button type="primary">基础用法</vux-button>
    </vux-sticky>
    <DemoBlock title="距离顶部"></DemoBlock>
    <vux-sticky :offset-top="60" @scroll="appScroll">
      <vux-button type="primary">吸顶距离</vux-button>
    </vux-sticky>

    <DemoBlock title="指定容器"></DemoBlock>
    <div ref="container" style="height: 150px;background: #F7F8FA">
      <vux-sticky :container="container">
        <vux-button type="warning">指定容器</vux-button>
      </vux-sticky>
    </div>
    <div>
      <div v-for="item in 50" style="height: 40px">
      </div>
    </div>
  </div>

</template>
<script>
import VuxSticky from "@/packages/sticky/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxButton from "@/packages/button/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: 'sticky',
  components: {
    DemoPage,
    VuxButton,
    DemoBlock,
    VuxSticky

  },
  data() {
    return {
      container: null,
    };
  },
  mounted() {
    this.container = this.$refs.container;
  },
  methods: {
    appScroll(obj) {
      console.log(obj);
    },
  },
};
</script>
<style lang="less">

</style>
