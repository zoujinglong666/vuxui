<template>
  <div class="vux-progress">
    <div :class="[size,
    square?'square':'', border?'border':'',]" :style="{height: strokeHeightStyle}" class="vux-progress-base">
      <div :class="[size,
          getFarLeftAndRightStyle]" :style="{left:strokeWidthStyle,background:strokeColor,color:textColor }"
           class="vux-progress-tip">
        {{ tipText ? tipText : strokeWidthStyle }}
      </div>
      s
      <div :class="[size,square?'square':'',]"
           :style="{width:strokeWidthStyle,background:strokeColor,height:strokeHeightStyle}"
           class="vux-progress-inner">
      </div>
    </div>
    <div v-if="icon" class="vux-progress-text">
      <i v-if="icon" :class="icon"></i>
    </div>
    <div v-if="showPercentage" class="vux-progress-text">
      <span>{{ strokeWidthStyle }}</span>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
const sizes = ["large", "small", "base"];
export default {
  name: "vuxProgress",
  props: {
    strokeHeight: {
      type: Number,
    },
    // 0-1
    percentage: {
      type: String,
      default: ''
    },
    //进度条背景颜色
    strokeColor: {
      type: String,
      default: '#0068ff'
    },
    border: {
      type: Boolean
    },
    //percentageDisplay
    showPercentage: {
      type: Boolean,
    },
    size: {
      type: String,
      default: "small",
      validator(val) {
        return sizes.includes(val);
      },
    },
    //可以传入百分比和小数
    strokeWidth: {
      type: Number,
      default: 50
    },
    textColor: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    tipText: {
      type: String,
      default: ""
    },
    //直角  默认圆角
    square: {
      type: Boolean
    }

  },
  computed: {
    strokeWidthStyle() {
      return this.strokeWidth + '%'
    },
    strokeHeightStyle() {
      return this.strokeHeight + 'px'
    },

  },
  methods: {
    getFarLeftAndRightStyle() {
      if (this.strokeWidth === this.valueRange[0]) {
        return 'farLeft'
      }
      if (this.strokeWidth === this.valueRange[1]) {
        return 'farRight'
      }
    },
  }
}
</script>

<style lang="less" scoped>

.vux-progress {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;


  .vux-progress-base {
    position: relative;
    width: 100%;
    background-color: #f3f3f3;

    display: flex;
    align-items: center;

    &.border {
      background-color: transparent !important;
      border: 1px solid #f3f3f3 !important;
    }

    &.large {
      height: 14px;
      border-radius: 14px;

    }

    &.base {
      height: 10px;
      border-radius: 10px;
    }

    &.small {
      height: 6px;
      border-radius: 6px;
    }

    &.square {
      border-radius: 0 !important;
    }

  }

  .vux-progress-inner {
    width: 100%;

    &.large {
      height: 14px;
      border-radius: 14px;
    }

    &.base {
      height: 10px;
      border-radius: 10px;
    }

    &.small {
      height: 6px;
      border-radius: 6px;
    }

    &.square {
      border-radius: 0 !important;
    }

  }

  .vux-progress-tip {
    z-index: 99;
    position: absolute;
    text-align: center;
    color: #fff;
    border-radius: 8px;
    right: 0;
    transform: translate(-50%);
    //分别对最左侧 最右侧提示进行样式美化
    &.farLeft {
      transform: translate(0) !important;
    }

    &.farRight {
      transform: translate(-100%) !important;
    }


    &.large {
      width: 36px;
      height: 18px;
      line-height: 18px;
      border-radius: 4px;
      font-size: 14px;
    }

    &.base {
      width: 32px;
      height: 16px;
      line-height: 16px;
      border-radius: 4px;
      font-size: 12px;
    }

    &.small {
      width: 28px;
      height: 14px;
      border-radius: 4px;
      line-height: 14px;
      font-size: 12px;


    }

  }

  .vux-progress-text {
    width: 32px;
    margin: 2px;
    font-size: 12px;
  }

}


</style>
