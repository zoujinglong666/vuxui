<template>
  <div>
    <p>基本用法</p>
    <vux-dropdown-menu>
      <vux-dropdown-item v-model="value1" :options="option1"></vux-dropdown-item>
      <vux-dropdown-item v-model="value2" :options="option2"></vux-dropdown-item>
    </vux-dropdown-menu>


    <p>
      自定义选中颜色
    </p>
    <vux-dropdown-menu activeColor="red">
      <vux-dropdown-item v-model="value1" :options="option1"></vux-dropdown-item>
      <vux-dropdown-item v-model="value2" :options="option2"></vux-dropdown-item>

    </vux-dropdown-menu>
    <p>自定义内容</p>
    <vux-dropdown-menu activeColor="red">
      <vux-dropdown-item v-model="value1" :options="option1"></vux-dropdown-item>
      <vux-dropdown-item title="slot">
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
        自定义内容
      </vux-dropdown-item>

    </vux-dropdown-menu>
    <p>向上展开</p>
    <vux-dropdown-menu direction="up">
      <vux-dropdown-item v-model="value1" :options="option1"></vux-dropdown-item>
      <vux-dropdown-item v-model="value2" :options="option2"></vux-dropdown-item>

    </vux-dropdown-menu>
    <p>禁用菜单</p>
    <vux-dropdown-menu>
      <vux-dropdown-item v-model="value1" :options="option1" disabled></vux-dropdown-item>
      <vux-dropdown-item v-model="value2" :options="option2" disabled></vux-dropdown-item>

    </vux-dropdown-menu>
  </div>

</template>

<script>

export default {
  name: "dropDownMenu",
  data() {
    return {
      value1: 0,
      value2: 'a',
      freeShipping: true,
      option1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2},
      ], option2: [
        {text: '默认排序', value: 'a'},
        {text: '好评排序', value: 'b'},
        {text: '销量排序', value: 'c'},
      ],

    }
  },

}
</script>

<style scoped>

</style>