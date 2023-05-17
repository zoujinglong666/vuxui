<template>
  <div :style="heightStyle"
       class="vux_picker"
       @touchcancel="onTouchEnd"
       @touchend="onTouchEnd"
       @touchmove="onTouchMove"
       @touchstart="onTouchStart"
  >
    <ul ref="warpRef"
        :style="pickColumnStyle"
        class="vux_picker_warp"
        style="width: 100%">
      <li v-for="(item,index) in options" :style="itemHeightStyle(item,index)"
          class="vux_picker_item"
          @click="handlePickerItem(item,index)">
        <div :style="disabledStyle(item,index)" style="width: 100%;">
          {{ getOptionText(item) }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {clamp} from "@/packages/picker/utils";

let touchStartTime = 0;
let startOffset = 0;
let momentumOffset = 0
// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
const MOMENTUM_LIMIT_TIME = 300;
const DEFAULT_DURATION = 200;
const MOMENTUM_LIMIT_DISTANCE = 15;
export default {
  name: "PickerColumn",
  data() {
    return {
      offset: 0,
      duration: 0,
      index: this.defaultIndex,
      swiping: false,
      startY: 0,
      options: JSON.parse(JSON.stringify(this.columns))
    }
  },
  props: {
    columns: {
      type: [Array, Object]
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    allowHtml: {
      type: Boolean,
      default: false
    },
    defaultIndex: {
      type: [Number],
      default: 0
    },
    swipeDuration: {
      type: [Number],
      default: 1000
    },
    itemHeight: {
      type: [String, Number],
      default: 40
    },
    visibleItemCount: {
      type: [String, Number],
      default: 6
    },
    activeColor: {
      type: String, default: "#333"
    },
    inactiveColor: {
      type: String, default: "#999"
    },
    textKey: {
      type: String,
    }
  },
  watch: {
    defaultIndex(newVal) {
      this.setIndex(newVal)
    }
  },
  activated() {
    this.setIndex(this.index)
  },
  computed: {
    count() {
      return this.columns.length || 0
    },
    heightStyle() {
      return {
        height: this.itemHeight * this.visibleItemCount - 1 + 'px'
      }
    },
    disabledStyle() {
      return function (item, index) {
        if (item.disabled) {
          return {
            opacity: 0.6,
            cursor: `not-allowed`
          }
        }

      }
    },
    itemHeightStyle() {
      return function (item, index) {
        const {itemHeight, activeColor, inactiveColor} = this;
        return {
          height: itemHeight + 'px',
          lineHeight: itemHeight + 'px',
          color: this.index === index ? activeColor : inactiveColor,
          fontWeight: this.index === index ? 500 : 400,
        }
      }

    },
    baseOffset() {
      const {itemHeight, count} = this;
      return (itemHeight * (count - 1)) / 2
    },
    pickColumnStyle() {
      const {offset, duration, baseOffset} = this;
      return {
        transform: `translate3d(0, ${offset + baseOffset}px, 0)`,
        transitionDuration: `${duration}ms`,
        transitionProperty: duration ? 'all' : 'none',
      }
    },

  },
  mounted() {
    this.reset()
  },
  methods: {
    setOption(options) {
      if (JSON.stringify(options) !== JSON.stringify(this.options)) {
        this.options = JSON.parse(JSON.stringify(options));
        this.setIndex(this.defaultIndex);
      }

    },
    getValue() {
      const {options, index} = this;
      return options[index]
    },
    getIndex() {
      return this.index
    },
    setValue(val) {
      const options = this.options;
      for (let i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === val) {
          this.setIndex(i)
        }
      }
    },
    getOptionText(option) {
      const {textKey} = this;
      return option[textKey] ? option[textKey] : option
    },
    reset() {
      this.swiping = false;
      this.startY = 0;
      this.setIndex(this.index)
    },
    onTouchStart(e) {
      this.swiping = true;
      const {clientY} = e.targetTouches[0]
      this.startY = clientY;
      if (this.swiping) {
        const warpRef = this.$refs.warpRef;
        const translateY = this.getElementTranslateY(warpRef);
        this.offset = Math.min(0, translateY - this.baseOffset);
        startOffset = this.offset;
      } else {
        startOffset = this.offset;
      }
      this.duration = 0;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
    },
    onTouchMove(e) {
      if (!this.swiping) {
        return
      }

      const {clientY} = e.targetTouches[0]
      const deltaY = clientY - this.startY;
      this.offset = clamp(startOffset + deltaY, -(this.count * this.itemHeight), this.itemHeight);
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
        touchStartTime = now;
        momentumOffset = this.offset;
      }
    },
    onTouchEnd() {
      const distance = this.offset - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const allowMomentum =
          duration < MOMENTUM_LIMIT_TIME &&
          Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }
      let index = this.getOffsetByIndex(this.offset)
      this.duration = DEFAULT_DURATION;
      this.setIndex(index)
      this.swiping = false;
    },
    momentum(distance, duration) {
      const speed = Math.abs(distance / duration);
      console.log(speed, 'speed')
      distance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);
      const index = this.getOffsetByIndex(distance);
      this.duration = +this.swipeDuration;
      this.setIndex(index);
    },
    handlePickerItem(item, index) {
      if (item.disabled) {
        return;
      }
      if (this.index === index) {
        return
      }
      if (this.swiping) {
        this.swiping = false;
      }

      this.duration = +DEFAULT_DURATION
      this.setIndex(index);
    },
    setIndex(index) {
      index = this.adjustIndex(index) || 0;
      const offset = -(this.itemHeight * index);
      if (this.index !== index) {
        this.index = index;
      }
      this.offset = offset
      this.$emit('change', index)
    },
    adjustIndex(index) {
      const count = this.count;
      const options = this.options
      index = clamp(index, 0, count);
      console.log(index, 'clampIndex')
      const isOptionDisabled = (item) => {
        return item.disabled;
      };
      for (let i = index; i < count; i++) {
        if (!isOptionDisabled(options[i])) {
          return i;
        }
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(options[i])) {
          return i;
        }
      }
    },
    getElementTranslateY(element) {
      const {transform} = window.getComputedStyle(element);
      const translateY = transform.slice(7, transform.length - 1).split(', ')[5];
      return Number(translateY);
    },
    getOffsetByIndex(offset) {
      return clamp(Math.round(-offset / this.itemHeight), 0, this.count - 1)
    }
  }
}
</script>

<style lang="less" scoped>


* {
  margin: 0;
  padding: 0;
}

li {
  text-align: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.vux_picker {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border: 1px solid #F2F6FC;
    border-left: 0;
    border-right: 0;
    transform: translateY(-50%);
  }

  &_warp {
    width: 100%;
  }
}

</style>