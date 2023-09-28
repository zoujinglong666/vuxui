<script>

import VuxBottomSheet from "@/packages/bottomSheet/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import VuxTab from "@/packages/tab/src/index.vue";
import VuxTabs from "@/packages/tabs/src/index.vue";

export default {
  name: "BottomSheet",
  components: {VuxTabs, VuxTab, VuxCell, VuxButton, VuxBottomSheet},
  data() {
    return {
      show: true,
      show1: true,
      show2: true,
      initHeight: 100,
      initHeight1: 120,
      initHeight2: 140,
      activeIndex: 1
    }
  },

  methods: {}
}

</script>

<template>
  <div>
    <vux-tabs v-model="activeIndex">
      <vux-tab title="基本用法">
        <div style="display: flex;align-items: center;justify-content: center;height: 200px">
          <vux-bottom-sheet :height.sync="initHeight" :show.sync="show" round>
          </vux-bottom-sheet>
        </div>
      </vux-tab>
      <vux-tab title="自定义锚点">
        <div style="display: flex;align-items: center;justify-content: center;height: 200px">
          <vux-bottom-sheet :anchors="[30, 50, 60]" :height.sync="initHeight1" :show.sync="show1" round>
          </vux-bottom-sheet>
        </div>
      </vux-tab>
      <vux-tab title="仅头部拖拽">
        <div style="display: flex;align-items: center;justify-content: center;height: 200px">
          <vux-bottom-sheet :anchors="[ 50, 80]" :height.sync="initHeight2" :show.sync="show2" round>
          </vux-bottom-sheet>
        </div>
      </vux-tab>
    </vux-tabs>

  </div>
</template>

<style lang="less" scoped>

</style>
