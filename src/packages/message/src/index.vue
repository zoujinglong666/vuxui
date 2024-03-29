<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
        v-show="isShowMyMessage"
        :class="[
        'messageBox',
        center ? 'horizontal' : '',
        typeArr.includes(type) ? type : '',
      ]"
        :style="controlTop"
        @mouseenter="clearTimerFn"
        @mouseleave="startTimerFn"
    >
      <span> {{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "VuxMessage",
  props: {
    count: {
      // 统计次数
      type: Number,
      default: 1,
    },
    cutCount: {
      // dom消失通知外界函数
      type: Function,
    },
  },
  data() {
    return {
      isShowMyMessage: false, // v-show的标识布尔值
      message: "", // 提示的消息文字
      timer: null, // 用来清除的定时器
      duration: 3000, // 默认3秒消失
      center: false, // 是否让水平文字居中，默认false
      type: "info", // 默认info类型
      typeArr: ["info", "success", "warning", "error"], // 总共4种类型
    };
  },
  computed: {
    controlTop() {
      return {
        // 距离顶部的位置，取决于创建了几个message
        top: `${12 + (this.count - 1) * 48}px`,
      };
    },
  },
  mounted() {
    this.startTimerFn(); // 开启定时器，默认3秒后销毁组件
  },
  methods: {
    // 开始定时器计时，要销毁dom元素
    startTimerFn() {
      // 时间大于0，才做计时消失隐藏
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close(); // 达到计时时间，就隐藏这个notice
        }, this.duration);
      }
    },
    // 鼠标移入，清除定时器，使dom永远存在；鼠标移出，再重新计时准备移除dom
    clearTimerFn() {
      clearTimeout(this.timer);
    },
    // 过渡动画消失时，会执行此钩子函数，销毁组件，同时移除dom
    handleAfterLeave() {
      // 在移除一个dom之前，要先通知外界的计数count减去一个，并让余下的所有dom都往上移动，即更改位置
      this.cutCount();
      // 然后移除dom
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    // 关闭隐藏dom
    close() {
      this.isShowMyMessage = false;
      /**
       * 注意当v-show为false的时候，会触发过渡动画消失钩子handleAfterLeave函数执行
       * 相当于在close函数中，执行了 this.handleAfterLeave()
       * */
    },
  },
};
</script>

<style lang="less" scoped>
// 默认样式
.messageBox {
  min-width: 160px;
  height: auto; // 高度由内容撑开
  padding: 8px; // 加上内边距
  border: 1px solid #e9e9e9;
  position: fixed; // 使用固定定位，使位置靠近顶部并居中
  z-index: 9999;
  top: 20px;
  left: 50%;
  transform: translateX(-50%); // 控制居中
  box-sizing: border-box;
  border-radius: 8px; // 加圆角好看一些
  background-color: #edf2fc;
  // 过渡效果
  transition: opacity 0.3s, transform 0.3s, top 0.3s;
  display: flex; // 开启弹性盒垂直居中
  align-items: center;
}

// 文字居中样式
.horizontal {
  justify-content: center;
}

.success {
  border: 1px solid #aee884;
  color: #48bc19;
  background-color: #f5ffea;
}

.info {
  border: 1px solid #86cfff;
  color: #166cff;
  background-color: #e2f6ff;
}

.warning {
  border: 1px solid #ffe38c;
  color: #f9a314;
  background-color: #fffae2;
}

.error {
  background-color: #fff0ee;
  color: #ff4446;
  border: 1px solid #ffccc7;
}

// 过渡效果样式
.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}



</style>
