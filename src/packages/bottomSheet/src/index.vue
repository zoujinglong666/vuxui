<template>
  <div>
    <vux-overlay :show="calcShow" @click.native="handleClose"></vux-overlay>
    <transition :name="transitionName">
      <div v-show="calcShow"
           @touchcancel="endDrag"
           @touchend="endDrag"
           @touchmove="moveDrag"
           @touchstart="startDrag"
           :class="['bottom',round?'round':'']"
           :style="[offsetStyle]"
           class="vux_bottom-sheet">
        <div @touchcancel="endDrag"
             @touchmove="moveDrag"
             @touchend="endDrag"
             @touchstart="startDrag">
          <slot name="header">
            <div class="drag-header">
              <div class="drag-header-bar">
              </div>
            </div>
          </slot>
        </div>
        <div class="vux_bottom-sheet-content">
          <slot></slot>

        </div>
        <div v-if="$slots.footer" class="vux_popup-footer">
          <slot name="footer">
            <!--            <vux-button block type="primary" radius="0"> 搜索</vux-button>-->
          </slot>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import VuxOverlay from "@/packages/overlay/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

const isDef = (val) =>
    val !== undefined && val !== null;
const isNumeric = (val) =>
    typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);

const addUnit = (value, unit = 'px') => {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}${unit}` : String(value);
  }
  return undefined;

}

const DAMP = 0.2
const MINI_BOTTOM_DISTANCE = 1;

export default {
  name: "vuxBottomSheet",
  components: {VuxButton, VuxOverlay},
  props: {
    anchors: {
      type: Array,
      default: () => {
        return [20, 30, 50, 70, 90]
      }

    },
    show: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
    },
    round: {
      type: Boolean,
    },
    title: {
      type: [String, Number]
    },
    titleAlign: {
      type: String,
      default: 'left'
    },
    showBackIcon: {
      type: Boolean,
      default: false
    },

    duration: {
      type: Number,
      default: 500
    },
    closeHeight: {
      type: Number,
      default: 10
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },


  },

  mounted() {
    window.addEventListener('resize', this.getScreenHeight, false)
    this.$on('hooks:beforeDestroy', () => {
      window.removeEventListener('resize', this.getScreenHeight, false)
    })
    this.getScreenHeight();


  },
  computed: {
    transitionName() {
      return `vux_bottom-sheet-slide-bottom`
    },
    offsetStyle() {
      return {
        height: addUnit(this.maxHeight, 'px'),
        transform: `translateY(calc(100% + ${addUnit(-this.calcHeight)}))`,
        transition: !this.draging ? `transform ${this.duration}ms` : `none`,
      }
    },


    calcShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }

    },
    boundary() {


      return {
        min: this.anchors[0] || 10,
        max:
            this.anchors[this.anchors.length - 1] ||
            Math.round(this.screenHeight * 0.9),
      }

    },
    calcHeight: {
      get() {
        return this.height
      },
      set(val) {
        this.$emit('update:height', val)
      }
    },
    maxHeight() {
      return Math.round(this.boundary.max / 100 * this.screenHeight)
    },
    minHeight() {
      return Math.round(this.boundary.min / 100 * this.screenHeight)
    },

    percentageToPX() {
      return this.anchors.map(item => {
        return Math.round(item / 100 * this.screenHeight)
      });
    },


  },

  data() {
    return {
      startY: 0,
      initHeight: 0,
      deltaY: 0,
      draging: false,
      screenHeight: 0

    }

  },
  methods: {
    getScreenHeight() {
      this.screenHeight = window.innerHeight || 667;
    },

    handleClose() {
      if (!this.closeOnClickOverlay || this.draging) {
        return
      }
      this.calcShow = false;

    },


    startDrag(event) {
      this.reset()
      const touch = event.touches[0];
      this.draging = true;
      this.startY = touch.clientY;
      this.initHeight = -this.height;
    },
    moveDrag(e) {
      if (!this.draging) return;
      const touch = e.touches[0];
      this.deltaY = touch.clientY - this.startY;
      const moveY = this.deltaY + this.initHeight;
      if (Math.abs(this.calcHeight) < MINI_BOTTOM_DISTANCE) {
        this.$emit('update:show', false)
        this.$emit('update:height', Math.abs(this.minHeight))
        return;
      }


      this.calcHeight = -this.ease(moveY)

    },

    reset() {
      this.draging = false
      this.startY = 0;
      this.initHeight = 0;
      this.deltaY = 0;
    },
    endDrag(e) {
      this.reset()
      this.calcHeight = this.closest(this.percentageToPX, this.calcHeight);

    },
    ease(moveY) {
      let absDistance = Math.abs(moveY);
      if (absDistance > this.maxHeight) {

        absDistance = this.maxHeight
        return;
      }
      if (absDistance > this.maxHeight) {
        return -(this.maxHeight + (absDistance - this.maxHeight));
      }
      if (absDistance < this.minHeight) {
        return -(this.minHeight - (this.minHeight - absDistance));
      }
      return moveY;
    },

    closest(arr, target) {
      return arr.reduce((pre, cur) =>

          Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur,
      );
    },


  }
}

</script>
<style lang="less" scoped>

.vux_bottom-sheet {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background: #FFFFFF;
  transition: transform 0.3s linear;
  -webkit-overflow-scrolling: touch;
  touch-action: none;
  left: 0;
  bottom: 0;
  z-index: 2001;
  display: flex;
  flex-direction: column;


  .vux_bottom-sheet-content {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }


  .drag-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;


    .drag-header-bar {
      width: 40px;
      height: 4px;
      border-radius: 4px;
      background: #e6e6e6;
    }


  }


  &.bottom {
    bottom: 0;
    left: 0;
    width: 100%;

    &.round {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }


  &-slide-bottom-enter-active {
    transition-timing-function: ease-in-out;
  }


  &-slide-bottom-leave-active {
    transition-timing-function: ease-in-out;
  }


  &-slide-bottom-enter,
  &-slide-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
  }


}
</style>
