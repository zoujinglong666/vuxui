<template>
  <div class="vux-tree-select">
    <div class="vux-tree-select left">
      <div
          v-for="(text,index) in mainActiveTexts"
          :key="index"
          :class="[newMainActiveIndex===index?'vux-selected-left-item':'vux-tree-select-left-item',text.disabled?'vux-tree-select disabled':'']"
          @click="handleLeftItem(text,index)">
        {{ text.text }}
      </div>
    </div>
    <div class="vux-tree-select right">
      <div v-for="(children,index) in childrenArr[newMainActiveIndex]" :key="index"
           class="vux-tree-select-right-item" @click="handleRightItem(children,index)"
      >

        <div :class="[children.disabled?'vux-tree-select disabled':'']" :style="activeColorStyle(children)">
          {{ children.text }}
        </div>
        <div v-if="activeColorSelect(children,index)" :style="activeColorStyle(children)">
          <Checkmark :color="activeColor" :style="activeColorStyle(children)"></Checkmark>
        </div>
      </div>
      <slot name="content">

      </slot>

    </div>
  </div>
</template>

<script>
import Checkmark from "@/components/Checkmark.vue";

export default {
  name: "VuxTreeSelect",
  components: {Checkmark},
  data() {
    return {
      activeIdItem: {},
      activeIds: []

    }
  },
  model: {
    prop: "mainActiveIndex"
  },
  computed: {
    newActiveId: {
      get() {
        return this.activeId
      },
      set(val) {
        //使用 父组件加入.sync
        this.$emit('update:active-id', val)
      },

    },
    mainActiveTexts() {
      if (this.options) {
        return this.options.map(item => {
          return {
            text: item.text,
            disabled: item.disabled || false
          }
        }) || []
      }
    },
    childrenArr() {
      if (this.options) {
        return this.options.map(item => item.children).filter(Boolean) || []
      }
    },
    newMainActiveIndex: {
      get() {
        return this.mainActiveIndex
      },
      set(val) {
        this.$emit('input', val)
      },

    },


  },
  methods: {

    handleLeftItem(text, index) {
      if (text.disabled) {
        return
      }
      this.newMainActiveIndex = index;
      this.$emit('click-nav', this.newMainActiveIndex)

    },
    handleRightItem(childrenItem) {
      if (childrenItem.disabled) {
        return
      }
      this.$emit('click-item', childrenItem)

      if (Array.isArray(this.activeId)) {
        const childrenItemId = childrenItem.id;
        if (!this.newActiveId.includes(childrenItemId)) {
          this.newActiveId.push(childrenItemId)
        } else {
          this.newActiveId = this.newActiveId.filter(it => it !== childrenItemId);
        }
      }
      this.activeIdItem = childrenItem;
    },
    activeColorSelect(item, index) {
      if (Array.isArray(this.activeId)) {
        return this.newActiveId.some(id => id === item.id)
      } else {
        return item === this.activeIdItem;
      }


    },
    activeColorStyle(item) {
      return {
        color: this.activeColorSelect(item) ? this.activeColor : '',
        fontWeight: this.activeColorSelect(item) ? 'bold' : ""
      }
    },
  },
  props: {
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    options: {
      type: Array,
      default: () => []
    },
    height: {
      type: [Number, String],
      default: 300
    },
    mainActiveIndex: {
      type: [Number, String],
      default: 0

    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    selectedIcon: {
      type: String
    },
    activeId: {
      type: [Number, Array],
    }
  }
}
</script>

<style lang="less" scoped>
.vux-tree-select {
  display: flex;

  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }


  &.left {
    background-color: #F7F8FA;
    width: 30%;
    flex-direction: column;

    .vux-tree-select-left-item {
      position: relative;
      padding: 14px 12px;
    }

    .vux-selected-left-item {
      position: relative;
      padding: 14px 12px;
      background: #fff;
      transition: all 0.5s ease-in-out;

      &:before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: #1989fa;
        transform: translateY(-50%);
        content: "";
        transition: all 0.5s ease-in-out;
      }
    }

  }

  &.right {
    width: 70%;
    flex: 1;
    flex-direction: column;

    .vux-tree-select-right-item {
      position: relative;
      padding: 14px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

    }
  }
}
</style>
