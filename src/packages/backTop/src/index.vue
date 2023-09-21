<template>
  <vux-fab v-show="show" @click.native="handleClick"></vux-fab>


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
      scrollEl: null,
      show: false
    }
  },

  watch: {},
  mounted() {
    this.$nextTick(() => {
      const target = document.querySelector(this.target)
      if (target) {
        this.scrollEl = target;
        this.scrollEl.addEventListener('scroll', this.showBackTop, false)
      }
    })
  },
  beforeDestroy() {
    // 最后要解除监听滚动事件
    this.scrollEl.removeEventListener("scroll", this.showBackTop, false);
  },
  methods: {
    showBackTop() {
      this.show = this.scrollEl.scrollTop > this.offset;
    },
    handleClick() {
      this.scrollEl.scrollTop = 0
    }
  }
}
</script>

<style scoped>


</style>
