<template>
  <div ref="Rect" class="vux-down-menu">
    <div v-for="(item,key) in titleList" :key="key" class="vux-drop-down-menu title"
         @click="handleClickTitle(item,key)">
      <span :class="[disableStyle(item,key)]" :style="{color:activeColorStyle(item,key)}"
            class="ellipsis"
            style="font-weight: 500">{{ item.renderTitle() }}</span>
      <span :class="[disableStyle(item,key),activeColorSelect(item,key)?'down':'up']"
            :style="{color:activeColorStyle(item,key)}"
            class="icon" size="16" type="ios-arrow-up">^</span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import {useRect} from "../utils";

export default {
  name: "VuxDropdownMenu",
  data() {
    return {
      titleList: [],
      offset: 0
    }
  },
//   参数	说明	类型	默认值
//   active-color	菜单标题和选项的选中态颜色	string	#ee0a24
//   direction	菜单展开方向，可选值为up	string	down

  props: {
    activeColor: {
      type: String,
      default: '#0068ff'
    },
    direction: {
      type: String,
      default: 'down',
      validate(val) {
        return ['up', 'down'].includes(val)
      }
    },
    closeOnClickOverlay: {
      type: Boolean, default: true
    }
  },

  activated() {
    this.updateOffset()
  },
  mounted() {
    this.$nextTick(() => {
      this.titleList = this.$children;
      this.updateOffset()
    })
    window.addEventListener("resize", this.updateOffset, true);
    window.addEventListener("click", (e) => {
      this.clickOutElementClose(e)
    }, true);

  },
  methods: {
    activeColorStyle(item, index) {
      return this.activeColorSelect(item, index) ? this.activeColor : ''
    },
    activeColorSelect(item) {
      if (item.isOpen) {
        return item.text === item.title;
      }

    },
    disableStyle(item) {
      return item.disabled ? 'disabled' : '';
    },
    updateOffset() {
      //获取边距
      const rect = useRect(this.$refs.Rect);
      const {top, bottom} = rect;
      if (this.direction === 'down') {
        this.offset = bottom;
      } else {
        this.offset = window.innerHeight - top;
      }
    },
    clickOutElementClose(e) {
      const rect = this.$refs.Rect;
      if (!rect) {
        return
      }
      if (!rect.contains(e.target)) {
        this.$children.forEach(item => {
          item.toggle(false)
        });
      }
    },
    handleClickTitle(item, active) {

      console.log(item)

      if (item.disabled) {
        return
      }
      this.$children.forEach((item, index) => {
        if (active === index) {
          this.updateOffset()
          //调用当前实例方法
          item.toggle()
          //其他都关闭
        } else if (item.isOpen) {
          item.toggle(false)
        }
      })
    }

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateOffset)
    window.removeEventListener('click', this.clickOutElementClose)
  }


}
</script>

<style lang="less" scoped>
.vux-down-menu {
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex: 1;
  box-shadow: 0 2px 12px rgba(100, 101, 102, .12);


}


.vux-drop-down-menu {
  &.title {
    background-color: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    min-width: 0;

  }


}


.disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
}

.icon {
  &.up {
    transition: all 0.25s linear;
    transform: rotate(180deg);
  }

  &.down {
    transition: all 0.25s linear;
  }
}

</style>

