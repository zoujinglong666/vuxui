<template>
  <div>
    <p>基本用法</p>
    <vux-tree-select v-model="index" :options="options">

    </vux-tree-select>


    <p>
      自定义内容
    </p>


    <vux-tree-select v-model="activeIndex" :options="items">
      <template #content>
        <img
            v-if="activeIndex === 0"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
        />
        <img

            v-if="activeIndex === 1"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
        />
      </template>
    </vux-tree-select>
  </div>

</template>

<script>
export default {
  name: "TreeSelect",
  data() {
    return {
      index: 1,
      activeIndex: 0,
      items: [{text: '分组 1'}, {text: '分组 2'}],
      options: [
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
      ],
    }
  },
  components: {}

}
</script>

<style scoped>

</style>
