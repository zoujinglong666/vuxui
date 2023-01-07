<template>
  <div>
    <p>
      基本用法
    </p>
    <vux-progress v-model="value">

    </vux-progress>
    <p>线条粗细</p>
    <vux-progress v-model="value" size="base">

    </vux-progress>

    <p>样式定制</p>
    <vux-progress v-model="value" strokeColor="red" tipText="粉色">

    </vux-progress>
    <vux-progress v-model="value1" strokeColor="pink" tipText="粉色">

    </vux-progress>
    <vux-progress v-model="value2" strokeColor="blue" tipText="蓝色">

    </vux-progress>
  </div>

</template>

<script>
export default {
  name: "Progress",
  data() {
    return {
      value: 50,
      value1: 60,
      value2: 70,
    }
  },
  components: {}

}
</script>

<style scoped>

</style>