<template>
  <transition appear name="vux-fade"
  >
    <div v-show="showCom&&overlay" class="vux_overlay" @click="close">
      <slot></slot>
    </div>
  </transition>

</template>

<script>
export default {
  name: "vuxOverlay",
  props: {
    show: {
      type: Boolean,

    },
    zIndex: 1,

    duration: {
      type: Number,
      default: 0.3
    },
    overlay: {
      type: Boolean,
      default: true
    },

  },
  computed: {
    overlayClass() {
      return `vux_overlay`
    },
    showCom: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit("update:show", val)
      }

    }
  },
  methods: {
    close(e) {
      this.showCom = false;
      this.$emit('click', e)

    }
  }
}
</script>

<style lang="less" scoped>

.vux_overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

</style>
