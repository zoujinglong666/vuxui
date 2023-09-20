<template>
  <div>
    <p>
      基本用法
    </p>

    <vux-radio-group v-model="value">
      <vux-radio name="1">1</vux-radio>
      <vux-radio name="2">2</vux-radio>
      <vux-radio name="3">3</vux-radio>
    </vux-radio-group>

    <p>水平排列</p>
    <vux-radio-group v-model="value" direction="horizontal">
      <vux-radio name="1">1</vux-radio>
      <vux-radio name="2">2</vux-radio>
      <vux-radio name="3">3</vux-radio>
    </vux-radio-group>
    <p>不同形状</p>
    <vux-radio-group v-model="value">
      <vux-radio name="1" shape="square">1</vux-radio>
      <vux-radio name="2" shape="square">2</vux-radio>
      <vux-radio name="3" shape="square">3</vux-radio>
    </vux-radio-group>
  </div>

</template>

<script>
import VuxRadioGroup from "@/packages/radioGroup/src";
import VuxRadio from "@/packages/radio/src/index.vue";

export default {
  name: "Radio",
  components: {VuxRadio, VuxRadioGroup},
  data() {
    return {
      value: '1'
    }
  }

}
</script>

<style scoped>

</style>
