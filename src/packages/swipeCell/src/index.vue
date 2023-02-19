<template>
  <div
      v-clickoutside:touchstart="swipeMove"
      class="swipe-cell"
      @click="onClick('cell')"
      @touchcancel="endDrag"
      @touchend="endDrag"
      @touchmove="onDrag"
      @touchstart="startDrag"
  >
    <div :style="wrapperStyle" class="swipe-cell_wrapper" @transitionend="swipe = false">
      <div v-if="leftWidth" class="swipe-cell_left" @click="onClick('left')">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div v-if="rightWidth" class="swipe-cell_right" @click="onClick('left')">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'VuxSwipeCell',
  props: {
    onClose: Function,
    leftWidth: {
      type: Number,
      default: 0,
    },
    rightWidth: {
      type: Number,
      default: 0,
    },
    disabled: Boolean,
  },

  data() {
    return {
      offset: 0,
      dragging: false,
      THRESHOLD: 0.5,
    };
  },
  computed: {
    wrapperStyle() {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transitionDuration: this.dragging ? '0s' : '.6s',
      };
    },
    computedLeftWidth() {
      return this.leftWidth;
    },
    computedRightWidth() {
      return this.rightWidth;
    },
  },
  methods: {
    startDrag(event) {
      if (this.disabled) {
        return;
      }
      this.dragging = true;
      this.startOffset = this.offset;
      this.touchStart(event);
    },
    touchStart(event) {
      this.resetTouchStatus();
      if (this.disabled) {
        return;
      }
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    onDrag(event) {
      if (this.disabled) {
        return;
      }
      this.touchMove(event);
      if (this.direction === 'horizontal') {
        const shouldPrevent = !this.opened;
        if (shouldPrevent) {
          event.preventDefault();
        }
        this.swipeMove(this.deltaX + this.startOffset);
      }
    },
    touchMove(event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
    },
    getDirection(x, y) {
      if (x > y && x > 10) {
        return 'horizontal';
      }
      if (y > x && y > 10) {
        return 'vertical';
      }
      return '';
    },
    endDrag() {
      if (this.disabled) {
        return;
      }
      this.dragging = false;
      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? 'left' : 'right');
      }
    },
    open(position) {
      const offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.swipeMove(offset);
      this.resetSwipeStatus();
    },
    resetSwipeStatus() {
      this.swiping = false; // 是否正在拖动
      this.opened = true; // 记录是否滑动左右
    },
    close() {
      this.offset = 0;
    },
    swipeMove(offset = 0) {
      this.offset = Math.min(Math.max(offset, -this.computedRightWidth), this.computedLeftWidth);
      console.log(this.offset, '1111111111111111')
      if (this.offset) {
        this.swiping = true;
      } else {
        this.opened = false;
      }
    },
    swipeLeaveTransition(direction) {
      const {offset, computedLeftWidth, computedRightWidth, THRESHOLD} = this;
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      if (
          direction === 'right' &&
          -offset > computedRightWidth * threshold &&
          computedRightWidth > 0
      ) {
        this.open('right');
      } else if (
          direction === 'left' &&
          offset > computedLeftWidth * threshold &&
          computedLeftWidth > 0
      ) {
        this.open('left');
      } else {
        this.swipeMove(0);
      }
    },
    onClick(position = 'outside') {
      if (!this.offset) {
        return;
      }
      if (this.onClose) {
        this.onClose(position);
      } else {
        this.swipeMove(0);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.swipe-cell {
  overflow: hidden;
  position: relative;
  touch-action: none;

  &_left,
  &_right {
    top: 0;
    height: 100%;
    position: absolute;

    .spt-button {
      float: right;
    }

    .spt-button + .spt-button {
      margin: 0;
    }
  }

  &_right {
    right: 0;
    transform: translate3d(100%, 0, 0);

    .spt-button {
      float: left;
    }
  }

  &_left {
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }

  &_wrapper,
  &_left,
  &_right {
    -webkit-transition: -webkit-transform 0.15s ease-in-out;
    transition: -webkit-transform 0.15s ease-in-out;
    transition: transform 0.15s ease-in-out;
    transition: transform 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;
  }
}

</style>
