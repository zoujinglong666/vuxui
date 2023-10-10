<template>
  <vux-drag :item-height="50" :list="list" @change="dragComplete">
    <template #default="{ item }">
      <span class="name">{{ item.name }}</span>
    </template>
  </vux-drag>
</template>

<script>
import VuxDrag from "@/packages/Drag/src/index.vue";

export default {
  components: {VuxDrag,},
  data() {
    return {
      show: false,
      list: [
        {
          name: '余额宝支付'
        },
        {
          name: '余额支付'
        },
        {
          name: '建设银行储蓄卡支付'
        },
        {
          name: '农业银行储蓄卡支付'
        }
      ]

    }
  },
  methods: {
    dragComplete(newList, dragItem) {
      console.log(newList, dragItem)
    }
  }
}

// 拖拽完成

</script>

<style scoped>
.name {
  display: flex;
  align-items: center;
  margin: 0 24px;
  height: 50px;
  color: #383838;
  border-bottom: 1px solid #f5f5f5;
}
</style>
