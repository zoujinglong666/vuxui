<script>

import VuxBottomSheet from "@/packages/bottomSheet/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";

export default {
  name: "BottomSheet",
  components: {VuxCell, VuxButton, VuxBottomSheet},
  data() {
    return {
      show: true,
      initHeight: 100
    }
  },

  methods: {
    onClick() {
      this.show = true;
    }
  }
}

</script>

<template>
  <div>
    <vux-bottom-sheet :height.sync="initHeight" :show.sync="show" round>
    </vux-bottom-sheet>
    <vux-button @click="onClick">{{ this.show }}</vux-button>
  </div>
</template>

<style lang="less" scoped>

</style>
