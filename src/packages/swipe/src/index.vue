<template>

  <div class="vux_swipe">
    <div ref="swipeRef" :style="swipeStyle"
         class="vux-swipe_track"
         @touchcancel="endDrag"
         @touchend="endDrag"
         @touchmove="moveDrag"
         @touchstart="startDrag">
      <slot></slot>
    </div>
    <div>
      <slot name="indicator"></slot>
    </div>
  </div>


</template>

<script>
export default {
  name: "vuxSwipe",
  data() {
    return {
      timer: null,
      childrenCount: 0,
      offset: 0,
      startX: 0,
      activeIndex: this.initialSwipe,
      swiping: false
    }
  },
  model: {
    prop: 'initialSwipe'
  },
  props: {


    autoplayDuration: {
      type: [Number, String],
      default: 0.3

    },
    duration: {
      type: [Number, String],
      default: 1
    },
    initialSwipe: {
      type: [Number, String],
      default: 2
    },
    loop: {
      type: Boolean
    }, touchable: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String
    },
    vertical: Boolean,
    width: {
      type: [Number, String],
    }, height: {
      type: [Number, String],

    }


  },
  mounted() {
    this.childrenCount = this.$children.length;
    this.init(this.initialSwipe)
  },
  computed: {
    swipeStyle() {
      console.log(this.size)
      return {
        width: this.childrenCount * this.size + 'px',
        transform: `translateX(${-this.offset}px) `,
        transitionDuration: `${this.duration}s`
      }


    }
    ,
    computedWidth() {
      return this.width ? this.width : window.innerWidth
    },
    computedHeight() {
      return this.height ? this.height : window.innerWidth / 2
    }, size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },
    trackSize() {
      return this.childrenCount * this.size;
    },
    minOffset() {

    }


  },
  created() {

  },
  activated() {
    this.init(+this.initialSwipe)
  },
  watch: {
    initialSwipe(val) {
      this.activeIndex = val
    },
    activeIndex(val) {
      this.$emit('input', val)

    }
  },
  methods: {

    init(active) {
      this.clear();
      this.$nextTick(() => {
        if (this.$el) {
          this.activeIndex = active || +this.initialSwipe;
          this.offset = this.getOffset(active)
        }
      })
    },
    clear() {
      clearTimeout(this.timer)
    },
    getOffset(active) {


    },
    autoplay() {
      if (this.timer) {
        this.clear()
      }
      this.timer = setTimeout(() => {
        this.prev()
        this.autoplay();
      }, this.autoplayDuration)

    },
    next() {

    },
    prev() {
      this.initialSwipe++

    },
    endDrag() {
      // this.offset = 0;
    },
    moveDrag(event) {


      if (!this.swiping) return;

      let offset = event.touches[0].clientX - this.startX;
      console.log(offset)
      console.log(this.activeIndex, 'this.a')

    },
    startDrag(event) {
      if (!this.touchable) return;
      this.clear();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
      this.swiping = true;


    },
    correctPosition() {
      this.swiping = true;

      if (this.active <= -1) {
        this.move({pace: this.count});
      }

      if (this.active >= this.count) {
        this.move({pace: -this.count});
      }
    },
    move({pace = 0, offset = 0, emitChange}) {
      const {loop, childrenCount, activeIndex, trackSize, minOffset} = this;
      console.log(pace)
      if (childrenCount <= 1) {
        return;
      }

      const targetActive = this.getTargetActive(pace);
      const targetOffset = this.getTargetOffset(targetActive, offset);

      // auto move first and last swipe in loop mode
      if (loop) {
        if (children[0] && targetOffset !== minOffset) {
          const outRightBound = targetOffset < minOffset;
          children[0].offset = outRightBound ? trackSize : 0;
        }

        if (children[count - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          children[count - 1].offset = outLeftBound ? -trackSize : 0;
        }
      }

      this.active = targetActive;
      this.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        this.$emit('change', this.activeIndicator);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.vux_swipe {
  position: relative;
  overflow: hidden;
  user-select: none;

  .vux-swipe_track {
    display: flex;
    height: 100%;
  }


}
</style>
