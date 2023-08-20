<template>
  <vux-fab v-if="show" @click.native="handleClick"></vux-fab>
</template>

<script>
export default {
  name: "vuxBackTop",
  props: {
    zIndex: {
      type: [String, Number]
    },
    offset: {
      type: [String, Number],
      default: 200
    },
    target: {
      type: String
    }
  },
  data() {
    return {
      scrollDom: null,
      show: false
    }
  },
  mounted() {
    if (document.querySelector(this.target)) {
      this.scrollDom = document.querySelector(this.target);
      this.scrollDom.addEventListener('scroll', this.showBackTop, false);
    }
  },
  beforeDestroy() {
    this.scrollDom.removeEventListener("scroll", this.showBackTop, false);
  },
  methods: {
    showBackTop() {
      this.show = this.scrollDom.scrollTop > this.offset;
    },
    handleClick() {
      this.scrollDom.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    /**
     * @Description 节流函数
     * @param { Function } fn 需要做节流的函数
     * @param { Function } intervalTime 间隔实践
     * @param { Function } immediate 是否立即执行
     * @return { Number } intervalTime
     **/
    throttle(fn, intervalTime = 200, immediate = true) {
      let oldTime = Date.now();
      return function (...arg) {
        if (immediate) {
          fn.bind(this)(...arg);
          immediate = false;
        }
        let nowTime = Date.now();
        if (nowTime - oldTime >= intervalTime) {
          fn.bind(this)(...arg);
          oldTime = nowTime;
        }
      };
    },

    debounce(func, delay) {
      let timeoutId;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };
    }


  }
}
</script>

<style scoped>

</style>
