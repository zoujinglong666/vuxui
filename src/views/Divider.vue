<template>
  <div>

    <p>基本用法</p>
    <vux-divider></vux-divider>
    <p>展示文本</p>
    <vux-divider>2002-2023</vux-divider>
    <p>内容位置</p>
    <vux-divider contentPosition="left">再见2022</vux-divider>
    <vux-divider contentPosition="right">欢迎2023</vux-divider>
    <p>虚线</p>
    <vux-divider lineShape="dashed">
      虚线
    </vux-divider>
    <p>自定义样式</p>
    <vux-divider borderColor="blue" contentColor="blue">自定义样式</vux-divider>

  </div>
</template>

<script>
export default {
  name: "Divider",
  components: {}

}
</script>

<style scoped>

</style>