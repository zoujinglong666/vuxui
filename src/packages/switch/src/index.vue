<template>
      <span :class="switchStyle" :style="{backgroundColor:checked?activeColor:inactiveColor}"
            class="vux_switch-content"
            @click="onClick">
      <span v-if="activeText||inactiveText" :class="switchStyle" class="vux_switch-text">{{
          checked ? maxlength(activeText, 6) : maxlength(inactiveText, 6)
        }}</span>
      <span
          :class="switchStyle"
          class="vux_switch-ball">
      <span v-if="loading">
      <i :class="{'loading':loading,'checked':checked}"></i>
    </span>
    </span>
    </span>
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
      default: '#07c160'
    },
    inactiveColor: {
      type: String,
      default: '#E4E7ED'
    },
    activeText: {
      type: String,
      default: ''
    },
    inactiveText: {
      type: String,
      default: ''
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

<style lang="scss" scoped>
.vux_switch-content {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 26px;
  border-radius: 26px;
  text-align: center;
  transition: background-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1);
  box-shadow: 0 0 0 0.5px #e2e0e0;
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
    transition: all 0.3s ease;
    left: 100%;
    padding-left: 24px;
    text-align: center;
    color: #909399;

    &.mini {
      padding-left: 20px;
    }

    &.checked {
      box-sizing: border-box;
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
      border: 1px solid #0068ff;
    }

    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
    animation: loading 1s cubic-bezier(0.25, 0.01, 0.25, 1) infinite;
  }

  @-webkit-keyframes loading {
    from {
      transform: rotatez(0deg);
    }
    to {
      transform: rotatez(360deg);
    }
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
  left: 1px;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: #fff;

  &.mini {
    width: 18px;
    height: 18px;
    border-radius: 18px;
  }

  &.checked {
    left: calc(100% - 1px);
    transform: translateX(-100%);
  }
}


</style>
