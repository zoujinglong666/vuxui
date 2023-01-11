<template>
  <div class="vux__cell" @click="handleClick">
    <div>
      <span class="vux__cell__title">{{ title }}</span>
      <div class="vux__cell__label">{{ label }}</div>
    </div>

    <slot name="value"> <span class="vux__cell__value">
        {{ value }}
      </span></slot>
    <span v-if="isLink" class="vux__cell__isLink">></span>
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
    center: Boolean,
    isLink: Boolean
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)

    }
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
  box-sizing: border-box;
  padding: 0 8px;

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

  .vux__cell__isLink {
    color: #999999;
    font-weight: 500;
  }

}
</style>
