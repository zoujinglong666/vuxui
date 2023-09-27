<template>
  <div :class="[round?'round':'',type]" class="vux-notice-bar" @click="handleClick">
    <div style="display: flex;align-items: center">
      <span class="vux-notice-left">
        <span v-if="closable" class="vux-close-icon" @click="handleClose"></span>
      </span>
      <div :class="[wrapable?'wrapable':'']" :style="{
        animationDuration: speed + 'ms',
      }"
           class="vux-notice-content">
        <slot>{{ content }}</slot>
      </div>
    </div>

    <div class="vux-notice-right">
      <span v-if="closable" class="vux-close-icon" @click="handleClose"></span>
    </div>
  </div>

</template>

<script>
const typeArr = ["primary", "warning", "danger", "success"]; // 标签类型数组
export default {
  name: "VuxNoticeBar",
  props: {
    icon: {
      type: String,
    },
    content: {
      type: String,
    },
    wrapable: {
      type: Boolean,
    },
    round: {
      type: Boolean,

    },
    closable: {
      type: Boolean,
    },
    type: {
      type: String,
      default: 'primary',
      validator(val) {
        return typeArr.includes(val);
      },
    },
    speed: {
      type: Number,
      default: 12000
    }


  },
  methods: {
    handleClose(e) {
      this.$emit('close', e)
    },
    handleClick(e) {
      this.$emit('click')
    },
    mounted() {
      this.setKeyframes();
    },
    setKeyframes() {
      let scrollContentWidth = document.querySelector(".vux-notice-content");
      console.log(scrollContentWidth, 'scrollContentWidth')
      let width = scrollContentWidth.offsetWidth; // 获取内容区宽度
      let style = document.createElement("style"); // 创建样式标签
      style.setAttribute("type", "text/css"); // 指定类型属性
      document.head.appendChild(style); // 给head标签加入此样式标签
      let sheet = style.sheet; // 给样式标签内加入一条css规则
      sheet.insertRule(
          `
            @keyframes scrollText {
              from {
                left: 100%;
              }
              to {
                left: -${width}px;
              }
            }
          `
      );
    },
  }
}
</script>

<style lang="less" scoped>
.vux-notice-bar {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;
  min-height: 36px;
  align-items: center;
  text-align: center;


  &.round {
    border-radius: 40px;
  }

  &.warning {
    background-color: #ffedde;
    color: #ff843d;
  }

  &.primary {
    background-color: rgba(89, 158, 248, .08);
    color: #198cff;
  }

  &.danger {
    background-color: #ffeeef;
    color: #ff5b60;
  }

  &.success {
    background-color: #ffeeef;
    color: #ff5b60;
  }


  .vux-notice-left {
    margin-right: 8px;
  }

  .vux-notice-content {
    font-size: 14px;
    margin-right: 16px;
    left: 100%;
    white-space: nowrap;
    display: inline-block;
    // 动画
    animation-iteration-count: infinite;
    animation-name: scrollText;
    animation-timing-function: linear;

    &.wrapable {
      text-align: left;
    }
  }

  .vux-close-icon {
    display: flex;
    align-items: center;
    position: relative;
    width: 12px;
    height: 12px;

    &.warning {
      color: #ff843d;
    }

    &.primary {
      color: #198cff;
    }

    &.danger {
      color: #ff5b60;
    }

    &.success {
      background-color: #ffeeef;
      color: #ff5b60;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 12px;
      height: 1px;
      background-color: currentColor;
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }
}
</style>
