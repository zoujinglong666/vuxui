<template>
  <div ref="itemRef" style="height: auto;">
    <slot :item="item"/>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    index: Number,
    item: Object,
    cachePosition: Function,
  },
  mounted() {
    if (this.cachePosition) {
      this.cachePosition(this.$refs.itemRef, this.index);
    }
  },
};
</script>
