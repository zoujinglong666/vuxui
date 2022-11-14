<template>
  <div style="display: inline-block">
    <span
        :class="[type,size,theme,semicircle,round?'round':'',square?'square':''
      ]"
        :style="{backgroundColor: bgColor,
       color: color,
       borderColor:borderColor,
       borderRadius:radiusStyle,
       marginLeft:spaceLeftStyle,
       marginRight:spaceRightStyle,
       margin:spaceStyle
    }"
        class="vux-tag"
        @click="handleClick()"
    >
      <template>
        <slot name="left"></slot>
      </template>
     <slot></slot>
    <span v-if="closable" class="close-tag" @click="handleClose">
      <i class="iconfont icon-close" style="font-size: 14px"></i>
    </span>
      <template>
        <slot name="right"></slot>
      </template>
    </span>
  </div>

</template>
<script>

const typeArr = ["primary", "success", "info", "warning", "danger"] // 标签类型数组
const sizeArr = ["mini", "small", "medium", "large"] // 标签大小数组
const themeArr = ["dark", "light", "plain"]
export default {
  name: "vuxTag",
  props: {
    borderColor: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    },
    //自定义圆角
    radius: {
      type: [Number, String]
    },
    //左间距
    spaceLeft: {
      type: [Number, String]
    },
    //右间距
    spaceRight: {
      type: [Number, String]
    },
    ////左右间距
    space: {
      type: [Number, String]
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    closable: {
      type: Boolean,
      default: false
    },
    // 五种标签类型
    type: {
      type: String,
      default: "primary",
      validator(val) {
        return typeArr.includes(val)
      }
    },
    // 三种标签大小
    size: {
      type: String,
      default: "small",
      validator(val) {
        return sizeArr.includes(val)
      }

    },
    theme: {
      type: String,
      default: "light",
      validator(val) {
        return themeArr.includes(val)
      }
    },
    semicircle: {
      type: String,
      validator(val) {
        return ["left", "right"].includes(val)
      }
    }

  },

  computed: {
    radiusStyle() {
      if (this.radius) {
        return this.radius + "px"
      }
    },
    spaceStyle() {
      if (this.space) {
        return this.space + "px"
      }
    },
    spaceLeftStyle() {

      if (this.spaceLeft) {
        return this.spaceLeft + "px"
      }
    },
    spaceRightStyle() {
      if (this.spaceRight) {
        return this.spaceRight + "px"
      }
    }
  },
  methods: {
    handleClose(event) {
      /* 阻止冒泡防止与下方的handleClick方法冲突，要不然点击close关闭小图标，也会
       触发下方click事件的执行。即：内层事件阻止冒泡与外层事件隔离开来 */
      event.stopPropagation()
      this.$emit("close", event)
    },
    handleClick(event) {
      this.$emit("click", event)
    },

  }
}
</script>
<style lang="less" scoped>
/* 默认标签样式 */
.vux-tag {
  box-sizing: border-box;
  padding: 0 8px;
  color: #252525;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;


  &.square {
    border-radius: 0 !important;
  }

  &.round {
    border-radius: 20px;
  }

  /* 5种类型标签样式 */

  &.primary {
    &.light {
      color: #409eff;
      border-color: #d9ecff;
      background-color: #ecf5ff;
    }

    &.dark {
      background-color: #0068ff;
      border-color: #0068ff;
      color: #fff;
    }

    &.plain {
      background-color: #fff !important;
      border-color: #b3d8ff !important;
      color: #0068ff !important;
    }
  }

  &.success {

    &.light {
      background-color: #f0f9eb;
      border-color: #e1f3d8;
      color: #07c160;
    }

    &.dark {
      border-color: #07c160;
      background-color: #07c160;
      color: #fff;
    }

    &.plain {
      background-color: #fff !important;
      border-color: #c2e7b0 !important;
      color: #07c160 !important;
    }
  }

  &.info {

    &.light {
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
    }

    &.dark {
      background-color: #909399;
      border-color: #909399;
      color: #fff;
    }

    &.plain {
      background-color: #fff !important;
      border-color: #d3d4d6 !important;
      color: #909399 !important;
    }
  }

  &.warning {

    &.light {
      background-color: #fdf6ec;
      border-color: #faecd8;
      color: #ff976a;
    }

    &.dark {
      border-color: #ff976a;
      background-color: #ff976a;
      color: #fff;
    }

    &.plain {
      background-color: #fff !important;
      border-color: #f5dab1 !important;
      color: #ff976a !important;
    }
  }

  &.danger {
    &.light {
      background-color: #fef0f0;
      border-color: #fde2e2;
      color: #ff4040;
    }


    &.dark {
      border-color: #ff4040;
      background-color: #ff4040;
      color: #fff;
    }

    &.plain {
      background-color: #fff !important;
      border-color: #fbc4c4 !important;
      color: #ff4040 !important;
    }
  }

  &.info {
    &.light {
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
    }


    &.dark {
      background-color: #909399;
      border-color: #909399;
      color: #fff;
    }

    &.plain {
      background-color: #fff;
      border-color: #d3d4d6;
      color: #909399;

    }
  }


  /* 标签关闭小叉号样式 */

  &.close-tag {
    position: relative;
    margin-left: 5px;
    cursor: pointer;
    display: inline-block;
  }


  &.large {
    padding: 6px 12px;
    font-size: 14px;
  }

  &.medium {
    padding: 4px 8px;
    font-size: 14px;
  }

  &.small {
    padding: 2px 4px;
    font-size: 12px;


  }

  &.mini {
    padding: 0 4px;
    font-size: 12px;


  }


  &.left {
    border-radius: 20px 0 0 20px;

  }

  &.right {
    border-radius: 0 20px 20px 0;
  }

}


</style>
