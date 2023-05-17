<template>


  <div>
    <vux-button @click="show=true">
      显示嵌套内容
    </vux-button>
    <vux-overlay :show.sync="show">

    </vux-overlay>
  </div>

</template>

<script>
import VuxOverlay from "@/packages/overlay/index.vue";

export default {
  name: "Overlay",

  components: {VuxOverlay},
  data() {
    return {
      show: false
    }
  },
  methods: {
    onclose() {
      console.log('close')
    }
  },

}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>