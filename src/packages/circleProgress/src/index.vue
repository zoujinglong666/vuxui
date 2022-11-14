<template>
  <!--  环形进度条-->
  <!--
      stroke-width:圆弧宽度
      fill:填充颜色，默认是黑色,none为不填充,使用透明色也可以
      r:半径

      -->
  <!--      灰色圆环背景-->
  <div class="vux-circle-progress">
    <div :style="[{ 'width': size+'px','height': size+'px'}]" class="vux-circle-box">
      <svg :height="size" :width="size" class="svg">
        <circle
            :cx="cx"
            :cy="cx"
            :r="radius"
            :stroke="bgColor"
            :stroke-width="strokeWidth"
            class="circle"
            fill="none"
        />
        <circle
            :cx="cx"
            :cy="cx"
            :r="radius"
            :stroke="color"
            :stroke-dasharray="strokeDasharray"
            :stroke-dashoffset="strokeDashoffset"
            :stroke-linecap="strokeLinecap"
            :stroke-width="strokeWidth"
            class="circle"
            fill="none"
        />
      </svg>
      <span class="count">{{ text ? text : countDown }}</span>
    </div>

  </div>

</template>

<script>
export default {
  name: "vuxCircleProgress",
  props: {
    value: {
      type: Number,
      default: 28
    },
    rate: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number || String,
      default: 5
    },

    color: {
      type: String,
      default: '#0068ff'
    },
    bgColor: {
      type: String,
      default: '#eee'
    },
    pathColor: {
      type: String,
      default: ""
    },
    strokeLinecap: {
      type: String,
      default: "round",
      validator(val) {
        return ['round', 'square'].includes(val);
      },
    },
    clockwise: {
      type: Boolean
    },
    text: {
      type: String
    }
  },

  computed: {
    countDown() {
      return this.value + '%';
    },
    radius() {
      return Number(this.size - this.strokeWidth) / 2;
    },
    cx() {
      return this.size / 2
    },
    strokeDasharray() {
      let value = 0;
      /*
        当stroke-linecap的值为round时，结尾处会向外延伸描边宽度的一半
        首尾两个端点，所以就是描边的宽度
      */
      if (this.strokeLinecap === "round") {
        value = 2 * Math.PI * this.radius + this.strokeWidth;
      } else {
        value = 2 * Math.PI * this.radius;
      }
      return value
    },
    strokeDashoffset() {
      return (1 - this.value / 100) * this.strokeDasharray
    },
  }
}
</script>

<style lang="less" scoped>
.vux-circle-progress {
  width: 100%;

  .vux-circle-box {
    position: relative;
    //margin: 0 auto;
    display: block;
  }

  .svg {
    transform: rotate(-90deg)

  }

  .circle {
    position: relative;
  }

  .count {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;

  }

}

</style>
