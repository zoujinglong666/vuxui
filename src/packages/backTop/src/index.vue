<template>
    <vux-fab v-show="show" @click.native="handleClick"></vux-fab>

</template>

<script>

import VuxFab from "@/packages/fab/src/index.vue";

export default {
  name: "vuxBackTop",
  components: {VuxFab},

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
      const target = document.querySelector(this.target);
      if (!target) {
        return
      }
      this.scrollEl = target;
      this.scrollEl.addEventListener('scroll', this.showBackTop, false)
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
      this.scrollEl.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  }
}
</script>

<style scoped>


</style>
