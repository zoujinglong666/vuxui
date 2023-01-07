<template>
  <div>
    <p>基本用法</p>
    <vux-data-checkbox v-model="value1" :options="options1"></vux-data-checkbox>
    <p>点击可取消</p>
    <vux-data-checkbox v-model="value1" :options="options1" cancelable></vux-data-checkbox>
    <p>圆形</p>
    <vux-data-checkbox v-model="value1" :options="options1" round></vux-data-checkbox>
    <p>多选</p>
    <vux-data-checkbox v-model="value2" :options="options1" type="multiple"></vux-data-checkbox>
    <p>限制最大可选数</p>
    <vux-data-checkbox v-model="value3" :max="2" :options="options1" type="multiple"></vux-data-checkbox>
    <p>显示对勾</p>
    <vux-data-checkbox v-model="value3" :options="options1" checkMark noBorder></vux-data-checkbox>
    <p>样式风格</p>
    <vux-space direction="vertical" size="12">
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="primary"></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="success"></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="danger"></vux-data-checkbox>
      <vux-data-checkbox v-model="value1" :options="options1" checkMark color="warning"></vux-data-checkbox>
    </vux-space>

  </div>
</template>

<script>
export default {
  name: "DataCheckBox",
  data() {
    return {
      options1: ['上海', '深圳', '北京', '广州'],
      value1: '上海',
      value2: ['上海'],
      value3: ['上海']
    }
  },
  components: {}

}
</script>

<style scoped>

</style>