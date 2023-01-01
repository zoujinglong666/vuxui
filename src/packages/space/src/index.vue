<template>
  <div :class="[direction,align,{'wrap':wrap,'bottom':bottom}]"
       :style="{gap:size+'px',paddingRight:padding?size+'px':0,paddingLeft:padding?size+'px':0,bottom:bottomDistance?bottomDistance+'px':0}"
       class="vux__space">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VuxSpace",
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].includes(val);
      },
    },
    align: {
      type: String,
      default: 'start',
      validator(val) {
        return ['start', 'end', 'center', 'baseline'].includes(val);
      },
    },
    size: {
      // unit px
      type: [Number, String],
      default: 8
    },
    wrap: {
      type: Boolean,
    },

    padding: {
      type: Boolean,
    }
    ,
    bottom: {
      type: Boolean,
    },
    bottomDistance: {
      type: [Number, String],
      default: 0
    }
  },
}
</script>

<style lang="less" scoped>
.vux__space {

  display: flex;
  width: 100%;
  box-sizing: border-box;

  &.wrap {
    flex-wrap: wrap;
  }

  &.vertical {
    flex-direction: column;
  }

  &.bottom {
    background: #fff;
    position: fixed !important;
    bottom: 0;
    z-index: 10;
  }

  &.start {
    align-content: flex-start;
  }

  &.center {
    align-items: center;
  }

  &.end {
    align-items: flex-end;
  }

  //基线  字体
  &.baseline {
    align-items: baseline;
  }


}
</style>
