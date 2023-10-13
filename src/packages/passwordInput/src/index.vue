<template>
  <div class="vux-password-input">
    <div v-if="type === 'keyboard'" v-clickoutside="onBlur" class="vux-password-input__grid"></div>
    <div v-if="type === 'grid'" v-clickoutside="onBlur" class="vux-password-input__grid">
      <ul
          :class="{ 'vux-password-input-cursor': isFocus }"
          :style="{ border: border ? '' : 'none' }"
          class="vux-password-input__security"
      >
        <li
            v-for="(item, index) in maxlength"
            :key="index"
            :style="{ border: border ? '' : 'none' }"
        >
          <i
              v-if="mask"
              :style="{ visibility: index < passVal.length ? 'inherit' : 'hidden' }"
              class="vux-password-input__dot"
          ></i>
          <span v-else class="vux-password-input__mask" v-html="passVal[index]"></span>
          <div v-show="index === passVal.length && isFocus" class="vux-password-input__cursor"></div>
        </li>
      </ul>
      <input
          v-model="passVal"
          :maxlength="maxlength"
          class="vux-password-input__val"
          type="text"
          @click="onFocus"
          @keyup="keyUp"
      />
    </div>
  </div>
</template>

<script>

const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
      return true;
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    // eslint-disable-next-line
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el) {
    // 解除事件监听
    // eslint-disable-next-line
    document.removeEventListener('click', el.__vueClickOutside__);
    // eslint-disable-next-line
    delete el.__vueClickOutside__;
  },
};
export default {
  name: 'vux-password-input',
  directives: {clickoutside},
  props: {
    maxlength: {
      type: Number,
      default: 6,
    },
    pattern: {
      type: RegExp,
      default() {
        return /[^\d|chun]/g;
      },
    },
    placeholder: {
      type: String,
      default: '暗提示',
    },
    type: {
      type: String,
      default: 'grid',
    },
    mask: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      passVal: '',
      mode: 'password',
      currentValue: '',
      isFocus: false,
    };
  },
  watch: {
    passVal(newValue) {
      this.$emit('change', newValue || '');
    },
    currentValue(newValue) {
      this.$emit('change', newValue || '');
    },
  },
  methods: {
    keyUp(e) {
      this.passVal = e.target.value.replace(this.pattern, '');
    },
    onFocus() {
      setTimeout(() => {
        this.isFocus = true;
      });
    },
    onBlur() {
      setTimeout(() => {
        this.isFocus = false;
      });
    },
  },
};
</script>

<style lang="less">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}

.vux-password-input {
  position: relative;
  user-select: none;

  &__grid {
    position: relative;
  }

  &__val {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 44px;
    line-height: 50px;
    opacity: 0;
  }

  &__security {
    display: flex;
    height: 48px;
    position: relative;
    border: 1px solid #ebedf0;;
    border-radius: 3px;
    padding: 3px;
    overflow: hidden;

    li {
      position: relative;
      flex: 1;
      display: inline-block;
      // width: 54px;
      height: 100%;
      font-size: 24px;
      line-height: 48px;
      text-align: center;
      background-color: var(--vux-white);
      border-right: 1px solid #ebedf0;;

      &:last-child {
        border-right: none;
      }

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        margin: -5px 0 0 -5px;
        background-color: var(--vux-black);
        border-radius: 100%;
        visibility: hidden;
      }

      @keyframes vux-cursor-flicker {
        from {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      &__cursor {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1px;
        height: 40%;
        background-color: #333;
        transform: translate(-50%, -50%);
        animation: 1s vux-cursor-flicker infinite;
      }
    }
  }

  .vux-password-input__field {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #333;
    font-size: 14px;
    line-height: 24px;
    background-color: var(--vux-white);

    .vux-password-input__label {
      flex: none;
      width: 90px;
      color: #333;
    }

    .vux-password-input__value {
      position: relative;
      overflow: hidden;
      color: #333333;
      text-align: right;
      vertical-align: middle;
      flex: 1;

      .vux-password-input__body {
        display: flex;
        align-items: center;

        .vux-password-input__control {
          background: #333333;
          border: 0;
          color: #333333;
          height: 24px;
          line-height: 24px;
          margin: 0;
          padding: 0;
          resize: none;
          width: 100%;
          font: inherit;

          &:focus {
            outline: none;
          }
        }

        .vux-password-input__shade {
          letter-spacing: 4px;
          font-size: 24px;
        }

        .vux-password-input-icon {
          margin-right: -8px;
          padding: 0 8px;
          line-height: inherit;
        }
      }
    }
  }
}

</style>
