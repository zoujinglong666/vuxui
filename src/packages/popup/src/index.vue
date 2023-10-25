<template>
  <div>
    <vux-overlay :overlay="overlay" :show="showCom" @click.native="handleClose"></vux-overlay>
    <transition :name="transitionName">
      <div v-if="showCom" ref="popupRef" :class="[position,round?'round':'']" :style="[popupStyle]"
           class="vux_popup">

        <div v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <slot></slot>
        <div v-if="$slots.footer" class="vux_popup-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>


</template>

<script>
import VuxOverlay from "@/packages/overlay/index.vue";

export default {
  name: "vuxPopup",
  components: {VuxOverlay},
  model: {
    prop: "show"
  },
  props: {
    show: {
      type: Boolean
    },
    overlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom',
      validator(val) {
        return ['bottom', 'left', 'right', 'top', 'center'].includes(val);
      },

    },
    duration: {
      type: Number,
      default: 0.3
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean
    },
    beforeClose: {
      type: Function,

    },
    round: {
      type: Boolean,
    },
    height: {
      type: [String, Number],

    },
    width: {
      type: [String, Number],
    },
    popupStyle: {
      type: Object
    }


  },
  mounted() {
    window.addEventListener("click", (e) => {
      this.clickOutElementClose(e)
    }, true);
  },
  computed: {
    showCom: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('input', val)
      }

    },
    transitionName() {
      return this.position === 'center' ? 'vux-fade' : `vux_popup-slide-${this.position}`
    },
    heightByStyle() {
      if (['top', 'bottom'].includes(this.position)) {
        if (+this.height <= 100) {
          return this.height + '%'
        } else {
          return 'auto'
        }
      }

    },
    widthStyle() {
      if (['left', 'right'].includes(this.position)) {
        if (+this.width <= 100) {
          return this.width + '%'
        } else {
          return 'auto'
        }
      }

    },
    overlayClass() {
      return `vux_overlay-slide-${this.position}`
    }
  },
  methods: {
    handleClose() {
      if (!this.closeOnClickOverlay) {
        return
      }
      this.showCom = false;

    },
    handleIconClose() {
      if (this.beforeClose && typeof this.beforeClose === 'function') {
        this.beforeClose(this.showCom)
      } else {
        this.handleClose()
      }
    },
    clickOutElementClose(e) {
      const rect = this.$refs.popupRef;
      if (!rect) {
        return
      }
      if (!rect.contains(e.target)) {
        this.showCom = false;
      }
    },

  },
  beforeDestroy() {


    window.removeEventListener('click', this.clickOutElementClose, true)
  }
}
</script>

<style lang="less" scoped>


.vux_popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background: #FFFFFF;
  transition: var(--vux-duration-fast);

  -webkit-overflow-scrolling: touch;
  z-index: 2001;

  &.bottom {
    bottom: 0;
    left: 0;
    width: 100%;

    &.round {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  &.top {
    top: 0;
    left: 0;
    width: 100%;

    &.round {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &.left {
    top: 0;
    left: 0;
    height: 100%;

    &.round {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &.right {
    top: 0;
    right: 0;
    height: 100%;

    &.round {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  &.center {
    top: 50%;
    left: 0;
    right: 0;
    width: fit-content;
    //min-width: calc(100% - (16px * 2));
    margin: 0 auto;
    transform: translateY(-50%);

    &.round {
      border-radius: 10px;
    }
  }


  &-slide-top-enter-active,
  &-slide-left-enter-active,
  &-slide-right-enter-active,
  &-slide-bottom-enter-active {
    transition-timing-function: ease-in-out;
  }

  &-slide-top-leave-active,
  &-slide-left-leave-active,
  &-slide-right-leave-active,
  &-slide-bottom-leave-active {
    transition-timing-function: ease-in-out;
  }

  &-slide-top-enter,
  &-slide-top-leave-active {
    transform: translate3d(0, -100%, 0);
  }

  &-slide-right-enter,
  &-slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  &-slide-bottom-enter,
  &-slide-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
  }

  &-slide-left-enter,
  &-slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }


}

</style>
