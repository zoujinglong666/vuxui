<template>
  <!--  background
  backgroundColor 不支持渐变-->
  <button :class="[type,size,
          disabled?'disabled':'',
          loading?'loading':'',
          plain?'plain':'',
          round?'round':'',
          square?'square':'',
          noBorder?'noBorder':'',
          hairline?'hairline':'',
          link?'link':'',
          gradual?'gradual':'',
         circle?'circle':'',
         block?'block':'',
          ]"
          :disabled="disabled"
          :loading="loading"
          :style="{color: color,
          background:bgColor,
          borderRadius:radiusStyle,
          fontSize:textSizeStyle,
          borderColor: borderColor,
          width:widthStyle,
          height:heightStyle,
          lineHeight:heightStyle
          }"
          class="vux-data-button ripple"
          @click="handleBtnClick($event)"

  >

    <span v-if="loading">
      <i :class="[loading?`vux-loading-${loadingType}`:'']">
      </i>
      {{ loadingText }}
    </span>
    <template>
      <slot name="left"></slot>
    </template>
    <slot></slot>
    <template>
      <slot name="right"></slot>
    </template>
  </button>
</template>

<script>
//基本用法
const types = ["default", "primary", "success", "warning", "danger"];
const sizes = ["large", "small", "medium", "mini", "normal"];
const shapes = ["plain", "round", "square"];
// 0 0.5 1
const borders = ["noBorder", "hairline",];

export default {
  name: "vuxButton",

  props: {
    //常用渐变
    // background: linear-gradient(to right, #5faff8, #0068ff) !important;
    gradual: {
      type: Boolean,
    },
    //宽度
    width: {
      type: Number
    },
    //gaodu
    height: {
      type: Number
    },
    text: {
      type: String,
      default: ''
    },
    //文字颜色
    color: {
      type: String,
      default: ''
    },
    textSize: {
      type: Number,
    },
    //按钮颜色
    bgColor: {
      type: String,
      default: ''
    },
    //边框颜色
    borderColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return types.includes(val);
      },
    },

    size: {
      type: String,
      default: 'normal',
      validator(val) {
        return sizes.includes(val);
      },
    },

    //形状
    plain: {
      type: Boolean
    },
    //50%圆角
    round: {
      type: Boolean
    },
    //自定义圆角
    radius: {
      type: Number
    },
    square: {
      type: Boolean
    },
    //圆形按钮  默认 w-h  40px  可以自定义
    circle: {
      type: Boolean,
    },

    //无边框
    noBorder: {
      type: Boolean
    },
    // 细边框
    hairline: {
      type: Boolean
    },
    //文字按钮
    link: {
      type: Boolean
    },

    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean

    },
    block: {
      type: Boolean
    },

    loadingText: {
      type: String,
      default: ''
    },
    //loading样式
    loadingType: {
      type: String,
      default: "one",
      validator(val) {
        return ["one", "two"].includes(val);
      },
    },

    icon: {
      type: String,
      default: ''
    },
    //路由跳转  直接传入url地址就可以
    url: {
      type: String,
      default: ""
    },
    to: {
      type: String,
      default: ""
    },
    //主要应用返回按钮,为一个返回函数
    goBack: {
      type: Boolean,
    }

  },
  computed: {
    radiusStyle() {
      if (this.radius) {
        return this.radius + 'px'
      }
    },
    textSizeStyle() {
      if (this.textSize) {
        return this.textSize + 'px'
      }
    },
    widthStyle() {
      if (this.width) {
        return this.width + 'px'
      }
    },
    heightStyle() {
      if (this.height) {
        return this.height + 'px'
      }
    }
  },
  methods: {
    handleBtnClick() {
      if (this.disabled) {
        return
      }
      this.$emit('click')

      //优先级，默认只做一件事
      if (this.to) {
        this.$router.push(this.to)
        return;
      }
      if (this.url) {
        window.open(this.url)
        return;
      }
      if (this.goBack) {
        this.$router.go(-1);

      }


    },


  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.vux-data-button {
  position: relative;
  display: inline-block;
  letter-spacing: normal;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #DCDFE6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  border-radius: 2px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  &.primary {
    color: #fff;
    background-color: #0068ff;
    border-color: #0068ff;

    &.plain {
      color: #0068ff;
      background-color: #fff;
      border-color: #0068ff;
    }

    &.link {
      border: 0 !important;
      border: none !important;
      background-color: transparent !important;
      color: #0068ff;
    }

    //实现0.5px边框

    &.hairline {
      border: none !important;
      border: 0 !important;
      box-shadow: 0 0 0 0.5px #0068ff;
    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #5faff8, #0068ff) !important;
      //border-image: linear-gradient(to right, #5faff8, #0068ff) !important;
      border: none !important;
      border: 0 !important;
    }

  }

  &.success {
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;

    &.plain {
      color: #07c160 !important;
      background-color: #fff !important;
      border-color: #07c160 !important;
    }

    &.link {
      border: 0 !important;
      border: none !important;
      background-color: transparent !important;
      color: #07c160;
    }

    &.hairline {
      border: none !important;
      border: 0 !important;
      box-shadow: 0 0 0 0.5px #07c160;

    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #36db84, #07c160) !important;
      //border-image: linear-gradient(to right, #36db84, #07c160) !important;
      border: none !important;
      border: 0 !important;
    }


  }

  &.warning {
    color: #fff;
    background-color: #ff976a;
    border-color: #ff976a;

    &.link {
      border: 0 !important;
      border: none !important;
      background-color: transparent !important;
      color: #ff976a;
    }

    &.plain {
      color: #ff976a !important;
      background-color: #fff !important;
      border-color: #ff976a !important;
    }

    &.hairline {
      border: none !important;
      border: 0 !important;
      box-shadow: 0 0 0 0.5px #ff976a;

    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #ff976a, #fa6419) !important;
      //border-image: linear-gradient(to right, #ff976a, #fa6419) !important;
      border: none !important;
      border: 0 !important;
    }


  }

  &.danger {
    color: #fff;
    background-color: #ff4040;
    border-color: #ff4040;

    &.link {
      border: 0 !important;
      border: none !important;
      background-color: transparent !important;
      color: #ff4040;
    }

    &.plain {
      color: #ff4040 !important;
      background-color: #fff !important;
      border-color: #ff4040 !important;
    }

    &.hairline {
      border: none !important;
      border: 0 !important;
      box-shadow: 0 0 0 0.5px #ff4040;

    }

    &.gradual {
      background: linear-gradient(to right, #f15142, #ff4040) !important;
      //border-image: linear-gradient(to right, #f15142, #fa2c19) !important;
      border: none !important;
      border: 0 !important;
    }


  }

  &.default {
    color: #333;
    background-color: #fff;
    border-color: #ebedf0;

    &.link {
      border: 0 !important;
      border: none !important;
      background-color: transparent !important;
      color: #333;
    }

    &.plain {
      color: #333 !important;
      background-color: #fff !important;
      border-color: #ebedf0 !important;
    }

    &.hairline {
      border: none !important;
      border: 0 !important;
      box-shadow: 0 0 0 0.5px #ebedf0;

    }


  }

  &.large {
    //todo
    display: block;
    width: 100%;
    height: 44px;
  }

  &.block {
    //todo
    display: block;
    width: 100%;
    height: 40px;
  }

  &.normal {
    padding: 0 18px;
    height: 40px;
  }

  &.small {
    padding: 0 16px;
    height: 32px;
  }

  &.medium {
    padding: 0 14px;
    height: 28px;
  }

  &.mini {
    padding: 0 10px;
    height: 24px;
  }


  &.square {
    border-radius: 0 !important;
  }

  &.round {
    border-radius: 44px !important;
  }

  &.noBorder {
    border: none !important;

  }


  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }


  &.circle {
    width: 40px;
    height: 40px;
    border: 0;
    border: none;
    padding: 0 !important;
    border-radius: 50%;
    text-align: center;

  }


  .vux-loading-one {
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: loadingOne 1s steps(12) infinite;
    animation: loadingOne 1s steps(12) infinite;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    background-size: 100%;

  }

  @-webkit-keyframes loadingOne {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  .vux-loading-two {
    width: 14px;
    height: 14px;
    border: 2px solid #C0C4CC;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
    animation: loadingTwo 1s linear infinite;
  }

  @-webkit-keyframes loadingTwo {
    from {
      transform: rotatez(0deg);
    }

    to {
      transform: rotatez(360deg);
    }
  }

  @keyframes loadingTwo {
    from {
      transform: rotatez(0deg);
    }

    to {
      transform: rotatez(360deg);
    }
  }

  .ripple {
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #fff 10%, transparent 11%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(12, 12);
      opacity: 0;
      transition: transform .6s, opacity .6s;
      overflow: hidden;
    }

    &:active::after {
      transform: scale(0, 0);
      opacity: .3;
      //设置初始状态
      transition: 0s;
      overflow: hidden;
    }
  }


}
</style>
