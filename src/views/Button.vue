<template>

  <DemoPage>
    <div>
      <demo-block title="按钮类型"></demo-block>
      <vux-space size="12" wrap>
        <vux-button type="primary">主要按钮</vux-button>
        <vux-button type="success">成功按钮</vux-button>
        <vux-button type="default">默认按钮</vux-button>
        <vux-button type="danger">危险按钮</vux-button>
        <vux-button type="warning">警告按钮</vux-button>
      </vux-space>
      <demo-block title="朴素按钮"></demo-block>
      <vux-space size="12">
        <vux-button plain type="primary">朴素按钮</vux-button>
        <vux-button plain type="success">朴素按钮</vux-button>
      </vux-space>
      <demo-block title="细边框"></demo-block>
      <vux-space size="12">
        <vux-button hairline plain type="primary">细边框按钮</vux-button>
        <vux-button hairline plain type="success">细边框按钮</vux-button>
      </vux-space>
      <demo-block title="禁用状态"></demo-block>
      <vux-space size="12">
        <vux-button disabled type="primary">禁用状态</vux-button>
        <vux-button disabled type="success">禁用状态</vux-button>
      </vux-space>
      <demo-block title="加载状态"></demo-block>

      <vux-space size="12">
        <vux-button loading type="primary"></vux-button>
      </vux-space>
      <demo-block title="按钮尺寸"></demo-block>
      <vux-button size="large" type="primary">大号按钮</vux-button>
      <vux-space size="12" style="margin-top: 12px">
        <vux-button size="normal" type="primary">普通按钮</vux-button>
        <vux-button size="small" type="primary">小型按钮</vux-button>
        <vux-button size="mini" type="primary">迷你按钮</vux-button>
      </vux-space>
      <demo-block title="块级元素"></demo-block>
      <vux-button block type="primary">块级元素</vux-button>

      <demo-block title="自定义颜色"></demo-block>
      <vux-space size="12" wrap>
        <vux-button bgColor="red" color="#fff">单色按钮</vux-button>
        <vux-button gradual type="success">渐变按钮</vux-button>
      </vux-space>
      <demo-block title="圆形按钮"></demo-block>
      <vux-space size="12" wrap>
        <vux-button circle type="primary">圆形</vux-button>
        <vux-button circle type="success">圆形</vux-button>
        <vux-button circle type="default">圆形</vux-button>
        <vux-button circle type="danger">圆形</vux-button>
        <vux-button circle type="warning">圆形</vux-button>
      </vux-space>
    </div>
  </DemoPage>

</template>

<script>
import VuxSpace from "@/packages/space/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxButton from "@/packages/button/src/index.vue";
import DemoPage from "@/components/DemoPage.vue";

export default {
  name: "Button",
  components: {DemoPage, VuxButton, DemoBlock, VuxSpace}

}
</script>

<style scoped>

</style>
