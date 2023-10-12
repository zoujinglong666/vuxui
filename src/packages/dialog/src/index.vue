<template>
  <div>
    <vux-overlay :show="show" @click.native="handleClickByMark($event)"></vux-overlay>
    <transition name="vux__dialog">
      <div v-show="showCom" class="vux-dialog" @click="handleScroll">
        <div v-if="showTitleBar" class="vux-dialog-title">
          <span>{{ title }}</span>
          <span v-if="closable" @click="handleClose">
            <i class=" iconfont icon-close"></i>
          </span>
        </div>
        <div class="vux-dialog-content">
          <slot>

          </slot>
        </div>
        <div class="vux-dialog-footer">
          <slot name='footer'>

          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxOverlay from "@/packages/overlay/index.vue";

export default {
  name: "VuxDialog",
  components: {VuxOverlay, VuxButton},
  data() {
    return {}
  },
  model: {
    prop: 'show',
    event: 'input'
  },

  props: {
    show: {
      type: Boolean,
    },
    type: {
      type: String
    },
    title: {
      type: String,
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
    radius: {
      type: String,
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },

    showMark: {
      type: Boolean,
      default: true
    },
    showTitleBar: {
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
  watch: {},
  computed: {
    radiusStyle() {
      if (this.radius) {
        return this.radius + 'px'
      }

    },
    showCom: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('input', val)
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
      this.showCom = false;

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

.vux-dialog {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #ffffff;
  border-radius: 8px;

  &-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #999;
    font-size: 14px;
  }

  &-content {
    width: 100%;
    flex: 1;
    max-height: 70vh;
    overflow-y: auto;
  }

  &-footer {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    user-select: none;
    padding: 0 10px;
  }


}

@media screen and (min-width: 1024px) {
  .vux-dialog-container {
    width: 40%;
  }
}


.vux__dialog-enter-active {
  animation: vux-dialog-in .4s;
}

.vux__dialog-leave-active {
  animation: vux-dialog-out .4s;
}

@keyframes vux-dialog-in {
  0% {
    transform: translate3d(-50%, -50%, 0) scale(1.167);;
    opacity: 0;
  }
  100% {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
  }
}

@keyframes vux-dialog-out {
  0% {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(-50%, -50%, 0) scale(0.833);
    opacity: 0;
  }
}



</style>
