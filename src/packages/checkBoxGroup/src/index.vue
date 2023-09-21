<template>
  <div :class="[direction]" :style="{gap:space+'px'}" class="vux__checkbox__group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VuxCheckboxGroup",
  data() {
    return {
      checkedList: this.value
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean
    },
    max: {
      type: Number
    },
    space: {
      type: Number,
      default: 10

    },
    direction: {
      type: String,
      default: 'vertical',
      validator(val) {
        return ['horizontal', 'vertical'].includes(val);
      },
    },
    checkedColor: {
      type: String,
      default: '#1989fa'
    },
    cell: {
      type: Boolean
    }

  },
  watch: {
    value(value) {
      this.checkedList = value;
    },
  },
  methods: {
    handleEmit(data) {
      this.$emit('input', data)
      this.$emit('change', data)
    },

    toggleAll(options) {
      let trueChildren = this.$children.filter(item => !item.disabled).map(item => item.name)

      if (typeof options === 'boolean' && options === true) {
        this.handleEmit(trueChildren)
      } else {
        const falseChildren = trueChildren.filter(item => {
          return this.checkedList.indexOf(item) === -1
        })
        this.handleEmit(falseChildren)
      }


    },
    updateParent(name) {
      if (!this.checkedList.includes(name)) {

        if (this.checkedList.length === this.max) {
          return
        }
        this.checkedList.push(name)

      } else {
        this.checkedList = this.checkedList.filter(it => it !== name)
      }
      this.handleEmit(this.checkedList)
    },
  }
}
</script>

<style lang="less" scoped>
.vux__checkbox__group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  &.vertical {
    flex-direction: column;
  }

}

</style>
