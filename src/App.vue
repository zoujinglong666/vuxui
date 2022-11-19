<template>
<div>
  <vux-drop-down-menu>
    <vux-drop-down-menu-item v-model="value" :options="option"></vux-drop-down-menu-item>
    <vux-drop-down-menu-item v-model="value2" :options="option2"></vux-drop-down-menu-item>
  </vux-drop-down-menu>
</div>
</template>

<script>


export default {

  data() {
    return {

      value: 'A',

      value2: 'a',
      value3: 2,

      option: [
        {text: '全部商品', value: 'A'},
        {text: '新款商品', value: 'B'},
        {text: '活动商品', value: 'C'},
      ],
      option2: [
        {text: '默认排序', value: 'a'},
        {text: '好评排序', value: 'b'},
        {text: '销量排序', value: 'c'},
      ], option3: [
        {text: '1', value: 0},
        {text: '2', value: 1},
        {text: '3', value: 2},
      ],
    }
  }


}
</script>