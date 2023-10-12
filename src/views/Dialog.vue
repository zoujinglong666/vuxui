<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxActionSheet from "@/packages/actionSheet/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import VuxDialog from "@/packages/dialog/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";

export default {
  components: {VuxSpace, VuxButton, VuxDialog, VuxCell, VuxActionSheet, DemoBlock, VuxAvatar, DemoPage},
  data() {
    return {
      show: false,
      show1: false,

    }
  },
  methods: {}
}
</script>

<template>
  <div>
    <vux-cell is-link title="基本用法" @click="show=true"></vux-cell>
    <vux-cell is-link title="基本用法" @click="show1=true"></vux-cell>
    <vux-dialog v-model="show" singleButton title="标题" @confirm="show=false">
      <div style="padding:16px 16px">
        生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。
      </div>
      <vux-button block class="vux-hairline--top" link square type="primary" @click="show=false">确认</vux-button>
    </vux-dialog>
    <vux-dialog v-model="show1" singleButton title="标题" @confirm="show=false">
      <div style="padding:16px 16px">
        生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。
      </div>
      <vux-space class="vux-hairline">
        <vux-button block link square @click="show1=false">取消</vux-button>
        <vux-button block link square type="primary" @click="show1=false">确认</vux-button>
      </vux-space>
    </vux-dialog>
  </div>
</template>

<style lang="less" scoped>

</style>
