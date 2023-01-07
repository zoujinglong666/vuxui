<template>
  <div>
    <p>按钮类型</p>
    <vux-space size="12" wrap>
      <vux-button type="primary">主要按钮</vux-button>
      <vux-button type="success">成功按钮</vux-button>
      <vux-button type="default">默认按钮</vux-button>
      <vux-button type="danger">危险按钮</vux-button>
      <vux-button type="warning">警告按钮</vux-button>
    </vux-space>
    <p>朴素按钮</p>
    <vux-space size="12">
      <vux-button plain type="primary">朴素按钮</vux-button>
      <vux-button plain type="success">朴素按钮</vux-button>
    </vux-space>

    <p>细边框</p>
    <vux-space size="12">
      <vux-button hairline plain type="primary">细边框按钮</vux-button>
      <vux-button hairline plain type="success">细边框按钮</vux-button>
    </vux-space>
    <p>禁用状态</p>
    <vux-space size="12">
      <vux-button disabled type="primary">禁用状态</vux-button>
      <vux-button disabled type="success">禁用状态</vux-button>
    </vux-space>
    <p>加载状态</p>
    <vux-space size="12">
      <vux-button loading type="primary"></vux-button>
    </vux-space>
    <p>按钮尺寸</p>
    <vux-button size="large" type="primary">大号按钮</vux-button>
    <vux-space align="center" size="12" style="margin-top: 16px;">
      <vux-button size="normal" type="primary">普通按钮</vux-button>
      <vux-button size="small" type="primary">小型按钮</vux-button>
      <vux-button size="mini" type="primary">迷你按钮</vux-button>
    </vux-space>
    <p>块级元素</p>
    <vux-button block type="primary">块级元素</vux-button>
    <p>
      自定义颜色
    </p>
    <vux-space size="12" wrap>
      <vux-button bgColor="red" color="#fff">单色按钮</vux-button>
      <vux-button gradual type="success">渐变按钮</vux-button>
    </vux-space>
    <p>
      圆形按钮
    </p>
    <vux-space size="12" wrap>
      <vux-button circle type="primary">圆形</vux-button>
      <vux-button circle type="success">圆形</vux-button>
      <vux-button circle type="default">圆形</vux-button>
      <vux-button circle type="danger">圆形</vux-button>
      <vux-button circle type="warning">圆形</vux-button>
    </vux-space>
  </div>
</template>

<script>
export default {
  name: "Button",
  components: {}

}
</script>

<style scoped>

</style>