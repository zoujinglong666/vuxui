<template>
  <div :class="[direction]" :style="{gap:space+'px'}" class="vux__checkbox__group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VuxRadioGroup",
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
      type: [String, Number, Array],

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
      default: '#0068FF'
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
    closeOther(name) {

      this.$children.forEach((item) => {
        // 将除了自身以外的都置为false，故其他的就都折叠上了
        if (item.name !== name) {
          item.value = false;
        }
      });
    },
    updateParent(name) {
      this.closeOther(name)
      if (Array.isArray(this.checkedList)) {
        this.checkedList = [name]
        this.handleEmit(this.checkedList)

      } else if (typeof this.checkedList === 'string' || typeof this.checkedList === 'number') {
        this.checkedList = name
        this.handleEmit(this.checkedList)

      }

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