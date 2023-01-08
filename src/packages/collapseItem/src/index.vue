<template>
  <div class="vux-collapse-item">
    <div :class="[disabled?'disabled':'',]" class="vux-collapse-item-header" @click="handleOpenContent">
      <div>
        <slot name="title">
          <span class="vux-collapse-item-ellipsis">{{ title }}</span>
        </slot>
      </div>
      <div style="display: flex;align-items: center;">
        <span><slot name="describe"></slot></span>
        <span v-if="showOperation||showOperationItem">{{ isOpen ? stowText : openText }}</span>
        <span :class="isOpen?'down':'up'" class="icon"
        >^</span>
      </div>

    </div>
    <transition-height :show="isOpen">
      <div class="vux-collapse-item-body">
        <slot></slot>
      </div>
    </transition-height>
    <!--    <div class="vux-collapse-item-body" v-show="isOpen">-->
    <!--      <slot></slot>-->
    <!--    </div>-->
  </div>
</template>

<script>
import transitionHeight from "../../transitionHeight/src";

export default {
  name: "vuxCollapseItem",
  components: {transitionHeight},
  props: {
    title: {
      type: [String, Number],
    },

    name: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showOperationItem: {
      type: Boolean,
      default: false
    },
    openText: {
      type: String,
      default: "展开",
    },
    stowText: {
      type: String,
      default: "收起",
    },


  },
  data() {
    return {
      // 把父组件的props传进来当作子组件的data使用
      isOpen: this.$parent.activeNames.includes(this.name),
      showOperation: this.$parent.showOperation || false
    }
  },
  methods: {
    //展开其内容以及小箭头改变方向
    handleOpenContent() {
      if (this.disabled) {
        return
      }
      this.isOpen = !this.isOpen;
      this.$parent.updateParent(this.name, this.isOpen, this); // 于此同时也要通知父组件去更新

    },

  }
}
</script>

<style lang="less" scoped>
.vux-collapse-item-header {
  position: relative;
  color: #303133;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;


  .vux-collapse-item-ellipsis {
    width: 200px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    -webkit-line-clamp: 1; /* 这里是超出几行省略 */
    overflow: hidden;
  }

  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }

  .icon {

    &.up {
      transition: all 0.5s ease-in-out;
      transform: rotate(180deg);
    }

    &.down {
      transition: all 0.5s ease-in-out;
    }

  }

}

.vux-collapse-item-body {
  box-sizing: border-box;
  padding: 0 10px;
  min-height: 40px;
  line-height: 40px;

  width: 100%;
  height: auto;


}

.vux-collapse-item:last-child .vux-collapse-item-header {
  border-bottom: none;
}

.vux-collapse-item:last-child {
  border-bottom: none;
}

.vux-collapse-item-header::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  bottom: 0;

  border-bottom: 1px solid #e9e9e9;
  width: 100%;
  transform: scaleY(.5);
}

</style>
