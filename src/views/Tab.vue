<template>

  <div>
    <vux-tabs v-model="activeIndex">
      <vux-tab v-for="item in tabData" :key="item" :title="item">
        {{ item }}
      </vux-tab>
    </vux-tabs>

  </div>

</template>

<script>

import VuxTab from "@/packages/tab/src/index.vue";
import VuxTabs from "@/packages/tabs/src/index.vue";

export default {
  name: "Tab",
  components: {VuxTabs, VuxTab},
  data() {
    return {
      activeIndex: 0,
      value: "",
      tabData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tabData = Array.from({length: 5}, (_, i) => i + 1).map(item => {
        return "标签" + item;
      })
    })


  },
  methods: {},

}
</script>

<style lang="less" scoped>
.list {
  position: relative;
  height: 100%;

  .button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
  }
}

</style>
