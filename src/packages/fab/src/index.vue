<template>
  <div :class="[position]" :style="{bottom:bottomStyle}" class="vux-fab">
    <div :style="{background:bgColor}" class="vux-fab-container">
      <slot>
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
      default: '#1989fa'
    },
    position: {
      type: String,
      default: 'right',
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
  position: fixed;
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

  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    //text-align: center;
    border-radius: 50%;
    background: #1989fa;
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #ffffff;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    i {
      font-size: 24px;
      color: #ffffff;
    }

  }

}
</style>
