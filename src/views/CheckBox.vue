<template>
  <DemoPage>
    <demo-block title="基本用法"></demo-block>
    <vux-checkbox v-model="checkValue">复选框</vux-checkbox>
    <demo-block title="方形"></demo-block>
    <vux-checkbox v-model="checkValue" shape="square">复选框</vux-checkbox>
    <demo-block title="禁用状态"></demo-block>
    <vux-space direction="vertical">
      <vux-checkbox v-model="falseValue" disabled>复选框</vux-checkbox>
      <vux-checkbox v-model="checkValue" disabled>复选框</vux-checkbox>
    </vux-space>
    <demo-block title="禁用文本点击"></demo-block>
    <vux-checkbox v-model="checkValue" labelDisabled>复选框</vux-checkbox>
    <demo-block title="复选框组"></demo-block>
    <vux-checkbox-group v-model="groupVal">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <demo-block title="水平排列"></demo-block>
    <vux-checkbox-group v-model="groupVal" direction="horizontal">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <demo-block title="限制最大可选数"></demo-block>

    <vux-checkbox-group v-model="groupVal1" :max="2">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <demo-block title="全选与反选"></demo-block>
    <vux-checkbox-group ref="group" v-model="groupVal2">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <vux-space style="margin-top: 16px">
      <vux-button type="primary" @click="handleAll">全选</vux-button>
      <vux-button type="danger" @click="handleNoAll">反选</vux-button>
    </vux-space>
  </DemoPage>
</template>

<script>
import VuxCheckboxGroup from "@/packages/checkBoxGroup/src/index.vue";
import VuxCheckbox from "@/packages/checkBox/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxButton from "@/packages/button/src/index.vue";
import ArrowRight from "@/components/ArrowRight.vue";

export default {
  name: "checkBox",
  data() {
    return {
      checkValue: true,
      falseValue: false,

      groupVal: ["上海"],
      groupVal1: ["上海"],
      groupVal2: ["上海"]
    }
  },
  components: {ArrowRight, VuxButton, DemoBlock, DemoPage, VuxSpace, VuxCheckbox, VuxCheckboxGroup},
  methods: {
    handleAll() {
      this.$refs.group.toggleAll(true)
    },
    handleNoAll() {
      this.$refs.group.toggleAll()
    }
  }

}
</script>

<style scoped>
/*p{*/
/*  padding: 16px 0;*/
/*}*/
</style>
