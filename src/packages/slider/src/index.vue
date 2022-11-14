<template>
  <!--  区间选择器-->
  <div class="vux-range">
    <div class="vux-range-box">
      <p v-if="!valueRangeShow">{{ value[0] }}</p>
      <div ref="slider" class="vux-range-base"
           @click="handleClickSlider($event)">
        <div id="sliderMinBtn"
             ref="sliderMinBtn"
             v-touch:swipeleft="leftSlide"
             v-touch:swiperight="rightSlide"
             :class="[getFarLeftAndRightStyle('min')]"
             :style="{left:initialLeftValueByStyle,borderColor:sliderColor}"
             class="vux-range-sliderMinBtn"
             @click="handleClickSliderBtn">
          <p>{{ min }}</p>
        </div>
        <div
            v-if="rangeAndStep"
            id="sliderMaxBtn"
            ref="sliderMaxBtn"
            v-touch:swipeleft="leftSlideDouble"
            v-touch:swiperight="rightSlideDouble"
            :class="[getFarLeftAndRightStyle('max')]"
            :style="{left:initialSlidingOffsetDouble,borderColor:sliderColor}"
            class="vux-range-sliderMinBtn"
            @click="handleClickSliderBtn">
          <p>{{ max }}</p>
        </div>
        <!--        断点-->
        <div
            v-for="(item, key) in stops"
            v-if="showStops"
            :key="key"
            :style="getStopStyle(item)"
            class="vux-range-stops"
        >
        </div>
        <div v-if="type!=='range'"
             :class="[disabled?'disabled':'']"
             :style="{width: initialWidthValueByStyle,background:sliderColor}"
             class="vux-range-inner"
        ></div>
        <div v-if="rangeAndStep"
             :class="[disabled?'disabled':'']"
             :style="{width: getSliderByWidthStyle,
             left:getSliderByLeftStyle,
             background:sliderColor,
             }"
             class="vux-range-inner">
        </div>
      </div>
      <p v-if="!valueRangeShow">{{ value[1] }}</p>
    </div>
  </div>

</template>

<script>
//单头  步长   范围(双头)
const types = ["single", "step", 'range'];
export default {
  name: "VuxSlider",
  data() {
    return {
      isMinDrag: false,
      isMaxDrag: false,
      //滑动条长度
      sliderWidth: 0,
      magnification: 1,
      min: this.value[0],
      max: this.value[1]
    }
  },

  props: {
    //取整
    toFixed: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'single',
      validator(val) {
        return types.includes(val);
      },
    },
    //双滑块

    valueRangeShow: {
      type: Boolean,
      default: true
    },

    value: {
      type: Array,
      default: () => [0, 100],
    },
    //只有单个
    //todo
    sliderColor: {
      type: String,
      default: '#0068ff'
    },
    disabled: {
      type: Boolean
    },
    //指定步长 滑一下10 -10

    stepSize: {
      type: Number,
      default: 10,
      validator(val) {
        return Number(val) > 0 && Number(val) <= 100;
      },
    },
    showStops: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rangeAndStep() {
      return ['range', 'step'].includes(this.type)
    },
    stepSlider() {
      return this.type === 'step'
    },
    rangeSlider() {
      return this.type === 'range'
    },
    //获取节点
    stops() {
      if (this.stepSlider && this.showStops) {
        const stopsLength = Math.ceil(this.value[1] - this.value[0]) / this.stepSize;
        let res = []
        for (let i = 1; i < stopsLength; i++) {
          res.push(i * this.stepSize * this.magnification)
        }
        return res
      }
    },
    getSliderByWidthStyle() {
      let width = Math.abs(Number(this.max - this.min)) !== this.value[0] ? Math.abs(Number(this.max - this.min)) : 0;
      if (width >= 100) {
        return '100%'
      } else if (width <= 0) {
        return `0%`
      } else {
        if (width * this.magnification > 100) {
          return width * this.magnification - 100 + '%'
        } else {
          return width * this.magnification + '%'
        }
      }

      //目前仅支持正整数
      //todo
    },
    getSliderByLeftStyle() {

      let left = Number(this.max) < Number(this.min) ? this.max : this.min;
      if (left > 100) {
        return '100%'
      } else if (left < 0) {
        return `0%`
      } else {
        return left * this.magnification + '%'

      }
    },
    initialLeftValueByStyle() {
      if (parseInt(this.min) >= 0) {
        if (this.min * this.magnification >= 100) {
          return '100%'
        } else {
          return this.min * this.magnification + '%'
        }
      }
      return `0%`


    },
    initialWidthValueByStyle() {

      if (parseInt(this.min) >= 0) {
        if (this.min * this.magnification >= 100) {
          return '100%'
        } else {
          if (this.type === 'step') {
            return `0%`
          } else {
            return this.min * this.magnification + '%'
          }
        }
      }
      return `0%`


    },
    initialSlidingOffsetDouble() {
      if (parseInt(this.max) >= 0) {
        if (this.max * this.magnification >= 100) {
          return '100%'
        } else {
          return this.max * this.magnification + '%'
        }
      }
      return `0%`
    },

  },
  mounted() {
    if (this.value.some(item => item < 0)) {
      this.magnification = Number(100 / Math.abs(this.value[1])) || 1;
    } else {
      this.magnification = Number(100 / Math.abs(this.value[1] - this.value[0])) || 1;

    }
    this.init()
  },

  methods: {
    getStopStyle(position) {
      return {'left': position + '%'};
    },
    getFarLeftAndRightStyle(type) {
      if (this[type] === this.value[0]) {
        return 'farLeft'
      }
      if (this[type] === this.value[1]) {
        return 'farRight'
      }
    },
    init() {
      // //模拟移动端事件
      const sliderMinBtn = this.$refs.sliderMinBtn;
      if (this.disabled) return
      sliderMinBtn.addEventListener("touchmove", this.handleMouseMovement); //鼠标移动事件
      sliderMinBtn.addEventListener("touchstart", this.handleMouseDown); //鼠标按下事件 开始触摸
      sliderMinBtn.addEventListener("touchend", this.handleMouseUp); //鼠标抬起事件 停止触摸
      if (this.type === 'range') {
        if (this.disabled) return
        const sliderMaxBtn = this.$refs.sliderMaxBtn;
        sliderMaxBtn.addEventListener("touchmove", this.handleMouseMovementByMax); //鼠标移动事件
        sliderMaxBtn.addEventListener("touchstart", this.handleMouseDownByTwo); //鼠标按下事件 开始触摸
        sliderMaxBtn.addEventListener("touchend", this.handleMouseUpByTwo); //鼠标抬起事件 停止触摸
      }

    },
    //阻止默认行为
    handleClickSliderBtn(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    clickToGetPercentage(offsetElement, event) {
      this.sliderWidth = this.$refs.slider.offsetWidth;
      this[offsetElement] = ((event.clientX * 100 / this.sliderWidth).toFixed(0) / this.magnification).toFixed(0);
      this.compareSize(offsetElement)
    },
    handleClickSlider(e) {
      if (this.disabled || this.type === 'step') {
        return
      }
      //没有启动双滑块直接点击
      if (!this.rangeSlider) {
        this.clickToGetPercentage('min', e)
      }
      let distance = (event.clientX * 100 / this.sliderWidth).toFixed(0);
      if (Math.abs(distance - this.min) < Math.abs(distance - this.max)) {
        this.clickToGetPercentage('min', e)
      } else {
        this.clickToGetPercentage('max', e)
      }
    },
    handleMouseMovement(e) {
      if (!this.isMinDrag) {
        return
      }
      if (this.type === 'step') {
        this.calculateStepPercentage("min", e)
        return;
      }
      this.countCurPercent('min', e)
      this.changeValueByMaxSlider();
      this.handleEmit(this.min)

    },
    handleEmit(data) {
      this.$emit('change', data)
    },
    handleMouseMovementByMax(e) {
      if (!this.rangeSlider) {
        return;
      }
      this.countCurPercent('max', e)
      this.changeValueByMaxSlider()
    },
    //todo,不满足负数滑动
    countCurPercent(offsetElement, event) {

      console.log(offsetElement)
      if (event.type !== 'touchmove') {
        return;
      }
      const sliderWidth = this.$refs.slider.offsetWidth;
      const sliderBtnWidth = this.$refs.sliderMinBtn.offsetWidth;
      if (event.changedTouches[0].pageX - sliderBtnWidth <= sliderWidth) {
        this[offsetElement] = Math.floor(((event.changedTouches[0].pageX - sliderBtnWidth) * 100 / sliderWidth).toFixed(0) / this.magnification);

      }
      if (event.changedTouches[0].pageX - sliderBtnWidth > sliderWidth) {
        this[offsetElement] = this.value[1];
      }
      if (event.changedTouches[0].pageX - sliderBtnWidth < this.value[0]) {
        this[offsetElement] = this.value[0];
      }

    },
    // 步长

    calculateStepPercentage(offsetElement, event) {
      if (event.type !== 'touchmove') {
        return;
      }
      this.compareSize(offsetElement)

    },
    compareSize(offsetElement) {
      if (this[offsetElement] > this.value[1]) {
        this[offsetElement] = this.value[1]
      }
      if (this[offsetElement] < this.value[0]) {
        this[offsetElement] = this.value[0]
      }
    },
    leftSlide() {
      console.log('left')
      if (!this.stepSlider) {
        return
      }
      if (this.min <= this.value[1] && Number(this.min) > 0) {
        this.min -= Number(this.stepSize);
        this.isMinDrag = false
      }
    },
    rightSlide() {
      if (!this.stepSlider) {
        return
      }
      if (Number(this.min) < this.value[1]) {
        this.min += Number(this.stepSize);
        this.isMinDrag = false
      }
    },
    leftSlideDouble() {
      if (!this.stepSlider) {
        return
      }
      if (this.max <= this.value[1] && Number(this.max) > 0) {
        this.max -= Number(this.stepSize);
        this.isMaxDrag = false
      }
    },
    rightSlideDouble() {
      if (!this.stepSlider) {
        return
      }
      if (Number(this.max) < this.value[1]) {
        this.max += Number(this.stepSize);
        this.isMaxDrag = false
      }
    },
    handleMouseDown() {
      this.isMinDrag = true;
    },
    handleMouseUp() {
      this.isMinDrag = false;
    }
    ,
    handleMouseDownByTwo() {
      this.isMaxDrag = true;
    },
    handleMouseUpByTwo() {
      this.isMaxDrag = false;
    },
    changeValueByMaxSlider() {
      if (this.type === 'range') {
        const rangeList = [this.min, this.max].sort((a, b) => {
          return a - b;
        }).map(item => Number(item))
        this.handleEmit(rangeList)
      }
    }
  }
  ,
  beforeDestroy() {
    const sliderMinBtn = this.$refs.sliderMinBtn;
    sliderMinBtn.removeEventListener("touchmove", this.handleMouseMovement); //鼠标移动事件
    sliderMinBtn.removeEventListener("touchstart", this.handleMouseDown); //鼠标按下事件 开始触摸
    sliderMinBtn.removeEventListener("touchend", this.handleMouseUp); //鼠标抬起事件 停止触摸
    if (this.type === 'range') {
      const sliderMaxBtn = this.$refs.sliderMaxBtn;
      sliderMaxBtn.removeEventListener("touchmove", this.handleMouseMovement); //鼠标移动事件
      sliderMaxBtn.removeEventListener("touchstart", this.handleMouseDown); //鼠标按下事件 开始触摸
      sliderMaxBtn.removeEventListener("touchend", this.handleMouseUp); //鼠标抬起事件 停止触摸
    }
  }
}
</script>

<style lang="less" scoped>
* {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vux-range {
  margin-top: 40px;
  padding: 0 10px;

  .vux-range-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      padding: 4px;
      font-size: 12px
    }

    .vux-range-base {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      height: 6px;
      border-radius: 12px;
      background-color: #e4e7ed;
      cursor: pointer;
    }

    .vux-range-inner {
      position: absolute;
      height: 6px;
      border-radius: 12px;
      cursor: pointer;

    }

    .vux-range-stops {
      position: absolute;
      height: 6px;
      width: 6px;
      border-radius: 100%;
      background-color: #ffffff;
      transform: translate(-50%);
    }

    .vux-range-sliderMinBtn {
      z-index: 99;
      position: absolute;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
      right: 0;
      transform: translate(-50%);

      &.farLeft {
        transform: translate(0) !important;
      }

      &.farRight {
        transform: translate(-100%) !important;
      }

      p {
        min-width: 16px;
        text-align: center;
        background: #303133;
        color: #fff;
        padding: 2px;
        border-radius: 4px;
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      }
    }
  }

  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }
}


</style>
