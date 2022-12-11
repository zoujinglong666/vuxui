<template>
  <div>

    <vux-radio-group v-model="activeId">
      <vux-radio :name="0">false</vux-radio>
      <vux-radio :name="1">true</vux-radio>
    </vux-radio-group>
    <vux-checkbox-group v-model="activeId1">
      <vux-checkbox name="1">1</vux-checkbox>
      <vux-checkbox name="22">2</vux-checkbox>

    </vux-checkbox-group>


    <vux-canvas></vux-canvas>
    <vux-switch v-model="activeId" :active-value="1" :inactive-value="0"></vux-switch>

  </div>
</template>

<script>

export default {
  components: {},


  data() {
    return {
      leftIndex: 1,
      activeId: 1,
      activeId1: ['1'],
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