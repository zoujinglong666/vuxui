<template>
  <div :class="[border?'border':'noBorder']" class="vux-cell" @click="handleClick">
    <div>
      <span class="vux-cell__title">{{ title }}</span>
      <div class="vux-cell__label">{{ label }}</div>
    </div>
    <div>
      <slot>
      <span class="vux-cell__value">
        {{ value }}
      </span>
      </slot>
      <span v-if="isLink" class="vux-cell__isLink">
      <ArrowRight></ArrowRight>
    </span>
    </div>

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
.vux-cell {
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

  &__title {
    font-size: 13px;
    color: #333;
  }

  &__label {
    font-size: 12px;
    color: #999999;
  }

  &__value {
    color: #666;
    width: auto;
  }

  &__isLink {
    color: #999999;
    font-weight: 500;
  }
}

.vux-cell:after {
  position: absolute;
  content: " ";
  pointer-events: none;
  right: 16px;
  left: 16px;
  bottom: 0;
  border-bottom: 1px solid #eee;
  transform: scaleY(.5);
  box-sizing: border-box;

}
</style>
