<template>
  <div>
    <div v-for="(item,index) in options">
      <span style="height: 40px;line-height: 40px;" @click="handleClick(item)">
      {{ item.label }}
    </span>
      <div v-if="childrenData" style="display: flex;width: 100%;">
        <vux-cascader :options="childrenData"></vux-cascader>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vuxCascader",
//   options	选项数据源, 键名包括 label、value、children	array	-
// value	选中项绑定值	array	[]
// collapse	大于两列时，是否需要收缩第一列宽度	boolean	false
// selectedItem
  data() {
    return {
      childrenData: []
    }
  },
  props: {
    options: {
      type: Array, default: () => []
    },
    value: {
      type: Array, default: () => []
    },
    collapse: {
      type: Boolean,
      default: false
    },
    selectedItem: {
      type: Array, default: () => []
    }

  },
  methods: {
    handleClick(item) {
      console.log(item)
      if (item.children) {

        this.childrenData = item.children;
      }

    }
  }
}
</script>

<style scoped>

</style>