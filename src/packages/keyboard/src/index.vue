<template>
  <vux-popup :overlay="false" :show.sync="show">
    <div
        v-show="show"
        :class="`spt-keyboard-${theme}`"
        :style="style"
        class="spt-keyboard"
        @touchStart.stop
        @mousedown.stop

    >
      <div v-if="title || showTitleClose" class="spt-keyboard-title">
        <span v-text="title"/>
        <span
            v-if="showTitleClose"
            class="spt-keyboard-close"
            @click="onBlur"
            v-text="closeButtonText"
        />
      </div>
      <div class="spt-keyboard-body">
        <key
            v-for="{ text, type } in keys"
            :key="text"
            :text="text"
            :type="type"
            @press="onPressKey"
        />
      </div>
      <div v-if="theme === 'default'" class="spt-keyboard-sidebar">
        <key :text="'delete'" :type="['delete', 'big']" @press="onPressKey"/>
        <key :text="okText" :type="['ok', 'blue', 'big']" @press="onPressKey"/>
      </div>
    </div>
  </vux-popup>

</template>

<script>
import Key from './key';
import VuxPopup from "@/packages/popup/index.vue";

export default {
  name: 'vux-key-board',
  components: {
    VuxPopup,
    Key,
  },
  props: {
    show: Boolean,
    title: String,
    closeButtonText: String,
    okText: {
      type: String,
      default: '确定',
    },
    theme: {
      type: String,
      default: '',
    },
    extraKey: {
      type: String,
      default: '.',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    transition: {
      type: Boolean,
      default: true,
    },
    showDeleteKey: {
      type: Boolean,
      default: true,
    },
    showTitleClose: {
      type: Boolean,
      default: false,
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.handler(true);
  },
  destroyed() {
    this.handler(false);
  },
  activated() {
    this.handler(true);
  },
  deactivated() {
    this.handler(false);
  },
  computed: {
    keys() {
      const keys = [];
      for (let i = 1; i <= 9; i++) {
        keys.push({text: i});
      }
      // 根据主题变化
      switch (this.theme) {
        case 'default':
          keys.push(
              {text: this.extraKey, type: ['gray']},
              {text: 0},
              {text: 'hide', type: ['gray', 'hide']},
          );
          break;
        default:
          keys.push({text: this.extraKey}, {text: 0}, {text: 'delete', type: ['delete']});
          break;
      }
      return keys;
    },
    style() {
      return {'z-index': this.zIndex};
    },
  },
  methods: {
    handler(action) {
      if (action !== this.handlerStatus && this.hideOnClickOutside) {
        this.handlerStatus = action;
        document.body[`${action ? 'add' : 'remove'}EventListener`]('touchstart', this.onBlur);
        document.body[`${action ? 'add' : 'remove'}EventListener`]('mousedown', this.onBlur);
      }
    },
    onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onBlur() {
      this.$emit('blur');
    },
    onPressKey(text) {
      if (text === '') {
        return;
      }
      if (text === 'delete') {
        this.$emit('delete');
      } else if (text === 'hide') {
        this.onBlur();
      } else if (text === this.okText) {
        this.$emit('ok');
      } else {
        this.$emit('input', text);
      }
    },
  },
};
</script>

<style lang="less">
.spt-keyboard {
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: var(--vux-white);

  &.spt-keyboard-default {
    .spt-keyboard-body {
      padding-right: 25%;
    }
  }

  &-sidebar {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
  }

  &-title {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    position: relative;
    color: var(--vux-primary-color);
  }

  &-close {
    position: absolute;
    right: 0;
    padding: 0 16px;
    color: var(--vux-primary-color);
    font-size: 14px;
  }
}

.spt-hairline {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e5e5e5;
  }
}

.spt-key {
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

    &.spt-key-active {
      background-color: #096dd9;
    }
  }
}

.spt-slide-bottom {
  &-enter-active {
    animation: spt-slide-bottom-enter 0.3s both ease;
  }

  &-leave-active {
    animation: spt-slide-bottom-leave 0.3s both ease;
  }
}
</style>
