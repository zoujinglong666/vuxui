<template>
  <div>
    <DemoBlock title="基础用法"></DemoBlock>
    <vux-swipe-cell>
      <template #left>
        <vux-button square style="height: 100%" type="primary" @click="doSelect">选择</vux-button>
      </template>
      <vux-cell :border="false" title="单元格" value="内容"/>
      <template #right>
        <vux-button square style="height: 100%" type="primary" @click="doSelect">选择</vux-button>
        <vux-button square style="height: 100%" type="danger" @click="doDel"> 删除</vux-button>
      </template>
    </vux-swipe-cell>
    <DemoBlock title="自定义内容"></DemoBlock>
    <vux-swipe-cell>
      <template #left>
        <vux-button square style="height: 100%" type="primary" @click="doSelect">选择</vux-button>
      </template>
      <img alt="" height="44px"
           src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"/>
      <template #right>
        <vux-button square style="height: 100%" type="primary" @click="doSelect">选择</vux-button>
        <vux-button square style="height: 100%" type="danger" @click="doDel"> 删除</vux-button>
      </template>
    </vux-swipe-cell>
  </div>

</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxFab from "@/packages/fab/src/index.vue";
import VuxSwipeCell from "@/packages/swipeCell/src/index.vue";
import VuxDivider from "@/packages/divider/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import msg from "@/utils/msg";

export default {
  name: "SwipeCell",
  components: {VuxCell, DemoBlock, DemoPage, VuxDivider, VuxSwipeCell, VuxFab, VuxButton},
  methods: {

    doSelect() {
      msg.success("选择");
    },
    doDel() {
      msg.error("删除");
    }
  },
};
</script>
