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

        console.log(
            this.height, 'this.height'
        )
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
  transition: height 0.2s linear;
  overflow: hidden;
}
</style>

