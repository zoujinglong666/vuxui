<script>


import VuxFab from "@/packages/fab/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";

export default {
  components: {VuxSpace, VuxButton, DemoPage, VuxFab},
  data() {
    return {
      position: "right"

    }
  },
  methods: {
    left() {
      this.position = "left";
    },
    center() {
      this.position = "center";
    },
    right() {
      this.position = "right";
    }
  }
}
</script>

<template>
  <demo-page>
    <vux-space>
      <vux-button @click="left">左</vux-button>
      <vux-button @click="center">中</vux-button>
      <vux-button @click="right">右</vux-button>
    </vux-space>

    <vux-fab :position="position">
      <i class="iconfont icon-add-bold"></i>
    </vux-fab>
  </demo-page>


</template>

<style lang="less" scoped>

</style>
