<template>

  <div>
    <vux-tabs v-model="activeIndex">
      <vux-tab title="尤">
        尤雨溪我爱你1
      </vux-tab>
      <vux-tab title="雨">
        尤雨溪我爱你2
      </vux-tab>
      <vux-tab title="溪">
        尤雨溪我爱你3
      </vux-tab>
      <vux-tab title="我">
        尤雨溪我爱你4
      </vux-tab>
      <vux-tab title="爱">
        尤雨溪我爱你5
      </vux-tab>
      <vux-tab title="你">
        尤雨溪我爱你6
      </vux-tab>
    </vux-tabs>

  </div>

</template>

<script>

export default {
  name: "Tab",
  data() {
    return {activeIndex: 0, value: "",}
  },
  methods: {},

}
</script>

<style lang="less" scoped>
.list {
  position: relative;
  height: 100%;

  .button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
  }
}

</style>
