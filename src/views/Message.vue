<template>

  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-cell title="success消息" type="success" @click="handleSuccessMsg">
    </vux-cell>
    <vux-cell title="error消息" type="danger" @click="handleErrorMsg">
      error消息
    </vux-cell>
    <vux-cell title="warning消息" type="warning" @click="handleWarnMsg">
    </vux-cell>
    <vux-cell title="info信息" type="primary" @click="handleInfoMsg">
    </vux-cell>
  </div>


</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import msg from "@/utils/msg";
import VuxCell from "@/packages/cell/src/index.vue";

export default {
  name: "Message",
  components: {VuxCell, DemoBlock, DemoPage, VuxSpace, VuxButton},
  methods: {
    handleSuccessMsg() {
      msg.success("success")

    },
    handleErrorMsg() {
      msg.error("error")
    },
    handleInfoMsg() {
      msg.info("info")
    }
    ,
    handleWarnMsg() {
      msg.warning("warning")
    }
  }
}
</script>

<style scoped>

</style>
