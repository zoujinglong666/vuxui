<template>
  <div>

    <vux-button type="success" @click="handleSuccessMsg">
      成功消息
    </vux-button>
    <vux-button type="danger" @click="handleErrorMsg">
      危险消息
    </vux-button>


  </div>
</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "Message",
  components: {VuxButton},
  methods: {
    handleSuccessMsg() {
      this.$msg({
        message: '成功消息', type: 'success'
      })
    },
    handleErrorMsg() {
      this.$msg({
        message: '危险消息', type: 'error'
      })
    }
  }
}
</script>

<style scoped>

</style>
