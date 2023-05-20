<template>
  <div :class="[direction]" :style="{gap:space+'px'}" class="vux__checkbox__group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VuxRadioGroup",
  data() {
    return {}
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: [Boolean, String, Number, Object, Array]
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
  computed: {
    checkList: {
      get() {
        return this.value
      },
      set(val) {
        this.handleEmit(val)
      }
    }
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
      this.handleEmit(name)
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
