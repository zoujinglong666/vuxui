<template>


  <div>


    <vux-cell title="选择单个日期" @click="single=true">
      {{ singleDate }}
    </vux-cell>
    <vux-cell title="选择日期范围" @click="range=true">
      {{ fromDate }}-{{ toDate }}
    </vux-cell>
    <vux-calendar v-model="single" :value="singleDate" @confirm="singleConfirm"></vux-calendar>
    <vux-calendar v-model="range" :value="[fromDate,toDate]" type="range" @confirm="rangeConfirm"></vux-calendar>
  </div>

</template>

<script>
import VuxPopup from "@/packages/popup/index.vue";
import VuxCalendar from "@/packages/calendar/src/index.vue";

export default {
  name: "Calendar",
  components: {VuxCalendar, VuxPopup},
  data() {
    return {
      single: false,
      range: false,
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