<template>
  <div>
    <p>基本用法</p>
    <vux-checkbox v-model="checkValue">复选框</vux-checkbox>
    <p>方形</p>
    <vux-checkbox v-model="checkValue" shape="square">复选框</vux-checkbox>
    <p>禁用状态</p>
    <vux-space direction="vertical">
      <vux-checkbox v-model="falseValue" disabled>复选框</vux-checkbox>
      <vux-checkbox v-model="checkValue" disabled>复选框</vux-checkbox>
    </vux-space>
    <p>禁用文本点击</p>
    <vux-checkbox v-model="checkValue" labelDisabled>复选框</vux-checkbox>
    <p>复选框组</p>
    <vux-checkbox-group v-model="groupVal">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <p>水平排列</p>
    <vux-checkbox-group v-model="groupVal" direction="horizontal">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <p>限制最大可选数</p>
    <vux-checkbox-group v-model="groupVal1" :max="2">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <p>全选与反选</p>
    <vux-checkbox-group ref="group" v-model="groupVal2" :max="2">
      <vux-checkbox name="上海"></vux-checkbox>
      <vux-checkbox name="深圳"></vux-checkbox>
      <vux-checkbox name="北京"></vux-checkbox>
    </vux-checkbox-group>
    <vux-space style="margin-top: 16px">
      <vux-button type="primary" @click="handleAll">全选</vux-button>
      <vux-button type="danger" @click="handleNoAll">反选</vux-button>
    </vux-space>

  </div>
</template>

<script>
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
  components: {},
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
