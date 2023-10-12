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
    <vux-loading v-if="loading" :size="16" color="#fff"></vux-loading>
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>
</template>

<script>
//基本用法
import VuxLoading from "@/packages/loading/src/index.vue";

const types = ["default", "primary", "success", "warning", "danger"];
const sizes = ["large", "small", "mini", "normal"];
const shapes = ["plain", "round", "square"];
// 0 0.5 1
const borders = ["noBorder", "hairline",];

export default {
  name: "vuxButton",
  components: {VuxLoading},

  props: {
    //常用渐变
    // background: linear-gradient(to right, #5faff8, #1989fa) ;
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
  background: #fff;
  border: 1px solid #DCDFE6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  font-size: 14px;

  &.primary {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;

    &.plain {
      color: #1989fa;
      background-color: #fff;
      border-color: #1989fa;
    }

    &.link {
      border: 0;
      border: none;
      background-color: transparent;
      color: #1989fa;
    }

    //实现0.5px边框

    &.hairline {
      border: none;
      border: 0;
      box-shadow: 0 0 0 0.5px #1989fa;
    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #5faff8, #1989fa);
      //border-image: linear-gradient(to right, #5faff8, #1989fa) ;
      border: none;
      border: 0;
    }

  }

  &.success {
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;

    &.plain {
      color: #07c160;
      background-color: #fff;
      border-color: #07c160;
    }

    &.link {
      border: 0;
      border: none;
      background-color: transparent;
      color: #07c160;
    }

    &.hairline {
      border: none;
      border: 0;
      box-shadow: 0 0 0 0.5px #07c160;

    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #36db84, #07c160);
      //border-image: linear-gradient(to right, #36db84, #07c160) ;
      border: none;
      border: 0;
    }


  }

  &.warning {
    color: #fff;
    background-color: #ff976a;
    border-color: #ff976a;

    &.link {
      border: 0;
      border: none;
      background-color: transparent;
      color: #ff976a;
    }

    &.plain {
      color: #ff976a;
      background-color: #fff;
      border-color: #ff976a;
    }

    &.hairline {
      border: none;
      border: 0;
      box-shadow: 0 0 0 0.5px #ff976a;

    }

    //传入 type+gradual
    &.gradual {
      background: linear-gradient(to right, #ff976a, #fa6419);
      //border-image: linear-gradient(to right, #ff976a, #fa6419) ;
      border: none;
      border: 0;
    }


  }

  &.danger {
    color: #fff;
    background-color: #ff4040;
    border-color: #ff4040;

    &.link {
      border: 0;
      border: none;
      background-color: transparent;
      color: #ff4040;
    }

    &.plain {
      color: #ff4040;
      background-color: #fff;
      border-color: #ff4040;
    }

    &.hairline {
      border: none;
      border: 0;
      box-shadow: 0 0 0 0.5px #ff4040;

    }

    &.gradual {
      background: linear-gradient(to right, #f15142, #ff4040);
      //border-image: linear-gradient(to right, #f15142, #fa2c19) ;
      border: none;
      border: 0;
    }


  }

  &.default {
    color: #333;
    background-color: #fff;
    border-color: #ebedf0;

    &.link {
      border: 0;
      border: none;
      background-color: transparent;
      color: #333;
    }

    &.plain {
      color: #333;
      background-color: #fff;
      border-color: #ebedf0;
    }

    &.hairline {
      border: none;
      border: 0;
      box-shadow: 0 0 0 0.5px #ebedf0;

    }


  }

  &.large {
    width: 100%;
    height: 44px;
  }

  &.block {

    width: 100%;
    height: 40px;
  }

  &.normal {
    padding: 0 16px;
    height: 40px;
  }

  &.small {
    padding: 0 12px;
    height: 32px;
  }

  &.mini {
    padding: 0 4px;
    height: 24px;
    font-size: 12px;
  }


  &.square {
    border-radius: 0;
  }

  &.round {
    border-radius: 44px;
  }

  &.noBorder {
    border: none;

  }


  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }


  &.circle {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    text-align: center;

  }


  //.vux-loading {
  //  width: 14px;
  //  height: 14px;
  //  border: 2px solid #fff;
  //  border-radius: 50%;
  //  display: inline-block;
  //  vertical-align: middle;
  //  margin-right: 4px;
  //  clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
  //  animation: loading 1s linear infinite;
  //}
  //
  //
  //@keyframes loading {
  //  from {
  //    transform: rotatez(0deg);
  //  }
  //
  //  to {
  //    transform: rotatez(360deg);
  //  }
  //}

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
