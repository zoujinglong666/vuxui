<template>
  <div>
    <vux-swipe v-model="active">
      <vux-swipe-item v-for="(item,index) in colors" :style="{background:item}">{{ index }}</vux-swipe-item>
    </vux-swipe>
  </div>
</template>

<script>
import VuxSwipeItem from "@/packages/swipeItem/src/index.vue";
import VuxSwipe from "@/packages/swipe/src/index.vue";

export default {
  name: "Swipe",
  data() {
    return {
      active: 2,
      colors: ['red', 'blue', 'red', 'blue', 'red', 'blue',]
    }
  },
  components: {VuxSwipe, VuxSwipeItem}

}
</script>

<style scoped>

</style>
