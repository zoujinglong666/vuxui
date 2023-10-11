<template>
  <div :class="caleClass" @click="closeMaskHandle">
    <div v-show="curOpen" :class="[round?'round':'']" :style="{height:heightByStyle,width:widthStyle}"
         class="drawer-content">
      <div style="display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
  font-size: 16px;
 ">
        <p style="margin: 0 auto;
    max-width: 60%;">{{ title }}</p>
        <span v-if="closeable" class="close-icon"
              @click="handleClose"
        ><i class="iconfont icon-close"></i></span>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VuxDrawer",
  data() {
    return {
      curOpen: this.open,
    };
  },
  model: {
    prop: 'open',
    event: 'input'
  },
  props: {

    round: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
    },
    height: {
      type: [String, Number],

    },
    width: {
      type: [String, Number],
    },
    open: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
      validator(val) {
        return ['bottom', 'left', 'right', 'top'].includes(val);
      },
    },
    //是否显示
    showMark: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    title: String
  },
  computed: {

    caleClass() {
      return [

        this.curOpen && this.showMark ? 'drawer-mask' : '',
        this.placement,
        {
          'is-open': this.curOpen,
          'is-close': !this.curOpen
        }
      ]
    },

    heightByStyle() {
      if (['top', 'bottom'].includes(this.placement)) {
        if (parseInt(this.height) <= 100) {
          return this.height + '%'
        } else {
          return 'auto'
        }
      }

    },
    widthStyle() {
      if (['left', 'right'].includes(this.placement)) {
        if (parseInt(this.width) <= 100) {
          return this.width + '%'
        } else {
          return 'auto'
        }
      }

    },
  },

  watch: {
    open(val) {
      this.curOpen = val;
    },
    curOpen(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    handleClose() {
      //事件点击无效又可能是层级导致的
      this.curOpen = false;
    },

    closeMaskHandle(e) {
      if (e.target !== this.$el) {
        return;
      }
      if (!this.closeOnClickOverlay) {
        return;
      }
      this.handleClose();
    },


  },


};
</script>
<style lang="less" scoped>
.drawer-mask {
  //overflow: hidden;
  z-index: 9998 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 300ms, height 2ms;
  .drawer-content {
    position: absolute;
    height: 80%;
    background-color: #fff;
    transition: transform 300ms;
    .close-icon {
      z-index: 9;
      right: 0;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      padding: 0 8px;
    }
  }

  &.is-open {
    opacity: 1;
    height: 100%;
  }

  &.is-close {
    opacity: 0;
    height: 0;
    transition-delay: 300ms;
  }

  &.bottom {
    .drawer-content {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;


      &.round {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

    }

    &.is-open {


      .drawer-content {
        transform: translateY(0);
      }
    }

    &.is-close {


      .drawer-content {
        transform: translateY(100%);
      }
    }
  }

  &.top {
    z-index: -1;

    .drawer-content {
      top: 0;
      left: 0;
      right: 0;
      bottom: auto;

      &.round {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }

    }

    &.is-open {

      .drawer-content {
        transform: translateY(0);
      }
    }

    &.is-close {
      .drawer-content {
        transform: translateY(-100%);
      }
    }
  }

  &.left {
    .drawer-content {
      height: 100% !important;
      width: 80%;
      top: 0;
      left: 0;
      right: auto;
      bottom: 0;

      &.round {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

    }

    &.is-open {

      .drawer-content {
        transform: translateX(0);
      }
    }

    &.is-close {

      .drawer-content {
        transform: translateX(-100%);
      }
    }
  }

  &.right {
    .drawer-content {
      height: 100% !important;
      width: 80%;
      top: 0;
      left: auto;
      right: 0;
      bottom: 0;

      &.round {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }


    }

    &.is-open {

      .drawer-content {
        transform: translateX(0);
      }
    }
    &.is-close {
      .drawer-content {
        transform: translateX(100%);
      }
    }
  }
}
</style>

