<template>
  <div>
    <vux-navbar title="tag标签"></vux-navbar>
    <p>基本用法</p>
    <vux-cell title="primary类型">
      <template #value>
        <vux-tag theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="success类型">
      <template #value>
        <vux-tag theme="dark" type="success">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="danger类型">
      <template #value>
        <vux-tag theme="dark" type="danger">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="warning类型">
      <template #value>
        <vux-tag theme="dark" type="warning">标签</vux-tag>
      </template>
    </vux-cell>

    <p>样式风格</p>
    <vux-cell title="空心样式">
      <template #value>
        <vux-tag theme="plain" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="圆角样式">
      <template #value>
        <vux-tag round theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="标记样式">
      <template #value>
        <vux-tag semicircle="right" theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <p>标签大小</p>
    <vux-cell title="mini标签">
      <template #value>
        <vux-tag size="mini" theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="small标签">
      <template #value>
        <vux-tag size="small" theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="large标签">
      <template #value>
        <vux-tag size="large" theme="dark" type="primary">标签</vux-tag>
      </template>
    </vux-cell>
    <p>自定义颜色</p>
    <vux-cell title="背景颜色">
      <template #value>
        <vux-tag backgroundColor="red" color="#fff">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="文字颜色">
      <template #value>
        <vux-tag backgroundColor="#fffeee" color="red">标签</vux-tag>
      </template>
    </vux-cell>
    <vux-cell title="空心颜色">
      <template #value>
        <vux-tag borderColor="blue">标签</vux-tag>
      </template>
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