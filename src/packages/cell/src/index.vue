<template>
  <div :class="[border?'border':'noBorder']" class="vux__cell" @click="handleClick">
    <div>
      <span class="vux__cell__title">{{ title }}</span>
      <div class="vux__cell__label">{{ label }}</div>
    </div>
    <slot>
      <span class="vux__cell__value">
        {{ value }}
      </span>
    </slot>
    <span v-if="isLink" class="vux__cell__isLink">
      <ArrowRight></ArrowRight>
    </span>
  </div>
</template>

<script>
import ArrowRight from "@/components/ArrowRight.vue";

export default {
  name: "vuxCell",
  components: {ArrowRight},
  props: {
    type: {
      type: String,
      default: ""
    },

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
    border: {
      type: Boolean,
      default: true
    },
    clickable: Boolean,
    required: Boolean,
    center: Boolean,
    isLink: Boolean
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
      if (this.to) {
        this.$router.push(this.to)
      }


    }
  }
}
</script>

<style lang="less" scoped>
.vux__cell {
  background: #fff;
  position: relative;
  color: #303133;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  box-sizing: border-box;

  .vux__cell__title {
    font-size: 13px;
    color: #333;

  }

  .vux__cell__label {
    font-size: 12px;
    color: #999999;
  }

  .vux__cell__value {
    color: #666;
    width: auto;

  }

  .vux__cell__isLink {
    color: #999999;
    font-weight: 500;
  }
}

.vux__cell:after {
  position: absolute;
  content: " ";
  pointer-events: none;
  right: 16px;
  left: 16px;
  bottom: 0;
  border-bottom: 1px solid #eee;
  transform: scaleY(.5);
  box-sizing: border-box;
  border-radius: 1px;


}
</style>
