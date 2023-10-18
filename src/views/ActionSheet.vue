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
    },
    handleShow() {
      console.log("show")
      this.show = true;
    },
    handleShow1() {
      console.log("show1")
      this.show1 = true;
    }
  }
}
</script>

<template>
  <div>
    <vux-cell is-link title="基本用法" @click="handleShow"></vux-cell>
    <vux-cell is-link title="展示取消按钮" @click="handleShow1"></vux-cell>
    <vux-action-sheet v-model="show" :actions="actions" @cancel="handleCancel"
                      @select="handleSelect">{{ show }}
    </vux-action-sheet>
    <vux-action-sheet v-model="show1" :actions="actions" cancel-text="取消" @cancel="handleCancel"
                      @select="handleSelect">{{ show1 }}
    </vux-action-sheet>
  </div>
</template>

<style lang="less" scoped>

</style>
