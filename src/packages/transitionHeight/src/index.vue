<template>
  <div ref="transitionWrap" class="transitionWrap">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: 'transitionHeight',
  props: {
    show: Boolean,
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.initHeight()
  },

  methods: {
    initHeight() {
      this.$nextTick(() => {
        this.height = this.$refs.transitionWrap.offsetHeight;
        this.$refs.transitionWrap.style.height = this.show
            ? `${this.height}px`
            : 0;
      });
    }
  },
  watch: {
    show(newVal) {
      this.$refs.transitionWrap.style.height = newVal ? `${this.height}px` : 0;
    },
  },
};
</script>

<style scoped>
.transitionWrap {
  transition: height var(--vux-duration-base) ease-in-out;
  overflow: hidden;
}
</style>

