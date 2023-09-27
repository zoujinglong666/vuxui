<template>
  <div>
    <demo-block title="基本用法"></demo-block>
    <vux-cell title="primary类型">
      <vux-tag theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="success类型">
      <vux-tag theme="dark" type="success">标签</vux-tag>
    </vux-cell>
    <vux-cell title="danger类型">
      <vux-tag theme="dark" type="danger">标签</vux-tag>
    </vux-cell>
    <vux-cell title="warning类型">
      <vux-tag theme="dark" type="warning">标签</vux-tag>
    </vux-cell>
    <demo-block title="样式风格"></demo-block>
    <vux-cell title="空心样式">
      <vux-tag theme="plain" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="圆角样式">
      <vux-tag round theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="标记样式">
      <vux-tag semicircle="right" theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <demo-block title="标签大小"></demo-block>
    <vux-cell title="mini标签">
      <vux-tag size="mini" theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="small标签">
      <vux-tag size="small" theme="dark" type="primary">标签</vux-tag>

    </vux-cell>
    <vux-cell title="large标签">

      <vux-tag size="large" theme="dark" type="primary">标签</vux-tag>

    </vux-cell>
    <demo-block title="自定义颜色"></demo-block>
    <vux-cell title="背景颜色">
      <vux-tag backgroundColor="red" color="#fff">标签</vux-tag>
    </vux-cell>
    <vux-cell title="文字颜色">
      <vux-tag backgroundColor="#fffeee" color="red">标签</vux-tag>

    </vux-cell>
    <vux-cell title="空心颜色">

      <vux-tag borderColor="blue">标签</vux-tag>

    </vux-cell>
  </div>


</template>

<script>
import VuxCell from "@/packages/cell/src/index.vue";
import VuxTag from "@/packages/tag/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "tag",
  components: {DemoBlock, VuxTag, VuxCell},


}
</script>

<style scoped>

</style>
