<template>
  <div :class="caleClass" @click="closeMaskHandle">
    <div v-show="curOpen" :class="[round?'round':'']" :style="{height:heightByStyle,width:widthStyle}"
         class="drawer-content">
        <span v-if="closable" class="close-icon"
              @click="handleClose"
        ><i class="iconfont icon-close"></i></span>
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
    closable: {
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
    }
  },
  computed: {

    caleClass() {
      return [
        this.showMark ? 'drawer-mask' : '',
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
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 防止出现滚动 穿透*/
//.prevent-touch-move {
//  position: fixed;
//  overflow: hidden;
//  width: 100%;
//  height: 100%;
//  top: 0;
//  left: 0;
//}

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
      z-index: 9999;
      margin-top: 6px;
      font-size: 16px;
      position: absolute;
      right: 20px;
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

