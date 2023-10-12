<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-segmented v-model="value" :options="['上海','北京','深圳']" block></vux-segmented>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-segmented v-model="value" :options="['上海','北京','深圳']"></vux-segmented>
  </div>
</template>
<script>
import VuxSegmented from "@/packages/segmented/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Segmented",
  components: {DemoBlock, DemoPage, VuxSegmented},
  data() {
    return {
      value: '深圳'
    }
  }

}
</script>

<style scoped>

</style>
