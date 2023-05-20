<template>
  <div>
    <div class="vux_stepper">
      <button v-show="showMinus" :disabled="disabledMinusBtn" :style="[disabledMinusBtn,buttonStyle]"
              class="vux_stepper_btn minus"
              @click="handleMinus">
        <x-icon class="vux_stepper_svg" size="20" type="ios-minus-empty"></x-icon>
      </button>
      <!--      inputmode="decimal "-->       <!--带小数点的键盘-->
      <input
          v-show="showInput"
          :disabled="disableInput"
          :style="inputStyle"
          ref="stepperIpt"
          v-model="currentValue"
          inputmode="decimal"
          class="vux_stepper_input"
          type="text"
          @focus="handleFocus"
          @blur="handleBlur"
      />
      <button v-show="showPlus" :disabled="disabledPlusBtn" :style="[disabledPlusBtn,buttonStyle]"
              class="vux_stepper_btn plus"
              @click="handlePlus">
        <x-icon class="vux_stepper_svg" size="20" type="ios-plus-empty"></x-icon>
      </button>
    </div>
  </div>
</template>
<script>
import {floatAdd} from "../utils/util";

const addUnit = (val, unit = 'px') => {
  return Number(val) + unit
}
const disabled = {
  opacity: 0.6,
  cursor: 'not-allowed'
}
export default {
  name: "vueStepper",
  props: {
    value: {
      type: [Number, String]
    },
    min: {
      type: [Number],
      default: 1
    },
    max: {
      type: [Number],
    },
    autoFixed: {
      type: Boolean
    },
    step: {
      type: [Number],
      default: 1
    },
    //唯一标识符
    name: {
      type: [Number, String],
      default: 1
    },
    //PX
    inputWidth: {
      type: [Number, String],
      default: 32

    },
    buttonSize: {
      type: [Number, String],
      default: 28
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    allowEmpty: {
      type: Boolean,
    },
    integer: {
      type: Boolean,
      default: false
    },
    disableInput: {
      type: Boolean,
    },
    //保留一位小数
    decimalLength: {
      type: [Number, String],
      default: 1
    }

  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  model: {
    prop: 'value',
  },
  computed: {
    //禁用按钮样式
    disabledMinusBtn() {
      if (this.currentValue <= this.min) {
        return disabled
      }
    },
    disabledPlusBtn() {
      if (this.currentValue >= this.max) {
        return disabled
      }
    },
    buttonStyle() {
      return {
        width: addUnit(this.buttonSize),
        height: addUnit(this.buttonSize)
      }
    },
    inputStyle() {
      return {
        width: addUnit(this.inputWidth),
        height: addUnit(this.buttonSize)

      }
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.handleEmitChange(val)
    }
  },
  methods: {

    handleMinus() {
      if (this.currentValue <= this.min) {
        return
      }
      let value = this.format(floatAdd(+this.currentValue, -this.step));
      this.changeValueBtn(value)
      this.$emit('minus')
    },
    handlePlus() {
      if (this.currentValue >= this.max) {
        return
      }
      let value = this.format(floatAdd(+this.currentValue, +this.step));
      this.changeValueBtn(value)
      this.$emit('plus')

    },
    changeValueBtn(value) {
      if (String(this.step).indexOf('.') !== -1 && !isNaN(this.step)) {
        value = Number(value.toFixed(this.decimalLength))
        this.handleEmitChange(value)
      } else {
        this.handleEmitChange(value)
      }
    },
    handleEmitChange(data) {
      this.$emit('input', data)
      this.$emit('change', data)
    },
    handleFocus(event) {
      if (this.disableInput) {
        return
      }
      this.$emit('focus', event)
    },
    handleBlur(event) {
      if (this.disableInput) {
        return
      }
      this.$emit('blur', event)
      const input = event.target;
      const value = input.value;
      this.handleEmitChange(this.format(+value))
    },
    format(value) {
      const {min, max, allowEmpty, integer} = this;
      const numValue = Number(value);
      if (allowEmpty && value === '') {
        return '';
      }
      if (integer) {
        return Math.floor(numValue);
      }
      return isNaN(numValue) || numValue < min ? min : numValue > max ? max : numValue;
    }


  }

}
</script>

<style lang="less" scoped>
.vux_stepper {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;

  .vux_stepper_input {
    border: 0;
    border-radius: 0 !important;
    outline: none;
    text-align: center;
    background-color: #f2f3f5;
    color: #323233;
    font-size: 14px;
  }
  .vux_stepper_btn {
    box-sizing: border-box;
    border: 0;
    outline: none;
    background-color: #f2f3f5;
    color: #323233;

    &.minus {
      border-radius: 4px 0 0 4px;
    }

    &.plus {
      border-radius: 0 4px 4px 0;
    }
  }
  .vux_stepper_svg {
    fill: #000;
  }
}


</style>
