<template>

  <div>
    <demo-block title="基本用法"></demo-block>
    <vux-cell title="选择单个日期" @click="single=true">
      {{ singleDate }}
    </vux-cell>
    <vux-cell title="选择日期范围" @click="range=true">
      {{ fromDate }}-{{ toDate }}
    </vux-cell>
    <demo-block title="显示农历"></demo-block>
    <vux-cell title="显示农历" @click="lunar=true">
      {{ fromDate }}-{{ toDate }}
    </vux-cell>
    <vux-calendar v-model="single" :value="singleDate" @confirm="singleConfirm"></vux-calendar>
    <vux-calendar v-model="range" :value="[fromDate,toDate]" type="range" @confirm="rangeConfirm"></vux-calendar>
    <vux-calendar v-model="lunar" :value="singleDate" show-lunar @confirm="singleConfirm"></vux-calendar>

  </div>
</template>

<script>
import VuxPopup from "@/packages/popup/index.vue";
import VuxCalendar from "@/packages/calendar/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Calendar",
  components: {DemoBlock, DemoPage, VuxCell, VuxCalendar, VuxPopup},
  data() {
    return {
      single: false,
      range: false,
      lunar: false,
      singleDate: '',
      fromDate: '',
      toDate: ''
    }
  },
  methods: {
    singleConfirm(date) {
      this.singleDate = date;

    },
    rangeConfirm(date) {
      const [from, to] = date;
      this.fromDate = from;
      this.toDate = to;


    }
  }
}
</script>

<style scoped>

</style>
