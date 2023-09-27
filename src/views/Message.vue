<template>

  <demo-page>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-space size="12" wrap>
      <vux-button type="success" @click="handleSuccessMsg">
        成功消息
      </vux-button>
      <vux-button type="danger" @click="handleErrorMsg">
        危险消息
      </vux-button>
    </vux-space>
  </demo-page>


</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Message",
  components: {DemoBlock, DemoPage, VuxSpace, VuxButton},
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
