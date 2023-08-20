<template>
  <div ref="itemRef">
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
    if (typeof this.cachePosition === 'function') {
      this.cachePosition(this.$refs.itemRef, this.index);
    }
  },
};
</script>
