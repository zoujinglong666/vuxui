<template>
  <div>
    <vux-divider>基础用法</vux-divider>
    <vux-swipe-cell>
      <template #left>
        <vux-button square style="height: 100%" type="primary">选择</vux-button>
      </template>
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
           width="10%"
           alt=""/>
      <template #right>
        <vux-button square style="height: 100%" type="primary">选择</vux-button>
        <vux-button square style="height: 100%" type="danger"> 删除</vux-button>
      </template>
    </vux-swipe-cell>

  </div>

</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxFab from "@/packages/fab/src/index.vue";
import VuxSwipeCell from "@/packages/swipeCell/src/index.vue";

export default {
  name: "SwipeCell",
  components: {VuxSwipeCell, VuxFab, VuxButton},


  methods: {
    onClose(clickPosition) {
      console.log(clickPosition);
    },
  },
};
</script>
