<template>
  <div>
    <vux-button round size="medium" type="primary">
      搜索
    </vux-button>
    <vux-avatar type="text">111111111111</vux-avatar>
    <vux-tag>1111</vux-tag>
    <vux-switch v-model="value"></vux-switch>
    <vux-collapse accordion>
      <vux-collapse-item name="1" title="1111111111111111111111">1111111111111111111111111111111</vux-collapse-item>
      <vux-collapse-item name="2" title="1111111111111111111111">1111111111111111111111111111111</vux-collapse-item>
      <vux-collapse-item name="3" title="1111111111111111111111">1111111111111111111111111111111</vux-collapse-item>
      <vux-collapse-item name="4" title="1111111111111111111111">1111111111111111111111111111111</vux-collapse-item>
    </vux-collapse>
    <vux-calendar v-model="value" type="range"></vux-calendar>
    <vux-canvas></vux-canvas>
    <vuxDataCheckBox v-model="value1" :list="['天','包','次']" color="danger" theme="light"></vuxDataCheckBox>
    <vuxDataCheckBox v-model="value1" :list="['天','包','次']" theme="light"></vuxDataCheckBox>
    <vuxDataCheckBox v-model="value1" :list="['天','包','次']" theme="light"></vuxDataCheckBox>
    <vuxDataCheckBox v-model="value1" :list="['天','包','次']" theme="light"></vuxDataCheckBox>
    <vuxDataCheckBox v-model="value1" :list="['天','包','次']" theme="light"></vuxDataCheckBox>

    <vux-dialog v-model="value"></vux-dialog>
    <vuxNoticeBar content="你好你好你好你好你好"></vuxNoticeBar>
    <vux-range></vux-range>
  </div>

</template>

<script>


import VuxDialog from "./packages/dialog/src";

export default {
  components: {VuxDialog},
  data() {
    return {
      value: false,
      value1: '天'
    }
  }


}
</script>