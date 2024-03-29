<template>
  <i
      :class="className"
      class="vux-key vux_hairline"
      @mousemove="onBlur"
      @mouseup="onBlur"
      @touchcancel="onBlur"
      @touchend="onBlur"
      @touchmove="onBlur"
      v-text="text"
      @touchstart.stop.prevent="onFocus"
      @mousedown.stop.prevent="onFocus"
  />
</template>

<script>
export default {
  name: 'vux-key',
  props: {
    text: [String, Number],
    type: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    className() {
      const types = this.type.slice(0);
      if (this.active) {
        types.push('active');
      }
      return types.map((type) => `vux-key-${type}`);
    },
  },
  methods: {
    onFocus() {
      this.active = true;
      this.$emit('press', this.text);
    },
    onBlur() {
      this.active = false;
    },
  },
};
</script>

<style lang="less">

.vux-key {
  display: inline-block;
  width: 33.33333333%;
  height: 54px;
  font-size: 24px;
  font-style: normal;
  line-height: 54px;
  text-align: center;
  vertical-align: middle;

  &::after {
    border-width: 1px 1px 0 0;
  }

  .vux_hairline {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
    }
  }
  &-big {
    width: 100%;
    height: 108px;
    line-height: 108px;
  }

  &-delete {
    font-size: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAADf0lEQVRoQ+2ZS6hNYRTHf5fIozyjGIgBM68wIHlMGBh4pTwSZh4DbiaKojAw8RhgiCRKQklR3pIy8AhDj6QkA5Q8Q//b+m777u4537f3/s4+p9vedTu3zt7fWr9vrf9aa3+njR50tfUgFiqYVo1mFZkqMiXsQMw0mwIMLsFnZ+Ip8DlpLwaMIC4CY0sEkSmBLAVuO7tFYQRyCxgCHEnvVIPhdgN3gHkxYAQgEAHNT+5QgyHc8i4iUWCUWkuAduBwSQBJM9Fg5PxW4BSwvgkgMhkFRs6fAFRNlGLNugrDOMGrcKh6dSmNJVMVgpHgHxvEVOBJyc6nzRWCUeVS5dgAnGwgSH9gGPDeYyM3jDQirYQKfg7wB3iQEVrRvw+MtL96j+eCcYLv0qA8Tt6wKK4EzgcC9QPuAjOAg8D22JGR4KWTt1a5QgU/3nZ4BLAWOONxrDdwFVgAXABWAP9iwijkr6HjbVRaySr4cQY0CtgCHK/hnNYX7CrgOrDIUtQX0ExppogoMkUEP8aam8BqTQqC3Ag8AqS1Hz4K+z4Yxglew+O2wMVr3SYxS9RKvf3ArsSNO4F9wAtgdsa+FQQj5w8Bl232KsjS8fhw4CYwydJts1VHbdo7YDrwMaMhL4y0oX6iUUX/hwo+xI9BBjTNPrX+J2Am8CpkgdQ9XphLwGKgUR1+oPUeRUh9SHae5wAJGjRFOxkYmtOA7zGtrUaqLq8qplRWGf7te7Cb772R0ZiyrmAFq+XXBANRyV9uNpQFarAqxz8zAnlhZOiNHUwUKclpv0Zb6dXnauAs0As4Z5G5BywEvmcA8sJoLfUW3aiTlhjaUSVTaikyqpQq9+5Sqp0G1gAPDehrIFAQTBJII4Xe77N2f+fPAAORVg4AO7pxVEBHgU3AM2BuYBUNhokB1Be4ZiVeWlTa1rvU2xS5l7aBvr6TCaYokHShqfmKlfu/Aemj6WCvzYSzgA91nskMkxeoD/DNRK80/RUA4m5Ruh0DltnhYq1Hc8FoMR0p6WhJE0GohiZaZxdUI67cMHLGvaSpdKvKxRx18sAWgkkCqbopQs0EKgzTSkBRYFoFKBpMKwBFhRGQO3NuhoaiwwjITdoC0vtQWdee9Ntw0R+bnONaWKNImT8DfkmfGsWCcVCdP/yUEJ7On/+crdgwJTDUNlHBNHX76xivIlNFpoQd6FFp9h8Fr8o02fkgggAAAABJRU5ErkJggg==) no-repeat center;
    background-size: auto 37px;
  }

  &-hide {
    font-size: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAACq0lEQVR4Xu1b0VXDMAy8TgAbwAawAXQC2AA6AWwAbAATABNAJwAmADYoG8AE8K5NeHqqix07KGkj/6VxLPl8kmVZHcEbRo4BHASSwJngICycgTPBQVhmwiGAEwC7A9gx3gDcAJhJc7gFcDqAyespTgDc0SdcArgYIAD1lCcE4RXA/oBBmBGEbwXAR20rGwoMfd6OnFsIhKvKRDYUg2XzdxCqOEGbgzMBgIMQAGEbwINyEGP1zBiDgVbd7rn/qj4cg2PVjcHKo3huS86TkqvlLIUEqT5Bm4w+c+iBQ2xKMTsLOQ5CKDh0JjTYHZ6VnfGwJRt9gjx70B9on6DHSOmTIydmdtnmsE6Bk4MQOAZoJ+1MKHGMbg4J+YYpAGZrZDsTwdFnlcmR73l8PxI/xMZgVwZh82yQaDoXQrrL1po5aGejmZESHFkFWDHdsn2CgxDwuDG0+d4iBA7JiemWzQQedOThRwu6Vochvpff0Cccq4/4fC5+i43Bril9Yrplg7BOu0NMVwdhKHGCMyGGQFtMoIOko+tDS9FF98n2CU23OyuAQkFaLMvlIJSYgzMhI/rbSHOwmpSFnGyfYKGclQwHocQxWq2ShRxnQioTLFajVzKY8uK5X+b6eqWggTJTgsDyFSZJtwwE9lHEuE5+8pDBa7K9Pmr5Tzp9VZmteQmfbEyD/5VG+yd9Ohn2927Ua5uNa5sPGq73S8P+2d0tmcCre5YPpzTeNJmVGVuCwMmzJkHWNoUAIQN0XUIKcNl9rEGgonRIq0zjvQLANH3XBQirtmNuWWSAvtjNXuHUD7sAgbpxKyYjZIDGskBd0pM6j6J+XYFApbnqdc3h/H8HRTMp+LhLEKg2dwCCYbYThLDqGoSC9WvvUwfBOGJsb+laHsmZ4ExYUMqZ4CAsmPADXg8DXm/S2EcAAAAASUVORK5CYII=) no-repeat center;
    background-size: auto 37px;
  }

  &-active {
    background-color: #f2f3f5;
  }

  &-blue {
    background-color: var(--vux-primary-color);
    color: #fff;

    &.vux-key-active {
      background-color: var(--vux-primary-color);
    }
  }
}



</style>

