<template>

  <demo-page>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-space wrap>
      <vux-button type="success" @click="handleSuccessMsg">
        success消息
      </vux-button>
      <vux-button type="danger" @click="handleErrorMsg">
        error消息
      </vux-button>
      <vux-button type="warning" @click="handleWarnMsg">
        warning消息
      </vux-button>
      <vux-button type="primary" @click="handleInfoMsg">
        info消息
      </vux-button>
    </vux-space>
  </demo-page>


</template>
<script>
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import msg from "@/utils/msg";

export default {
  name: "Message",
  components: {DemoBlock, DemoPage, VuxSpace, VuxButton},
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
