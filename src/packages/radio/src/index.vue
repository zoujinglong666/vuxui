<template>

  <div :class="[{'cell':cell}]" class="vux-checker">
    <div v-if="labelPosition==='left'" :class="{' vux-checker disabled':disabled}" :style="paddingLabelStyle"
         @click="toggleLabel()">
      <slot :class="{' vux-checker disabled':disabled}"></slot>
    </div>
    <div :class="[shape,{'checked':checked,'disabled':disabled}]"
         :style="checkBoxStyle"
         class="vux-checker-inner"
         @click="toggle">
      <slot v-if="checked"
            :style="iconSizeStyle" name="icon">
       <span class="vux-checker-icon">
          <i :style="iconSizeStyle" class=" checked iconfont icon-select-bold"></i>
        </span>
      </slot>
    </div>
    <div v-if="labelPosition==='right'" :class="{'vux-checker disabled':disabled}" :style="paddingLabelStyle"
         @click="toggleLabel()">
      <slot :class="{'vux-checker disabled':disabled}"></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: "VuxRadio",

  data() {
    return {
      cell: this.$parent.cell || false
    }
  }
  ,
  model: {
    prop: 'value',
  }
  ,
  props: {
    shape: {
      type: String,
      default: 'round',
      validator(val) {
        return ['round', 'square'].includes(val);
      },
    },
    iconSize: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean
    },
    name: {
      type: [Boolean, String, Number, Object, Array]
    }
    ,

    labelDisabled: {
      type: Boolean,
      default: false
    }
    ,
    labelPosition: {
      type: String,
      default:
          'right',
      validator(val) {
        return ["left", 'right'].includes(val);
      }
      ,
    }
    ,
    checkColor: {
      type: String,
      default: '#1989fa'
    },
    size: {
      type: [Number, String],
      default: 19
    },
    paddingLabel: {
      type: [Number, String],
      default: 6

    }


  }
  ,
  computed: {
    checkValue: {
      get() {
        return this.value
      },
      set(val) {
        this.handleEmit(val)
      }
    },
    checked() {
      return this.$parent.value === this.name
    },
    checkBoxStyle() {
      return {
        background: this.checked ? this.checkColor : '',
        borderColor: this.checked ? this.checkColor : '',
        width: this.size + 'px',
        height: this.size + 'px',

      }
    },
    paddingLabelStyle() {
      if (this.labelPosition === 'right') {
        return {
          paddingLeft: this.paddingLabel + 'px'
        }
      }
      return {
        paddingRight: this.paddingLabel + 'px'
      }


    },
    iconSizeStyle() {
      return {
        fontSize: this.iconSize + 'px',
        color: "#fff"
      }
    }


  },
  methods: {
    toggleLabel() {
      if (this.labelDisabled) {
        return
      }
      this.toggle()
    },
    handleEmit(data) {
      this.$emit('input', data)
      this.$emit('change', data)
    },
    toggle() {
      if (this.disabled) {
        return
      }
      this.$parent.updateParent(this.name)
    }
  }
}
</script>

<style lang="less" scoped>
.vux-checker {
  display: flex;
  align-items: center;

  &.cell {
    justify-content: space-between;
  }

  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }

  .vux-checker-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    box-sizing: border-box;
    position: relative;
    width: 19px;
    height: 19px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #c8c9cc;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;

    .vux-checker-icon {
      width: 12px;
      height: 12px;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);

      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff !important;
        font-size: 12px;
      }


    }


    &.round {
      border-radius: 50%;
    }

    &.checked {
      background: #1989fa;
    }

    &.disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }
  }


}

.checked {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}


</style>
