<template>

  <div :class="[{'cell':cell}]" class="vux-checker">
    <div v-if="labelPosition==='left'" :class="{' vux-checker disabled':disabled}" :style="paddingLabelStyle"
         @click="toggleLabel()">
      <slot :class="{' vux-checker disabled':disabled}">{{ name }}</slot>
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
      <slot :class="{' vux-checker disabled':disabled}">{{ name }}</slot>
    </div>
  </div>
</template>
<script>

export default {
  name: "VuxCheckbox",

  data() {
    return {
      value: this.checkValue,
      cell: this.$parent.cell || false
    }
  }
  ,
  model: {
    prop: 'checkValue',
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
      type: [Number, String],
      default: 15
    },
    disabled: {
      type: Boolean
    }
    ,
    checkValue: {
      type: Boolean
    }
    ,
    name: {
      type: [String, Number, Object],
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
      default: 18
    },

    paddingLabel: {
      type: [Number, String],
      default: 6
    }


  }
  ,
  watch: {
    value(val) {
      this.checkValue = val;
    },

    checkValue(val) {
      this.handleEmit(val)
    }

  }
  ,
  computed: {
    checked() {
      if (this.$parent.value) {
        return this.$parent.value.indexOf(this.name) !== -1;
      }
      return this.value
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
        console.log(this.paddingLabel)
        return {

          paddingLeft: this.paddingLabel + 'px'
        }
      }
      return {
        paddingRight: this.paddingLabel + 'px'
      }


    },
    iconSizeStyle() {
      console.log(this.iconSize)
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
      if (this.$parent.value) {
        this.$parent.updateParent(this.name)
      } else {
        this.value = !this.value;
        this.$emit('click')
        this.handleEmit(this.value)
      }
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
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
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


</style>
