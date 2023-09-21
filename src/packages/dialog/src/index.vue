<template>
  <!--  重构dialog-->
  <div :class="caleClass" class="vux-dialog" @click="handleClickByMark($event)">
    <div v-show="curOpen" :style="{ borderRadius:radiusStyle}" class="vux-dialog-container" @click="handleScroll">
      <div :style="{background:titleColor}" class="vux-dialog-title">
        <span>{{ title }}</span>
        <span v-if="closable" class="vux-close-icon" @click="handleClose"></span>
      </div>
      <div class="vux-dialog-content">
        <slot>

        </slot>
      </div>
      <div :class="[singleButton?'singleButton':'',
          doubleButton?'doubleButton':'',]" class="vux-dialog-footer">
        <slot name='btn'>
          <template v-if="doubleButton">
            <vux-button :type="theme" block plain style="margin-right: 5px"
                        @click="handleClose">{{ cancelText }}
            </vux-button>
            <vux-button :type="theme" block style="margin-left:5px" @click="handleConfirm">{{ confirmText }}
            </vux-button>
          </template>
          <template v-if="singleButton">
            <vux-button :type="theme" block round @click="handleConfirm">{{ confirmText }}
            </vux-button>
          </template>
        </slot>

      </div>
    </div>
  </div>
</template>
<script>
const types = ["default", "primary", "success", "warning", "danger"];
export default {
  name: "VuxDialog",
  data() {
    return {
      curOpen: this.open,
    }
  },
  model: {
    prop: 'open',
    event: 'input'
  },

  props: {
    open: {
      type: Boolean,
    },
    type: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },

    titleColor: {
      type: String,
      default: '#1989fa'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
    },

    closable: {
      type: Boolean,
      default: true
    },
    //圆角
    radius: {
      type: String,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    theme: {
      type: String,
      default: 'primary',
      validator(val) {
        return types.includes(val);
      },
    },
    showMark: {
      type: Boolean,
      default: true
    },
    singleButton: {
      type: Boolean,
      default: false
    },
    doubleButton: {
      type: Boolean,
      default: false
    },
    clickCloseMark: {
      type: Boolean,
      default: true
    }

  },
  watch: {
    open(val) {
      this.curOpen = val;
    },
    curOpen(val) {
      this.$emit('input', val)
    },

  },
  computed: {

    caleClass() {
      return [
        this.curOpen && this.showMark ? 'vux-dialog-mark' : '',
      ]
    },
    radiusStyle() {
      if (this.radius) {
        return this.radius + 'px'
      }
    },
  },
  methods: {
    handleScroll(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    handleClickByMark(e) {
      if (!this.clickCloseMark) {
        return;
      }
      if (!this.showMark) {
        return;
      }
      if (e.target !== this.$el) {
        return;
      }
      this.curOpen = false;

    },
    handleClose() {
      this.$emit('input', false);
    },
    handleConfirm() {
      this.$emit('confirm');
    }
  },
}
</script>

<style lang="less" scoped>

.vux-dialog-mark {
  overflow: hidden;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-out;
}

.vux-dialog-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  -webkit-animation: vux-dialog-open 0.5s ease-out;
  animation: vux-dialog-open 0.5s ease-out;

}

.vux-dialog-title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;

  .vux-close-icon {
    display: flex;
    align-items: center;
    position: relative;
    color: #fff;
    width: 20px;
    height: 20px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 20px;
      height: 1px;
      background-color: currentColor;
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }

}

.vux-dialog-content {
  width: 100%;
  flex: 1;
  max-height: 70vh;
  //会出现双滚动条
  //overflow: scroll;
  overflow-y: auto;

}

.vux-dialog-footer {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  user-select: none;
  padding: 0 10px !important;

  &.doubleButton, &.singleButton {
    padding: 10px !important;
  }
}

@media screen and (min-width: 1024px) {

  .vux-dialog-container {
    width: 40%;
  }

}

@-webkit-keyframes vux-dialog-open {
  from {
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
  }
  to {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
  }
}


</style>
