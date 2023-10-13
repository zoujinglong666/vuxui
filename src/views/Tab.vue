<template>

  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-tabs v-model="activeIndex">
      <vux-tab v-for="item in tabData" :key="item" :title="item">
        <div style="display: flex;align-items: center;justify-content: center;height: 200px">
          {{ item }}
        </div>
      </vux-tab>
    </vux-tabs>
  </div>

</template>

<script>

import VuxTab from "@/packages/tab/src/index.vue";
import VuxTabs from "@/packages/tabs/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Tab",
  components: {DemoBlock, VuxTabs, VuxTab},
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
</style>
