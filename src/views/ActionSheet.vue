<script>


import DemoPage from "@/components/DemoPage.vue";
import VuxAvatar from "@/packages/avatar/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxActionSheet from "@/packages/actionSheet/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";

export default {
  components: {VuxCell, VuxActionSheet, DemoBlock, VuxAvatar, DemoPage},
  data() {
    return {
      show: false,
      show1: false,
      actions: [{name: '选项一'},
        {name: '选项二'},
        {name: '选项三'}]
    }
  },
  methods: {
    handleSelect(item) {
      this.$msg({
        message: item.name, type: 'success'
      })
    },
    handleCancel() {
      this.show = false;
    }
  }
}
</script>

<template>
  <div>
    <vux-cell is-link title="基本用法" @click="show=true"></vux-cell>
    <vux-cell is-link title="展示取消按钮" @click="show1=true"></vux-cell>
    <vux-action-sheet :actions="actions" :show.sync="show" @cancel="handleCancel"
                      @select="handleSelect"></vux-action-sheet>
    <vux-action-sheet :actions="actions" :show.sync="show1" cancel-text="取消" @cancel="handleCancel"
                      @select="handleSelect"></vux-action-sheet>
  </div>
</template>

<style lang="less" scoped>

</style>
