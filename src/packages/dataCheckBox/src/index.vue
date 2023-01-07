<template>
  <div :class="checkBoxStyle" class="data-check-box">
    <span v-for="(item,index) in options" :key="index"
          :class="[size,theme,color,checkBoxStyle,disabledByStyle(item),selectActiveByStyle(item),{'check-mark':checkMark ,'round':round,
          'noBorder':noBorder}]"
          class="check-box-item"
          :style="{backgroundColor: selectActiveByStyle(item)?backgroundColor:'',borderColor: selectActiveByStyle(item)?backgroundColor:''}"
          @click="handleSelect(item)">
      <span v-if="item.icon" style="margin-right: 2px;font-size: 12px">
        <i :class="iconStyle(item)"></i>
      </span>
      {{ prop ? item[label] : item }}
    </span>
  </div>
</template>
<script>
const colorArr = ["primary", "success", "warning", "danger"]
const themeArr = ["dark", "light"]
const sizeArr = ["medium", "small", "large"] // 标签大小数组
export default {
  name: "VuxDataCheckbox",
  data() {
    return {
      singleData: '',
      multipleDateList: []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    //勾选之后显示小对勾
    checkMark: {
      type: Boolean,
    },
    //左右边距 类似element
    group: {
      type: Boolean,
    },
    //这里直接使用多个类型，默认值不需要，
    value: {type: [String, Number, Array, Boolean]},
    options: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'single',
      validator(val) {
        return ["single", "multiple"].includes(val);
      },
    },

    cancelable: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    max: {
      type: Number,
    },
    round: {
      type: Boolean,
    },
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'label'
    },
    theme: {
      type: String,
      default: "dark",
      validator(val) {
        return themeArr.includes(val)
      }
    },
    noBorder: {
      type: Boolean
    },
    color: {
      type: String,
      default: "primary",
      validator(val) {
        return colorArr.includes(val)
      }
    },
    size: {
      type: String,
      default: "large",
      validator(val) {
        return sizeArr.includes(val)
      }

    },
    backgroundColor: {
      type: String,
    }
  },
  created() {
  },
  computed: {

    multipleDateListCom() {
      if (Array.isArray(this.value) && this.type === 'multiple') {
        if (this.prop) {
          for (let item of this.options) {
            if (this.value.includes(item[this.label])) {
              this.multipleDateList.push(item)
            }
          }
        } else {
          this.multipleDateList = this.value
        }
      }
      return this.multipleDateList
    },
    singleDataCom() {
      if (this.type === 'single') {
        if (this.prop) {
          this.singleData = this.options.find(it => it[this.prop] == this.value);
        } else {
          this.singleData = this.value;
        }
      }
      return this.singleData
    }
  },
  watch: {},
  methods: {
    checkBoxStyle() {
      return {'group': this.group, 'round': this.round}
    },
    selectActiveByStyle(item) {
      if (item === this.singleDataCom || this.multipleDateListCom.some(it => it === item)) {
        return 'select-active'
      }
    },
    disabledByStyle(item) {
      if (this.disabled || item.hasOwnProperty('disabled') && item.disabled) {
        return 'disabled'
      }
    },

    iconStyle(item) {
      return 'iconfont' + ' ' + item.icon
    },
    handleSelect(item) {
      if (this.disabled || item.hasOwnProperty('disabled') && item.disabled === true) {
        return
      }
      this.$emit('click', item)
      switch (this.type) {
        case 'multiple':
          if (!this.multipleDateList.includes(item)) {
            if (this.multipleDateList.length === this.max) {
             alert('超出可选数量')
              return
            }
            this.multipleDateList.push(item);
          } else {
            this.multipleDateList = this.multipleDateList.filter(it => it !== item)
          }
          if (this.prop) {
            let list = this.multipleDateList.map(item => item[this.prop]) || []
            this.$emit('change', list, this.multipleDateList)
          } else {
            this.$emit('change', this.multipleDateList)

          }
          break;
        case 'single':

          this.singleData = this.cancelable && this.singleData === item ? '' : item;
          if (!this.cancelable) {
            this.singleData = item;
          }
          if (this.prop) {
            this.$emit('change', this.singleData[this.prop])
          } else {
            this.$emit('change', this.singleData)

          }
          break
      }
    }

  }
}
</script>

<style lang="less" scoped>
.data-check-box {
  &.group {
    border-radius: 2px;
    box-shadow: 0 0 0 0.5px #C0C4CC;
    //类似element ui
    margin: 0 !important;

  }

  &.round {
    border-radius: 40px !important;

  }


  .check-box-item {
    box-sizing: border-box;
    display: inline-flex;
    line-height: 1;
    justify-content: center;
    align-items: center;
    letter-spacing: normal;
    background-color: #eee;
    margin-right: 4px;
    border: 1px solid transparent;

    text-align: center;
    border-radius: 2px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    color: #606266;
    font-size: 13px;

    &.noBorder {
      border: none !important;
      border: 0;
    }

    &.group {
      margin: 0 !important;
      box-shadow: -0.5px 0 0 0 #C0C4CC;
    }

    &.round {
      border-radius: 40px !important;
    }

    &.disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }

    &.large {
      height: 30px;
      padding: 0 14px;
    }


  }

  .select-active {
    box-shadow: none !important;
    position: relative;
    overflow: hidden;


    &.check-mark {
      z-index: 1;
      height: 12px;
      padding: 6px;

      &.dark {
        &:before {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          border: 8px solid #fff;
          opacity: 0.85;
          border-top-color: transparent;
          border-left-color: transparent;
        }

        &.primary {
          &:after {
            content: '';
            width: 2px;
            height: 6px;
            position: absolute;
            right: 3px;
            bottom: 2px;
            border: 1px solid #0068ff;
            border-top-color: transparent;
            border-left-color: transparent;
            transform: rotate(45deg);
          }
        }

        &.success {
          &:after {
            content: '';
            width: 2px;
            height: 6px;
            position: absolute;
            right: 3px;
            bottom: 2px;
            border: 1px solid #07c160;
            border-top-color: transparent;
            border-left-color: transparent;
            transform: rotate(45deg);
          }
        }

        &.danger {
          &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 8px solid #fff;
            border-top-color: transparent;
            border-left-color: transparent;
          }

          &:after {
            content: '';
            width: 2px;
            height: 6px;
            position: absolute;
            right: 3px;
            bottom: 2px;
            border: 1px solid #ff4040;
            border-top-color: transparent;
            border-left-color: transparent;
            transform: rotate(45deg);
          }
        }

        &.warning {
          &:after {
            content: '';
            width: 2px;
            height: 6px;
            position: absolute;
            right: 3px;
            bottom: 2px;
            border: 1px solid #ff976a;
            border-top-color: transparent;
            border-left-color: transparent;
            transform: rotate(45deg);
          }
        }
      }

      &.light {
        &:after {
          content: '';
          width: 2px;
          height: 6px;
          position: absolute;
          right: 3px;
          bottom: 2px;
          border: 1px solid #fff;
          border-top-color: transparent;
          border-left-color: transparent;
          transform: rotate(45deg);
        }

        &.primary {
          &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 8px solid #0068ff;
            border-top-color: transparent;
            border-left-color: transparent;
          }


        }

        &.success {
          &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 8px solid #07c160;
            border-top-color: transparent;
            border-left-color: transparent;
          }


        }

        &.danger {
          &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 8px solid #ff4040;
            border-top-color: transparent;
            border-left-color: transparent;
          }


        }

        &.warning {
          &:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border: 8px solid #ff976a;
            border-top-color: transparent;
            border-left-color: transparent;
          }


        }
      }
    }
    &.primary {
      color: #0068ff;
      border-color: #0068ff;
      background-color: #ecf5ff;


      &.dark {
        background-color: #0068ff;
        border-color: #0068ff;
        color: #fff;
      }
    }

    &.success {
      background-color: #f0f9eb;
      border-color: #07c160;
      color: #07c160;

      &.dark {
        background-color: #07c160;
        border-color: #07c160;
        color: #fff;
      }


    }


    &.warning {

      background-color: #fdf6ec;
      border-color: #ff976a;
      color: #ff976a;

      &.dark {
        background-color: #ff976a;
        border-color: #ff976a;
        color: #fff;
      }


    }

    &.danger {

      background-color: #fef0f0;
      border-color: #ff4040;
      color: #ff4040;

      &.dark {
        background-color: #ff4040;
        border-color: #ff4040;
        color: #fff;
      }

    }

    &.large {
      height: 30px;
      padding: 0 14px;
    }

  }


}


</style>
