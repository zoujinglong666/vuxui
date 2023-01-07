<template>
  <div :class="[lineShape, hairline?'hairline':'',]" :style="{borderColor:borderColor}" class="vux-divider">
    <span :class="[contentPosition,]" :style="{color:contentColor}" class="vux-divider-content"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "VuxDivider",
  props: {
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ["left", "center", "right"].includes(val);
      },
    },
    hairline: {
      type: Boolean,
    },
    borderColor: {
      type: String,
    },
    contentColor: {
      type: String,
    },
    lineShape: {
      type: String,
      default: 'solid',
      validator(val) {
        return ["dashed", "solid"].includes(val);
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.vux-divider {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: #969799;
  font-size: 14px;
  line-height: 24px;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;

  &.solid {
    border-bottom: 1px solid #eee;
  }

  &.dashed {
    border-bottom: 1px dashed #eee;
  }


  .vux-divider-content {

    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 0 8px;
    font-size: 12px;

    &.left {
      left: 25%;
    }

    &.center {
      left: 50%;
    }

    &.right {
      left: 75%;
    }
  }


}

</style>