<script>


export default {


  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String], default: 24

    },
    color: {
      type: [String],
      default: '#333'
    }


  },


}
</script>

<template>
  <svg :height="height" :width="width" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path :stroke="color" d="M10 24L20 34L40 14" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
  </svg>
</template>

<style lang="less" scoped>

</style>
