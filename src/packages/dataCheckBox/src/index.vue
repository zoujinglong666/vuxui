<template>
  <div :class="checkBoxStyle" class="data-check-box">
    <span v-for="(item,index) in options" :key="index"
          :class="[size,theme,color,checkBoxStyle,disabledByStyle(item),selectActiveByStyle(item)]"
          :style="{backgroundColor: selectActiveByStyle(item)?backgroundColor:'',borderColor: selectActiveByStyle(item)?backgroundColor:''}"
          class="check-box-item"
          @click="handleSelect(item)">
      <span v-if="item.icon">
        <i :class="iconStyle(item)"></i>
      </span>
      {{ prop ? item[label] : item }}
    </span>
  </div>
</template>

<script>
const colorArr = ["primary", "success", "warning", "danger"]
const themeArr = ["dark", "plain"]
const sizeArr = ["medium", "small", "large"] // 标签大小数组
export default {
  name: "VuxDataCheckBox",
  data() {
    return {
      singleData: '',
      multipleDataList: []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
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

    cancellable: {
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

    multipleDataListCom() {
      if (Array.isArray(this.value) && this.type === 'multiple') {
        if (this.prop) {
          for (let item of this.options) {
            if (this.value.includes(item[this.label])) {
              this.multipleDataList.push(item)
            }
          }
        } else {
          this.multipleDataList = this.value
        }
      }
      return this.multipleDataList
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
      if (item === this.singleDataCom || this.multipleDataListCom.some(it => it === item)) {
        return 'select-active'
      }
      return ''
    },
    disabledByStyle(item) {
      if (this.disabled || item.hasOwnProperty('disabled') && item.disabled) {
        return 'disabled'
      }
      return ''
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
          if (!this.multipleDataList.includes(item)) {
            if (this.multipleDataList.length === this.max) {
              this.$msg.info('超出可选数量')
              return
            }
            this.multipleDataList.push(item);
          } else {
            this.multipleDataList = this.multipleDataList.filter(it => it !== item)
          }
          if (this.prop) {
            let options = this.multipleDataList.map(item => item[this.prop]) || []
            this.$emit('change', options, this.multipleDataList)
          } else {
            this.$emit('change', this.multipleDataList)

          }
          break;
        case 'single':
          this.singleData = this.cancellable && this.singleData === item ? '' : item;
          if (!this.cancellable) {
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    margin: 0 2px;
    text-align: center;
    border-radius: 2px;
    border: 1px solid transparent;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    color: #606266;
    font-size: 13px;

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
      height: 28px;
      padding: 0 14px;
    }


  }

  .select-active {
    box-shadow: none !important;

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
      height: 28px;
      padding: 0 14px;
    }


  }
}


</style>
