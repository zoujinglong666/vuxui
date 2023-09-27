<template>
  <!--  传数组就是渐变进度条   传字符就是单色进度条-->
  <div class="vux-circle-warp">
    <svg :height="size"
         :style="svgStyle"
         :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
         :width="size">
      <defs>
        <!--        这里的原理类似ps剪贴蒙版-->
        <!--        d属性用来定义路径数据-->
        <!--        stroke：描边颜色-->
        <!--        stroke-width:描边宽度-->
        <!--        fill：填充颜色-->
        <!--        stroke-dasharray:间隔多少像素绘制一次-->
        <!--        stroke-dashoffset:每次绘制偏离多少，必须配合stroke-dasharray使用-->
        <linearGradient :id="id" x1="100%" x2="0%" y1="0%" y2="0%">
          <stop v-for="(item,index) in color"
                :key="index" :offset="`${index*100}%`"
                :stop-color="item"></stop>
        </linearGradient>
      </defs>
      <path ref="basePathRef"
            :d="getPath"
            :style="basePathStyle"
      >
      </path>
      <path ref="innerPathRef"
            :d="getPath"
            :style="innerPathStyle"
      ></path>
    </svg>
    <div class="vux-circle-text">
      <span v-if="$slots.default">
          <slot>{{ text ? text : '' }}
    </slot>
      </span>
      <span v-if="describe">{{ describe }}</span>
    </div>
  </div>

</template>

<script>
let uuid = 0;
const addUnit = (val, unit = 'px') => {
  return Number(val) + unit
}
export default {
  name: "vuxCircleProgress",

//   参数	说明	类型	默认值
//   v-model:current-rate	当前进度	number	-
// rate	目标进度	number | string	100
// size	圆环直径，默认单位为 px	number | string	100px
// color	进度条颜色，传入对象格式可以定义渐变色	string | object	#1989fa
// layer-color	轨道颜色	string	white
// fill	填充颜色	string	none
// speed	动画速度（单位为 rate/s）	number | string	0
// text	文字	string	-
// stroke-width	进度条宽度	number | string	40
// stroke-linecap	进度条端点的形状，可选值为 square butt	string	round
// clockwise	是否顺时针增加	boolean	true
// start-position v3.2.1	进度起始位置，可选值为 left、right、bottom
  props: {
    size: {
      type: [Number, String],
      default: 100,
    },
    text: {
      type: [Number, String],
    },
    rate: {
      type: [Number, String],
      default: 100,
    },
    value: {
      type: [Number, String],
      default: 40,
    },
    color: {
      type: [Array, String],
      default: () => {
        return ['#1989fa', '#1989fa']
      }
    },
    fill: {
      type: String,
      default: 'none'
    },
    layerColor: {
      type: String,
      default: '#eee'
    },
    strokeWidth: {
      type: [Number, String],
      default: 40,
    },
    describe: {
      type: [Number, String],
    },
    strokeLinecap: {
      type: String,
      default: "round",
      validator(val) {
        return ['round', 'square', 'butt'].includes(val);
      },


    },
    startPosition: {
      type: String,
      default: "top",
      validator(val) {
        return ['top', 'left', 'right', 'bottom'].includes(val);
      },
    }

  },
  computed: {
    speedVal() {

      return this.value / 100
    },
    id() {
      return 'vux_circle_' + uuid++
    },
    viewBoxSize() {
      return this.strokeWidth + 1000;
    },
    svgStyle() {
      //旋转
      const startPositionMap = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270,
      }
      const positionValue = startPositionMap[this.startPosition] || 0
      return {
        transform: `rotate(${positionValue}deg)`
      }

    },
    getPath() {
      const {viewBoxSize, value} = this;
      //进度条开始方向
      const sweepFlag = value ? 1 : 0;
      return `M ${viewBoxSize / 2} ${
          viewBoxSize / 2
      } m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
    },
    innerPathStyle() {
      const PERIMETER = 3140;
      const color = Array.isArray(this.color) ? `url(#${this.id})` : this.color;
      return {
        strokeWidth: addUnit(this.strokeWidth + 1),
        //偏移原理与circle 类似
        // this.speedVal * PERIMETER/PERIMETER
        strokeDasharray: `${this.speedVal * PERIMETER}px ${PERIMETER}px`,
        fill: this.fill,
        // 这里的原理类似ps剪贴蒙版
        stroke: color,
        strokeLinecap: this.strokeLinecap,
      }

    },

    basePathStyle() {
      return {
        stroke: this.layerColor,
        strokeWidth: addUnit(this.strokeWidth),
        fill: this.fill
      }
    }
  },
}
</script>
<style lang="less" scoped>
.vux-circle-warp {
  position: relative;
  display: inline-block;
  font-size: 0;

  .vux-circle-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
}
</style>

