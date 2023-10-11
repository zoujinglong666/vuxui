<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxActionSheet from "@/packages/actionSheet/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import VuxDialog from "@/packages/dialog/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  components: {VuxButton, VuxDialog, VuxCell, VuxActionSheet, DemoBlock, VuxAvatar, DemoPage},
  data() {
    return {
      show: false,

    }
  },
  methods: {}
}
</script>

<template>
  <div>
    <vux-cell is-link title="基本用法" @click="show=true"></vux-cell>
    <vux-dialog v-model="show" singleButton title="标题" @confirm="show=false">
      <div style="padding:16px 16px">
        生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。
      </div>
      <vux-button block link square type="primary" @click="show=false">确认</vux-button>
    </vux-dialog>
  </div>
</template>

<style lang="less" scoped>

</style>
