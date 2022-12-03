<template>
  <div class="vux-segmented-group">
    <label v-for="(item,index) in options" :key="index" ref="segmented"
           :class="[disabledStyle(item,index),selectedStyle(item,index)]"
           class="vux-segmented-label">
      <input class="vux-segmented-input" type="radio" @click="handleClickLabel(item,index)">
      <div class="vux-segmented-item-label">{{ prop ? item[label] : item }}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: "vuxSegmented",
  data() {
    return {
      singleData: '',
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


    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {

    singleDataCom() {
      if (this.prop) {
        this.singleData = this.options.find(it => it[this.prop] == this.value);
      } else {
        this.singleData = this.value;
      }
      return this.singleData
    }
  },
  methods: {

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

    handleClickLabel(item, index) {
      console.log(this.$refs.segmented);

      // this.startWidth=item;
      this.singleData = this.cancellable && this.singleData === item ? '' : item;
      if (!this.cancellable) {
        this.singleData = item;
      }
      if (this.prop) {
        this.$emit('input', this.singleData[this.prop])
        this.$emit('change', this.singleData[this.prop])
      } else {
        this.$emit('input', this.singleData)
        this.$emit('change', this.singleData)
      }

    }
  }
}
</script>

<style lang="less" scoped>
.vux-segmented-group {
  position: relative;
  display: flex;
  justify-items: flex-start;
  width: 100%;
  transition: all 0.3s linear;
  align-items: center;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #f5f5f5;
  padding: 2px;
  box-sizing: border-box;

  .vux-segmented-label {
    transition: all 0.3s cubic-bezier(.645, .045, .355, 1);
    position: relative;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-height: 28px;
    line-height: 28px;
    padding: 0 11px;


    &.vux-segmented-item-selected {
      background-color: #fff;
      color: rgba(0, 0, 0, .88);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
      transition: all 0.3s cubic-bezier(.645, .045, .355, 1);
    }

    &.vux-segmented-item-disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }


    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      inset-inline-start: 0;
      border-radius: 4px;

      transition: background-color .2s;
    }
  }


  //隐藏input
  .vux-segmented-input {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
}

</style>