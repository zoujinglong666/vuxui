<template>
  <div v-show="show"
       v-touch:swipeleft="leftSlide"
       style="width: 100%;"
       v-touch:swiperight="rightSlide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuxTab",
  data() {
    return {
      show: false
    }
  },
  props: {
    title: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean
    },
    dot: {
      type: Number
    },
    name: {
      //唯一标识符
      type: [String, Number]
    },
    url: {
      type: String,
    },
    to: {
      type: String,
    },
  },

  computed: {

    currentIndex: {
      get() {
        return this.$parent.currentIndex

      },
      set(val) {
        this.$parent.updateCurrentIndex(val)
      }
    },
    tabsTitleList() {
      return this.$parent.tabsTitleList
    }
    ,
    swipeable() {
      return this.$parent.swipeable
    },
  },
  watch: {
    // currentIndex(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.$parent.updateCurrentIndex(newVal)
    //   }
    // }
  },
  methods: {
    leftSlide() {
      if (!this.swipeable) {
        return;
      }
      if (this.currentIndex === this.tabsTitleList.length - 1) {
        return
      }
      ++this.currentIndex;
    },
    rightSlide() {
      if (!this.swipeable) {
        return;
      }
      if (this.currentIndex === 0) {
        return
      }
      --this.currentIndex;


    }
  }
}
</script>

<style scoped>

</style>
