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
      scrollDom: null,
      show: false
    }
  },

  watch: {},
  mounted() {

    if (document.querySelector(this.target)) {
      this.scrollDom = document.querySelector(this.target);
      console.log(this.scrollDom)
      this.scrollDom.addEventListener('scroll', this.showBackTop, false)


    }

  },
  beforeDestroy() {
    // 最后要解除监听滚动事件
    this.scrollDom.removeEventListener("scroll", this.showBackTop, false);
  },
  methods: {
    showBackTop() {
      console.log(1)
      console.log(this.scrollDom.scrollTop, 'this.scrollDom.scrollTop')
      this.show = this.scrollDom.scrollTop > this.offset;
      console.log(this.scrollDom)

    },
    handleClick() {
      this.scrollDom.scrollTop = 0
    }
  }
}
</script>

<style scoped>


</style>
