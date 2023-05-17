<template>

  <transition :name="overlayClass"
  >
    <div v-show="showCom" class="vux_overlay" @click="close">
      <slot></slot>
    </div>
  </transition>

</template>

<script>
export default {
  name: "vuxOverlay",

//   show	是否展示遮罩层	boolean	false
//   z-index	z-index 层级	number | string	1
//   duration	动画时长，单位秒，设置为 0 可以禁用动画	number | string	0.3
// lock-scroll	是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动	boolean	true
  props: {

    show: {
      type: Boolean,

    },
    zIndex: 1,

    duration: {
      type: Number,
      default: 0.3
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

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }


}

</style>