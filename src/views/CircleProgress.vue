<script>
import VuxCircleProgress from "@/packages/circleProgress/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "CircleProgress",
  components: {DemoBlock, VuxSpace, VuxButton, DemoPage, VuxCircleProgress},
  data() {
    return {
      value: 60, colors: ['#6d80ff', '#f980f1'],
    }
  },
  methods: {
    add() {
      if (this.value >= 100) {
        return
      }
      this.value += 10;
    },
    sub() {
      if (this.value === 0) {
        return
      }
      this.value -= 10;
    }
  }
}
</script>

<template>

  <DemoPage>
    <demo-block title="基本用法">

    </demo-block>

    <vux-circle-progress v-model="value">
      {{ value }}%
    </vux-circle-progress>

    <demo-block title="渐变">

    </demo-block>
    <vux-circle-progress v-model="value" :color="colors">
      {{ value }}%
    </vux-circle-progress>
    <vux-space>
      <vux-button round size="small" type="primary" @click="add">
        增加
      </vux-button>
      <vux-button round size="small" type="danger" @click="sub">
        减少
      </vux-button>
    </vux-space>
  </DemoPage>

</template>

<style lang="less" scoped>

</style>
