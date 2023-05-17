<template>
  <transition name="vux_message-fade" @after-leave="onAL">
    <div v-show="show" :class="[type]" :style="controlTop" class="vux_message">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "VuxMessage",
  // message	消息文字	string / VNode	—	—
// type	主题	string	success/warning/info/error	info
// iconClass	自定义图标的类名，会覆盖 type	string	—	—
// dangerouslyUseHTMLString	是否将 message 属性作为 HTML 片段处理	boolean	—	false
// customClass	自定义类名	string	—	—
// duration	显示时间, 毫秒。设为 0 则不会自动关闭	number	—	3000
// showClose	是否显示关闭按钮	boolean	—	false
// center	文字是否居中	boolean	—	false
// onClose	关闭时的回调函数, 参数为被关闭的 message 实例	function	—	—
// offset	Message 距离窗口顶部的偏移量	number	—	20

  data() {
    return {
      message: "",
      type: 'success',
      duration: 3000,
      center: true,
      onClose: null,
      offset: 20,
      show: false,
      timer: null,
    }
  },
  props: {

    onClose: {
      type: Function,
      default: null
    }
  },
  mounted() {
    this.start()
  },

  watch: {
    show(newVal) {
      // if (!newVal) {
      //   this.onAL()
      // }
    }
  },
  computed: {
    controlTop() {
      return {
        // 距离顶部的位置，取决于创建了几个message
        top: `${this.offset}px`,
      };
    },
  },
  methods: {
    start() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      }
    },
    clear() {
      clearTimeout(this.timer)
    },
    close() {
      this.show = false;
    },
    onAL() {
      this.onClose();
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  },

}
</script>

<style lang="less" scoped>

.vux_message {
  min-width: 120px;
  height: auto; // 高度由内容撑开
  padding: 16px; // 加上内边距
  height: 32px;
  line-height: 32px;
  text-align: left;
  padding: 0 8px;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  color: #333;
  // 过渡效果
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  font-size: 13px;

  &.success {
    border: 1px solid #aee884;
    background-color: #f5ffea;
  }

  &.info {
    border: 1px solid #86cfff;
    background-color: #e2f6ff;
  }

  &.warning {
    border: 1px solid #ffe38c;
    background-color: #fffae2;
  }

  &.error {
    background-color: #fff0ee;
    border: 1px solid #ffccc7;
  }


}

.vux-message-fade-enter,
.vux-message-fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
</style>