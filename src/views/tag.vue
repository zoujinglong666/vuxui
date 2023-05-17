<template>
  <div>
    <vux-navbar title="tag标签"></vux-navbar>
    <p>基本用法</p>
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

    <p>样式风格</p>
    <vux-cell title="空心样式">
      <vux-tag theme="plain" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="圆角样式">
      <vux-tag round theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="标记样式">
      <vux-tag semicircle="right" theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <p>标签大小</p>
    <vux-cell title="mini标签">
      <vux-tag size="mini" theme="dark" type="primary">标签</vux-tag>
    </vux-cell>
    <vux-cell title="small标签">
      <vux-tag size="small" theme="dark" type="primary">标签</vux-tag>

    </vux-cell>
    <vux-cell title="large标签">

      <vux-tag size="large" theme="dark" type="primary">标签</vux-tag>

    </vux-cell>
    <p>自定义颜色</p>
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
export default {
  name: "tag",
  components: {},


}
</script>

<style scoped>

</style>