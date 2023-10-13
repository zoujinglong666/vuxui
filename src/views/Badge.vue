<template>
  <DemoPage>
    <div>
      <vux-badge :value="11" type="primary">
        primary类型
      </vux-badge>
    </div>
    <div>
      <vux-badge :value="11" type="primary">
        primary类型
      </vux-badge>
    </div>
    <div>
      <vux-badge :value="11" type="primary">
        primary类型
      </vux-badge>
    </div>
    <div>
      <vux-badge :value="11" type="primary">
        primary类型
      </vux-badge>
    </div>
    <div>
      <vux-badge :value="11" type="primary">
        primary类型
      </vux-badge>
    </div>
  </DemoPage>
</template>

<script>
import VuxBadge from "@/packages/badge/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";
import VuxButton from "@/packages/button/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  components: {DemoBlock, VuxButton, DemoPage, VuxBadge},
  data() {
  },
};
</script>


