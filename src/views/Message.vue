<template>
  <div>

    <!--    <vux-space size="12" direction="vertical">-->
    <!--      &lt;!&ndash;    <VuxMessage type="success"></VuxMessage>&ndash;&gt;-->
    <!--      &lt;!&ndash;    <VuxMessage type="info"></VuxMessage>&ndash;&gt;-->
    <!--      &lt;!&ndash;    <VuxMessage type="warning"></VuxMessage>&ndash;&gt;-->
    <!--      <VuxMessage type="error"></VuxMessage>-->
    <!--    </vux-space>-->


    <button @click="handleMsg">

    </button>
    <button @click="handleMsg1">

    </button>

  </div>
</template>

<script>

export default {
  name: "Message",
  methods: {
    handleMsg() {
      this.$msg({
        message: '11111111', type: 'success'
      })
    },
    handleMsg1() {
      this.$msg({
        message: '11111111', type: 'error'
      })
    }
  }
}
</script>

<style scoped>

</style>