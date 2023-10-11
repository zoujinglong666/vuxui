<template>
  <i
      :class="className"
      class="spt-key spt-hairline"
      @mousemove="onBlur"
      @mouseup="onBlur"
      @touchcancel="onBlur"
      @touchend="onBlur"
      @touchmove="onBlur"
      v-text="text"
      @touchstart.stop.prevent="onFocus"
      @mousedown.stop.prevent="onFocus"
  />
</template>

<script>
export default {
  name: 'vux-key',
  props: {
    text: [String, Number],
    type: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    className() {
      const types = this.type.slice(0);
      if (this.active) {
        types.push('active');
      }
      return types.map((type) => `spt-key-${type}`);
    },
  },
  methods: {
    onFocus() {
      this.active = true;
      this.$emit('press', this.text);
    },
    onBlur() {
      this.active = false;
    },
  },
};
</script>

