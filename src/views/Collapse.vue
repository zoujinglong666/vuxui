<template>
  <div>
    <p>基本用法</p>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>


    <p>手风琴</p>
    <vux-collapse v-model="activeNames" accordion>
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
    <p>禁用状态</p>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1"> 再见2022</vux-collapse-item>
      <vux-collapse-item disabled name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item disabled name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
  </div>
</template>

<script>
import VuxCollapse from "@/packages/collapse/src";

export default {
  name: "Collapse",
  data() {
    return {
      activeNames: ['1']
    }
  },
  components: {VuxCollapse}
}
</script>

<style scoped>

</style>