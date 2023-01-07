<template>
  <div :class="[round?'round':'',type]" class="vux-notice-bar" @click="handleClick">
    <div style="display: flex;align-items: center">
      <span class="vux-notice-left">
        <span v-if="closable" class="vux-close-icon" @click="handleClose"></span>
      </span>
      <span :class="[wrapable?'wrapable':'']" class="vux-notice-content"><slot>{{ content }}</slot></span>
    </div>

    <div class="vux-notice-right">
      <span v-if="closable" class="vux-close-icon" @click="handleClose"></span>
    </div>
  </div>

</template>

<script>
const typeArr = ["primary", "warning", "danger"]; // 标签类型数组
export default {
  name: "VuxNoticeBar",
  props: {
    icon: {
      type: String,
    }, content: {
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
      default: 'warning',
      validator(val) {
        return typeArr.includes(val);
      },
    },


  },
  methods: {
    handleClose(e) {
      console.log(e)
      this.$emit('close', e)
    }, handleClick(e) {
      console.log(e)
      this.$emit('click')
    },

  }
}
</script>

<style lang="scss" scoped>
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


  .vux-notice-left {
    margin-right: 8px;
  }

  .vux-notice-content {
    font-size: 14px;
    margin-right: 16px;

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