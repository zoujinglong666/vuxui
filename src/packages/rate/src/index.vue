<template>
  <div :style="rateStyle" class="vux__rate">
    <span v-for="item in countCom" :key="item" :style="[activeColorStyle(item),disabledStyle]"
          @click="handleClick(item)">
    <slot>
      <span v-if="icon">
        <i :class="iconStyle"></i>
      </span>
      <span v-else>★</span>
    </slot>
    </span>
  </div>
</template>

<script>
//todo  半选 和支持小数点
export default {
  name: "vuxRate",
  props: {
    value: {
      type: [String, Number]
    },
    count: {
      type: [String, Number], default: 5
    },
    size: {
      type: [String, Number],
      default: 12

    },
    gutter: {
      type: [String, Number]
    },
    color: {
      type: String, default: "#f7ba2a"

    },
    voidColor: {
      type: String, default: "#c8c9cc"
    },
    disabledColor: {
      type: String, default: "#c8c9cc"
    },
    icon: {
      type: String
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //只显示激活的  count  value
    onlyActive: {
      type: Boolean
    }

  },

  computed: {
    active() {
      return function (item) {
        return item <= this.valueCom
      }
    },
    countCom() {
      return this.onlyActive ? this.valueCom : this.count
    },
    valueCom: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("update:value", val)
      }
    },
    rateStyle() {
      return {
        fontSize: this.size + "px",
        letterSpacing: this.gutter + "px"
      }
    },
    disabledStyle() {
      if (this.disabled) {
        return {
          color: this.disabledColor
        }
      }
    },
    iconStyle() {
      return "iconfont" + " " + this.icon
    }
  },

  methods: {

    activeColorStyle(item) {
      if (this.active(item)) {
        return {
          color: this.color
        }
      } else {
        return {
          color: this.voidColor
        }
      }
    },
    handleClick(item) {
      if (this.onlyActive || this.disabled) {
        return
      }
      if (item === this.valueCom) {
        this.$emit("update:value", item--)
      }
      this.$emit("update:value", item)
      this.$emit("change", item)

    }
  }
}
</script>

<style lang="less" scoped>
.vux__rate {
  font-size: 12px;
  display: inline-flex;
  flex-wrap: wrap;
}
</style>
