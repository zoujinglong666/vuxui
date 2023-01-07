<template>
  <div v-if="isOpen" :style="[offsetStyle,heightStyle]"
       style="position: absolute;width: 100%;transition: ease 0.5s">
    <vux-drawer
        v-model="isOpen" :close-on-click-overlay="closeOnClickOverlay"
        :placement="directionStyle"
        style="position: absolute;overflow-y: auto;transition: ease 10s "
        @click.native="clickCloseMark">
      <!--      一行多列模式-->
      <div v-if="cols">
        <div class="vux-down-menu-container"
             style="">
          <div v-for="(item,index) in options" :key="index"
               :class="[disabledByStyle(item),activeColorSelect(item)?'check-mark':'']"
               :style="{flexBasis:options.length>cols?(100/cols)-2+'%':(100/options.length)-2+'%'}"
               class="vux-down-menu-cols"
               @click="handleClickItem(item)">
            <div :style="activeColorStyle(item)" style="flex: none">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <!--      普通模式-->
      <div v-for="(item,key) in options" v-else :key="key" class="vux-down-menu-item"
           @click="handleClickItem(item)">
        <div style="display: flex;justify-content: space-between;">
          <div :style="activeColorStyle(item)">{{ item.text }}</div>
          <div v-if="activeColorSelect(item)"><i :style="activeColorStyle(item)" class="iconfont icon-check"
                                                 style="font-weight: bold;">√</i></div>
        </div>
      </div>

      <slot></slot>
      <div class="vux-down-menu-footer">
        <template>
          <slot name="footer">

          </slot>
        </template>
      </div>
    </vux-drawer>

  </div>
</template>

<script>
export default {
  name: "vuxDropdownItem",
  data() {
    return {
      isOpen: false,
      height: 0,
    }
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type:
          [String, Number, Array, Boolean, Object]
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: [Number, String]
    },
    //一行多列,展示效果不一样
    cols: {
      type: Number,
    },
    options: {
      type: Array,
      default: () => []
    }


  },
  computed: {
    activeColor() {
      return this.$parent.activeColor
    },
    direction() {
      return this.$parent.direction
    },
    closeOnClickOverlay() {
      return this.$parent.closeOnClickOverlay
    },
    directionStyle() {
      return this.direction === 'down' ? 'top' : 'bottom';
    },
    offsetStyle() {

      if (this.direction === 'down') {
        return {
          top: this.$parent.offset + 'px',
        }
      } else {
        return {
          bottom: this.$parent.offset + 'px',
        }
      }

    },
    heightStyle() {
      if (this.direction === 'down') {
        return {
          height: this.height - this.$parent.offset + 'px',
        }
      } else {
        return {
          height: this.height + 'px',
        }
      }
    },

  },

  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.renderTitle();
      }

    }

  },
  activated() {
    this.init()
  },
  mounted() {
    this.init()

  },
  methods: {

    disabledByStyle(item) {
      if (this.disabled || item.hasOwnProperty('disabled') && item.disabled) {
        return 'disabled'
      }
      return ''
    },
    activeColorStyle(item) {
      return {
        color: this.activeColorSelect(item) ? this.activeColor : '',
      }
    },
    init() {
      this.height = window.innerHeight;
    },
    handleClickItem(option) {
      if (this.disabled || option.hasOwnProperty('disabled') && option.disabled) {
        return
      }
      this.$emit('input', option.value);
      this.$emit('change', option);
      this.isOpen = false;
      //这种方法也可以
      // this.$nextTick(()=>{
      //   this.$parent.renderTitle();
      // })
    },
    toggle(show = !this.isOpen) {
      if (show === this.isOpen) {
        return;
      }
      this.isOpen = show;

    },
    clickCloseMark() {
      if (!this.closeOnClickOverlay) {
        return
      }

      this.$children.forEach(item => {
        item.isOpen = false;
      })
    },
    activeColorSelect(item) {
      if (this.cols) {
        const res = this.options.filter(option => option.value === this.value)
        return res.some(temp => temp === item)
      }
      return item === this.options.find(item => item.value === this.value);

    },


  }
}
</script>


<style lang="less" scoped>


.vux-down-menu-item {
  height: 40px;
  line-height: 40px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}


.vux-down-menu-cols {
  position: relative;
  box-sizing: border-box;
  justify-content: space-around;
  display: inline-flex;
  align-items: center;
  min-width: 0;
  background-color: #ecf5ff;
  color: #333;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 2px;
  margin-top: 2%;;
  margin-left: 2%;
  font-size: 12px;

  &.check-mark {
    z-index: 1;
    padding: 4px;

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
}

.vux-down-menu-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px;
  margin-left: -2%;
  margin-top: -2%;
}

//伪元素解决两端对齐最有一个元素左对齐问题，推荐
.vux-down-menu-container:after {
  content: '';
  flex: 1;
  /* flex: auto; */
}

//伪元素解决两端对齐最有一个元素左对齐问题
//.vux-down-menu-container .vux-down-menu-cols:last-child {
//  margin-right: auto;
//}
.disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
}

.vux-down-menu-footer {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  user-select: none;
}
</style>
