<template>
  <div class="vux-progress">
    <div :class="[size,
    square?'square':'', border?'border':'',]" :style="{height: strokeHeightStyle}" class="vux-progress-base">
      <div :class="[size,
          getFarLeftAndRightStyle]" :style="{left:strokeWidthStyle,background:strokeColor,color:textColor }"
           class="vux-progress-tip">
        {{ tipText ? tipText : strokeWidthStyle }}
      </div>
      <div :class="[size,square?'square':'']"
           :style="{width:strokeWidthStyle,background:strokeColor,height:strokeHeightStyle}"
           class="vux-progress-inner">
      </div>
    </div>
    <div v-if="icon" class="vux-progress-text">
      <slot name="icon"></slot>
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

  model: {
    prop: 'value'
  },
  props: {
    strokeHeight: {
      type: Number,
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
    value: {
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
    },
    showAnimation: {
      type: Boolean,
      default: true
    }

  },
  watch: {

    value(val) {
      this.$emit('input', val)
    },

  },
  computed: {
    strokeWidthStyle() {
      return this.value + '%'
    },
    strokeHeightStyle() {
      return this.strokeHeight + 'px'
    },
  },
  methods: {
    getFarLeftAndRightStyle() {
      if (this.value === this.valueRange[0]) {
        return 'farLeft'
      }
      if (this.value === this.valueRange[1]) {
        return 'farRight'
      }
    },
  }
}
</script>

<style lang="less" scoped>

.vux-progress {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 40px 0;


  .vux-progress-base {
    position: relative;
    width: 100%;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;


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

.vux-progress-base::before {
  content: "";
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 10px;
  animation: progressAnimation 2s infinite;


}

@keyframes progressAnimation {
  0% {
    opacity: 0.5;
    width: 0;
  }
  100% {
    opacity: 0;
    width: 100%;
  }
}
</style>
