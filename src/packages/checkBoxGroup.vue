<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "checkBoxGroup",
  model: {
    prop: 'checkGroupValue',
    event: 'change'
  },
  props: {
    checkGroupValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value: this.checkGroupValue
    }
  },
  watch: {
    checkGroupValue(val) {
      console.log(val)
      this.checkGroupValue = val;
    }
  }
}
</script>

<style scoped>

</style>