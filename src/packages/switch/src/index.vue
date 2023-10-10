<template>
  <div :class="[switchStyle,disabled?'disabled':'',]" :style="{backgroundColor:checked?activeColor:inactiveColor}"
       class="vux_switch"
       @click="onClick">
      <span v-show="activeText||inactiveText" :class="switchStyle" class="vux_switch-text">{{
          checked ? maxlength(activeText, 6) : maxlength(inactiveText, 6)
        }}</span>
    <span
        :class="switchStyle"
        class="vux_switch-ball">
      <span v-if="loading">
      <i :class="{'loading':loading,'checked':checked}" :style="{borderColor:checked?activeColor:inactiveColor}"></i>
    </span>
    </span>
  </div>
</template>
<script>
export default {
  name: "vuxSwitch",
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: [Boolean, String, Number, Object, Array],
    },
    title: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    inactiveColor: {
      type: String,
      default: '#E4E7ED'
    },
    activeText: {
      type: String,
    },
    inactiveText: {
      type: String,
    },
    activeValue: {
      type: [Boolean, String, Number, Object, Array],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number, Object, Array],
      default: false
    },
    size: {
      type: [Number, String],
      default: "small",
      validator(val) {
        return ['small', 'mini'].includes(val)
      }
    },
    height: {
      type: [Number, String]
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },

    switchStyle() {
      const {size, checked} = this;
      return [size, {'checked': checked}]
    }


  },
  methods: {
    maxlength(value, n) {
      if (!value) {
        return ""
      }
      if (value.length > n) {
        return value.slice(0, n) + "..."
      } else {
        return value;
      }
    },
    onClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event);
        const newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }


    }
  }
}
</script>

<style lang="less" scoped>
.vux_switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 26px;
  border-radius: 26px;
  text-align: center;
  transition: background-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1);
  min-width: 40px;
  padding: 0 4px;
  border: 0;
  outline: 0;
  &.mini {
    padding: 0 2px;
    min-width: 36px;
    height: 20px;
  }

  .vux_switch-text {
    transition: all 0.3s cubic-bezier(0.25, 0.01, 0.25, 1);
    left: 100%;
    padding-left: 24px;
    text-align: center;
    color: #909399;
    font-size: 13px;

    &.mini {
      padding-left: 20px;
    }

    &.checked {
      left: 0;
      transition: all 0.3s cubic-bezier(0.25, 0.01, 0.25, 1);
      transform: translateX(-24px);
      &.mini {
        transform: translateX(-18px);
      }
      color: #fff;
    }
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loading {
    width: 8px;
    height: 8px;
    border: 1px solid #C0C4CC;
    &.checked {
      border: 1px solid #1989fa;
    }

    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
    animation: loading 1s cubic-bezier(0.25, 0.01, 0.25, 1) infinite;
  }

  @keyframes loading {
    from {
      transform: rotatez(0deg);
    }
    to {
      transform: rotatez(360deg);
    }
  }
}

.vux_switch-ball {
  transition: all 0.3s cubic-bezier(0.25, 0.01, 0.25, 1);
  position: absolute;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background-color: #fff;

  &.mini {
    width: 16px;
    height: 16px;
    border-radius: 16px;
  }

  &.checked {
    transform: translateX(-100%);
    left: calc(100% - 2px);

  }
}


</style>
