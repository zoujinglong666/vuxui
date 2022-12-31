<template>
  <div class="vux__navbar">
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "VuxNavbar",

//   参数	说明	类型	默认值
//   title	标题	string	''
//   left-text	左侧文案	string	''
//   right-text	右侧文案	string	''
//   left-arrow	是否显示左侧箭头	boolean	false
//   border	是否显示下边框	boolean	true
//   fixed	是否固定在顶部	boolean	false
//   placeholder	固定在顶部时，是否在标签位置生成一个等高的占位元素	boolean	false
// z-index	导航栏 z-index	number | string	1


  props: {
    title: String,
    leftText: {
      type: String
    },
    rightText: {
      type: String
    },
    leftArrow: {
      type: Boolean
    },
    border: Boolean,
    zIndex: {
      type: [Number, String]
    },
    placeholder: Boolean
  }
}
</script>

<style lang="less" scoped>
.vux__navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;;
  line-height: 46px;
  font-weight: 500;
  font-size: 16px;

}

</style>