<template>
  <div>
    <div ref="tabRef" :style="tabsTitleStyle" class="vux_tab-title">
      <div v-for="(item,index) in tabsTitleList" :key="item.title" ref="titleRef"
           :style="[activeTitleStyle(item,index),disabledStyle(item,index)]" class="vux_tab-title item"
           @click="handleTitleItemClick(item,index)">
        <span>{{ item.title }}</span>
        <badge v-if="item.dot" :text="item.dot"></badge>
      </div>
      <div :style="lineStyle" class="vux_tab-title line"></div>
    </div>
    <slot>
    </slot>

  </div>
</template>
<script>
import {debounce} from "@/packages/tabs/src/index";

export default {
  name: "vuxTabs",
  data() {
    return {
      tabsTitleList: [],
      offsetLine: 0,
      currentIndex: this.active,
    }
  },
  props: {
    active: {
      type: [Number, String]
    },
    color: {
      type: String,
      default: '#0068ff'
    },
    background: {
      type: String,
      default: 'white'
    },
    duration: {
      type: [Number, String], default: 0.5
    },
    lineWidth: {
      type: [Number, String], default: 40
    },
    lineHeight: {
      type: [Number, String], default: 3
    },
    ellipsis: {
      type: Boolean
    },
    swipeable: {
      type: Boolean,
      default: true
    },
    titleActiveColor: {
      type: String,
      default: '#0068ff'
    },
    titleActiveSize: {
      type: [Number, String], default: 14
    },
    titleInactiveColor: {
      type: String,
      default: '#666'
    },
    beforeChange: {
      type: Function
    },
    scrollspy: Boolean
  },
  model: {
    prop: 'active',
  },
  mounted() {
    this.$nextTick(() => {
      this.tabsTitleList = this.$children;
      this.initActiveLine()
    })
    window.addEventListener('resize', this.debouncedGetLineOffset, false)
    this.$on('hooks:beforeDestroy', () => {
      window.removeEventListener('resize', this.debouncedGetLineOffset, false)
    })
  },
  activated() {
    this.initActiveLine()
  },
  watch: {
    active(val) {
      this.currentIndex = val;
    },
    currentIndex(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateCurrentIndex(newVal);
        this.initActiveLine()
      }

    }
  },
  computed: {
    lineStyle() {
      return {
        width: this.lineWidth + 'px',
        height: this.lineHeight + 'px',
        backgroundColor: this.backgroundColor,
        transform: `translateX(${this.offsetLine}px) translateX(-50%)`,
        transitionDuration: `${this.duration}s`

      }
    },
    activeTitleStyle() {
      return function (item, index) {
        return index === this.currentIndex ? {
          color: this.titleActiveColor,
          fontWeight: '500',
          fontSize: `${this.titleActiveSize}px`
        } : {
          color: this.titleInactiveColor
        };
      }
    },
    disabledStyle() {
      return function (item, index) {
        if (item.disabled) {
          return {
            opacity: 0.6,
            cursor: 'not-allowed'
          }
        }

      };
    },
    tabsTitleStyle() {
      return {
        background: this.background
      }
    }

  },
  methods: {
    initActiveLine() {
      this.showActive();
      this.debouncedGetLineOffset();
    },
    updateCurrentIndex(index) {
      this.$emit('input', index)
      this.$emit('change', index)
    },
    showActive() {
      this.$nextTick(() => {
        this.$children.some((childrenItem, i) => {
          childrenItem.show = this.currentIndex === i;
        })
      })
    },
    handleTitleItemClick(item, index) {
      if (item.disabled) {
        return
      }
      if (this.currentIndex === index) {
        return;
      }
      this.$emit('click', {
        title: item.title,
        name: item.name,
        index: index,
      })
      this.updateCurrentIndex(index)

    },
    debouncedGetLineOffset() {
      this.$nextTick(() => {
        this.debouncedGetLineOffset()
      })
    },

    debouncedGetLineOffset: debounce(function () {
      const titles = this.$refs.titleRef;
      const title = titles[+this.currentIndex];
      if (titles && title) {
        this.offsetLine = title.offsetLeft + title.offsetWidth / 2;
      }
    }, 100),


  },


}
</script>

<style scoped>

</style>
<style lang="less" scoped>
.vux_tab-title {
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  overflow-y: hidden;
  overflow-x: auto;
  //隐藏滚动条
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
    -webkit-overflow-scrolling: touch;
    -overflow-scrolling: touch;
  }


  &.item {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    min-width: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 16px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;

  }

  &.line {
    position: absolute;
    background-color: #0068ff;
    bottom: 0px;
    left: 0;
    z-index: 1;
    border-radius: 4px;
  }



}

</style>
