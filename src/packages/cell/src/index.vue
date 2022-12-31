<template>
  <div class="vux__cell">
    <div>
      <span class="vux__cell__title">{{ title }}</span>
      <div class="vux__cell__label">{{ label }}</div>
    </div>
    <div class="vux__cell__value">
      <slot name="value"> {{ value }}
      </slot>


    </div>
  </div>


</template>

<script>
export default {
  name: "vuxCell",
  props: {

    //左侧标题
    title: {
      type: [Number, String]
    },
    //右侧内容
    value: {
      type: [Number, String]
    },
    label: String,
    size: String,
    url: String,
    to: [String, Object],
    border: Boolean,
    clickable: Boolean,
    required: Boolean,
    center: Boolean
  }
}
</script>

<style lang="less" scoped>
.vux__cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #eeeeee;

  .vux__cell__title {
    font-size: 13px;
    color: #333;

  }

  .vux__cell__label {
    font-size: 12px;
    color: #999999;
  }

  .vux__cel__value {
    color: #666;

  }

}
</style>