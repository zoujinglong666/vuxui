<template>
  <div :class="`vux-loading vux-loading-${type}`">
    <span :class="`vux-loading-inner--${type} vux-loading-inner`" :style="style">
      <i v-for="(item, index) in type === 'spinner' ? 12 : 0" :key="index"/>
      <svg v-if="type === 'circular'" class="vux-loading-icon-circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" fill="none" r="20"/>
      </svg>
    </span>
  </div>
</template>

<script>

export default {
  name: 'vux-loading',
  props: {
    size: [Number, String],
    type: {
      type: String,
      default: 'circular',
    },
    color: {
      type: String,
      default: '#c9c9c9',
    },
  },
  computed: {
    style() {
      return {
        color: this.color === 'black' ? '#c9c9c9' : this.color,
        width: this.size + 'px',
        height: this.size + 'px',
      };
    },
  },
};
</script>
<style lang="less">
.vux-loading {
  position: relative;
  font-size: 0;
  vertical-align: middle;

  &-inner {
    position: relative;
    display: inline-block;
    width: 30px;
    max-width: 100%;
    height: 30px;
    max-height: 100%;
    vertical-align: middle;
    animation: vux-rotate 0.8s linear infinite;

    &--spinner {
      animation-timing-function: steps(12);

      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &::before {
          display: block;
          width: 2px;
          height: 25%;
          margin: 0 auto;
          background-color: currentColor;
          border-radius: 40%;
          content: " ";
        }
      }
    }

    &--circular {
      animation-duration: 2s;
    }
  }

  &-icon-circular {
    display: block;
    width: 100%;
    height: 100%;

    circle {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      animation: vux-circular 1.5s ease-in-out infinite;
    }
  }

  &-text {
    display: inline-block;
    margin-left: 10px;
    color: #969799;
    font-size: 14px;
    vertical-align: middle;
  }

  &-circle {
    width: 16px;
    height: 16px;
  }
}

@keyframes vux-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes vux-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .vux-loading-inner--spinner i:nth-of-type(@{i}) {
    opacity: 1 - (0.75 / 12) * (@i - 1);
    transform: rotate(@i * 30deg);
  }
  .generate-spinner(@n, (@i + 1));
}

.generate-spinner(12);

</style>
