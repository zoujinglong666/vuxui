<template>
  <div :class="[direction]" class="vux__steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuxSteps",
//   active	当前步骤对应的索引值	number | string	0
// direction	步骤条方向，可选值为 vertical	string	horizontal
// active-icon	当前步骤对应的底部图标，可选值见 Icon 组件	string	checked
// inactive-icon	非当前步骤对应的底部图标，可选值见 Icon 组件	string	-
// finish-icon v3.0.7	已完成步骤对应的底部图标，优先级高于 inactive-icon，可选值见 Icon 组件	string	-
// active-color	当前步骤和已完成步骤的颜色	string	#07c160
// inactive-color	未激活步骤的颜色	string	#969799
  data() {
    return {
      steps: [],
      value: this.active
    }
  },
  model: {
    prop: 'active'
  },
  timeLine: {
    type: Boolean,
    default: false
  },
  props: {
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].includes(val);
      },
    },
    activeIcon: {
      type: String,
      default: ""
    },
    inactiveIcon: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: "#0068ff"
    },
    inactiveColor: {
      type: String,
      default: "#999"
    }
  },

  watch: {
    steps(steps) {
      this.$children.forEach((item, index) => {
        steps.index = index;
      })
    },
    active(activeVal) {
      this.value = activeVal
    },
    value(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  created() {
  },
  methods: {

    updateParent(index) {
      console.log(index, 'FU')
      this.$emit('input', index)
      this.$emit('change', index)
      //这种方法也可以
      // this.$nextTick(() => {
      //   this.$emit('update:active', index)
      // })
    }
  }


}
</script>

<style lang="less" scoped>

.vux__steps {
  display: flex;
  //水平
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;

  &.vertical {
    flex-direction: column;
  }


}

</style>
