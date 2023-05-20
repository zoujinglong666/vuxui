<template>
  <div :style="swipeItemStyle" class="vux-swipe_item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuxSwipeItem",
  data() {
    return {}
  },
  computed: {
    swipeItemStyle() {


      const width = this.$parent.computedWidth;
      return {
        width: width + 'px',
        height: width / 2 + 'px',
        lineHeight: width / 2 + 'px'
      }
    }
  },

}
</script>

<style lang="less" scoped>

.vux-swipe_item {
  text-align: center;
  background-color: #409eff;
  color: #FFFFFF;
}
</style>
