<template>
  <div>
    <vux-tree-select v-model="leftIndex" :activeId.sync="activeId" :options="items"></vux-tree-select>
    <vux-progress :strokeWidth="50"></vux-progress>
    {{ activeId }}

    <vux-radio-group v-model="activeId">
      <vux-radio :name="1">1</vux-radio>
      <vux-radio :name="2">2</vux-radio>
      <vux-radio :name="3">3</vux-radio>
      <vux-radio :name="4">4</vux-radio>
    </vux-radio-group>
  </div>
</template>

<script>


import VuxCheckboxGroup from "@/packages/checkBoxGroup/src";
import VuxRadioGroup from "@/packages/radioGroup/src";

export default {
  components: {VuxRadioGroup, VuxCheckboxGroup},


  data() {
    return {
      leftIndex: 1,
      activeId: [1],
      items: [
        {
          text: '浙江',
          children: [
            {text: '杭州', id: 1},
            {text: '温州', id: 2},
            {text: '宁波', id: 3, disabled: true},
          ],
        },
        {
          text: '江苏',
          children: [
            {text: '南京', id: 4},
            {text: '无锡', id: 5},
            {text: '徐州', id: 6},
          ],
        },
        {text: '福建', disabled: true},
      ]
    }
  }


}
</script>