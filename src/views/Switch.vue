<template>
  <div>
    <p>基本用法</p>
    <vux-switch v-model="value"></vux-switch>
    <p>禁用状态</p>
    <vux-switch v-model="disabledValue" disabled></vux-switch>

    <p>加载状态</p>
    <vux-switch v-model="loadingValue" loading></vux-switch>

    <p>自定义颜色</p>
    <vux-switch v-model="value" activeColor="red"></vux-switch>

    <p>搭配单元格</p>
    <vux-cell title="标题">
      <template #value>
        <vux-switch v-model="value"></vux-switch>
      </template>
    </vux-cell>
  </div>
</template>

<script>
export default {
  name: "switch",
  data() {
    return {
      value: true,
      disabledValue: true,
      loadingValue: true
    }
  },
  components: {}

}
</script>

<style scoped>

</style>
