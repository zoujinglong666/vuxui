<template>
  <div :class="{'block':block}" class="vux-segmented-group">
    <div v-for="(item,index) in options" :key="index" ref="segmented"
         :class="[disabledStyle(item,index),selectedStyle(item,index),{'block':block}]"
         class="vux-segmented-label" @click="handleClickLabel(item,index)">
      <div class="vux-segmented-item-label">{{ prop ? item[label] : item }}</div>
    </div>
    <div :style="barStyle" class="vux-segmented-bar"></div>
  </div>
</template>

<script>
export default {
  name: "vuxSegmented",
  data() {
    return {
      singleData: '',
      width: 0,
      height: 0,
      offsetLeft: 0
    }
  },
  model: {
    prop: 'value'
  },
  props: {
    disabled: {
      type: Boolean
    },
    cancellable: {
      type: Boolean
    },
    prop: {
      type: String,
    },
    label: {
      type: String,
      default: 'label'
    },
    //这里直接使用多个类型，默认值不需要，
    value: {
      type: [String, Number, Array, Boolean]
    },
    block: {
      type: Boolean
    },


    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    barStyle() {
      return {
        width: this.width - 2 + 'px',
        height: this.height + 'px',
        transform: ` translateX(-50%) translateX(${this.offsetLeft}px) `,
      }

    },

    singleDataCom() {
      if (this.prop) {
        this.singleData = this.options.find(it => it[this.prop] == this.value);
      } else {
        this.singleData = this.value;
      }
      return this.singleData
    },
    activeIndex() {
      let index = -1;
      if (this.prop) {
        index = this.options.findIndex(it => it[this.prop] == this.value);
      } else {
        index = this.options.findIndex(it => it == this.value);
      }
      return index
    }
  },

  watch: {
    activeIndex: {
      handler(n, o) {
        if (n !== o) {
          console.log(n, o)
          this.initActive()
        }
      }, immediate: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.initActive)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initActive)
  },
  methods: {
    initActive() {

      if (this.activeIndex >= 0) {
        console.log(this.activeIndex)
        this.getOffsetLeftByIndex(this.activeIndex)
      }
    },
    getOffsetLeftByIndex(index) {
      this.$nextTick(() => {
        console.log(this.$refs.segmented)
        const title = this.$refs.segmented[+index];
        console.log(title)
        if (title) {

          this.width = title.getBoundingClientRect().width;
          this.height = title.getBoundingClientRect().height;
          this.offsetLeft = title.offsetLeft + title.offsetWidth / 2;
        }
      })

    },
    selectedStyle(item) {
      if (item === this.singleDataCom) {
        return 'vux-segmented-item-selected'
      }
    },
    disabledStyle(item) {
      if (this.disabled || item.hasOwnProperty('disabled') && item.disabled) {
        return 'vux-segmented-item-disabled'
      }
    },

    emitChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    handleClickLabel(item, index) {

      this.singleData = this.cancellable && this.singleData === item ? '' : item;
      if (!this.cancellable) {
        this.singleData = item;
      }
      if (this.prop) {
        this.emitChange(this.singleData[this.prop])
      } else {
        this.emitChange(this.singleData)
      }

    }
  }
}
</script>

<style lang="less" scoped>
.vux-segmented-group {
  position: relative;
  display: inline-flex;
  //justify-items: flex-start;
  //transition: all 0.3s linear;
  align-items: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #f5f5f5;
  box-sizing: border-box;

  &.block {
    width: 100%;

  }

  .vux-segmented-label {

    z-index: 1;
    position: relative;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 28px;
    line-height: 28px;
    padding: 0 14px;
    box-sizing: border-box;
    color: #666;

    &.block {
      flex: 1;

    }

    &.vux-segmented-item-selected {
      color: #333;
    }

    &.vux-segmented-item-disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }

  }


  .vux-segmented-bar {
    position: absolute;
    display: inline-block;
    border-radius: 4px;
    background-color: #fff;
    transition: all 0.3s;

  }
}

</style>
