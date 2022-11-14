<template>
  <div :class="[position]" :style="{bottom:bottomStyle}" class="vux-fab">
    <div :style="{background:bgColor}" class="vux-fab-container">
      <slot>
        <i class="iconfont icon-add"></i>
      </slot>
    </div>
  </div>
</template>

<script>
const positions = ["left", "center", "right"];
export default {
  name: "vux-fab",
  computed: {
    bottomStyle() {
      return this.bottom + 'px'
    },
  },
  props: {
    bgColor: {
      type: String,
      default: '#0068ff'
    },
    position: {
      type: String,
      default: 'left',
      validator(val) {
        return positions.includes(val);
      },
    },
    bottom: {
      type: [String, Number]
    },


  }
}
</script>

<style lang="less" scoped>
.vux-fab {
  position: absolute;

  &.left {
    bottom: 48px;
    left: 12px;
    transition: all ease-in-out;

  }

  &.right {
    bottom: 48px;
    right: 12px;
    transition: all ease-in-out;


  }

  &.center {
    bottom: 48px;
    left: 50%;
    transform: translate(-50%);

  }

  .vux-fab-container {
    display: flex;
    align-items: center;
    justify-content: center;
    //text-align: center;
    border-radius: 50%;
    background: #0068ff;
    width: 48px;
    height: 48px;
    line-height: 48px;

    i {
      font-size: 32px;
      color: #ffffff;
    }

  }

}
</style>
