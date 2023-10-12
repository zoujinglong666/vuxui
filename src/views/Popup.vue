<template>
  <DemoPage>
    <DemoBlock title="基本用法">

    </DemoBlock>
    <vux-space wrap>
      <vux-button size="small" @click="top">
        顶部弹出
      </vux-button>
      <vux-button size="small" @click="bottom">
        底部弹出
      </vux-button>
      <vux-button size="small" @click="left">
        左侧弹出
      </vux-button>
      <vux-button size="small" @click="right">
        右侧弹出
      </vux-button>
      <vux-button size="small" @click="centerShow=true">
        中间弹出
      </vux-button>
    </vux-space>
    <DemoBlock title="基本用法">

    </DemoBlock>
    <vux-space>
      <vux-button size="small" @click="bottomShow1=true">
        圆角弹窗
      </vux-button>
    </vux-space>

    <vux-popup v-model="topShow" :popup-style="{height:'30%'}" closeable position="top">
    </vux-popup>
    <vux-popup v-model="leftShow" :popup-style="{width:'80%'}" position="left"></vux-popup>
    <vux-popup v-model="rightShow" :popup-style="{width:'80%'}" position="right"></vux-popup>
    <vux-popup v-model="bottomShow" :popup-style="{height:'30%'}" position="bottom"></vux-popup>
    <vux-popup v-model="bottomShow1" :popup-style="{height:'30%'}" position="bottom" round></vux-popup>
    <vux-popup v-model="centerShow" :popup-style="{height:'120px',width:'120px'}" position="center"
               round></vux-popup>
  </DemoPage>
</template>

<script>
import VuxDivider from "@/packages/divider/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import VuxPopup from "@/packages/popup/index.vue";
import VuxButton from "@/packages/button/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: "Popup",
  components: {DemoPage, DemoBlock, VuxButton, VuxPopup, VuxSpace, VuxDivider},
  data() {
    return {

      topShow: false,
      leftShow: false,
      rightShow: false,
      bottomShow: false,
      bottomShow1: false,
      centerShow: false,
    }
  },

  methods: {
    top() {
      this.topShow = true;
    },
    bottom() {
      this.bottomShow = true;

    },
    left() {
      this.leftShow = true;

    },
    right() {
      this.rightShow = true;
    }
  }
}
</script>

<style scoped>

</style>
