<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1">将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。
      </vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。
      </vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。
      </vux-collapse-item>
    </vux-collapse>
    <DemoBlock title="手风琴"></DemoBlock>
    <vux-collapse v-model="activeNames" accordion>
      <vux-collapse-item name="1" title="手风琴1">
        手风琴（accordion）是一种既能独奏，又能伴奏的键盘乐器，不仅能够演奏单声部的优美旋律，还可以演奏多声部的乐曲，更可以如钢琴一样双手演奏丰富的和声。手风琴声音宏大，音色变化丰富，手指与风箱的巧妙结合，能够演奏出多种不同风格的乐曲，这是许多乐器无法比拟的；除了独立演奏外，也可参加重奏、合奏，可以说一架手风琴就是一个小型乐队。
      </vux-collapse-item>
      <vux-collapse-item name="2" title="手风琴2">
        手风琴（accordion）是一种既能独奏，又能伴奏的键盘乐器，不仅能够演奏单声部的优美旋律，还可以演奏多声部的乐曲，更可以如钢琴一样双手演奏丰富的和声。手风琴声音宏大，音色变化丰富，手指与风箱的巧妙结合，能够演奏出多种不同风格的乐曲，这是许多乐器无法比拟的；除了独立演奏外，也可参加重奏、合奏，可以说一架手风琴就是一个小型乐队。
      </vux-collapse-item>
      <vux-collapse-item name="3" title="手风琴3">
        手风琴（accordion）是一种既能独奏，又能伴奏的键盘乐器，不仅能够演奏单声部的优美旋律，还可以演奏多声部的乐曲，更可以如钢琴一样双手演奏丰富的和声。手风琴声音宏大，音色变化丰富，手指与风箱的巧妙结合，能够演奏出多种不同风格的乐曲，这是许多乐器无法比拟的；除了独立演奏外，也可参加重奏、合奏，可以说一架手风琴就是一个小型乐队。
      </vux-collapse-item>
    </vux-collapse>
    <DemoBlock title="禁用状态"></DemoBlock>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1">没被禁用</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">没被禁用</vux-collapse-item>
      <vux-collapse-item disabled name="3" title="标题3">被禁用了</vux-collapse-item>
    </vux-collapse>
  </div>
</template>

<script>
import VuxCollapse from "@/packages/collapse/src";
import VuxCollapseItem from "@/packages/collapseItem/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Collapse",
  data() {
    return {
      activeNames: ['1']
    }
  },
  components: {DemoBlock, VuxCollapseItem, VuxCollapse}
}
</script>

<style scoped>

</style>
