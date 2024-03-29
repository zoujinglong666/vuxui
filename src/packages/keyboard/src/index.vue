<template>
  <vux-popup v-model="show" :overlay="false">
    <div
        v-show="show"
        :class="`vux-keyboard-${theme}`"
        :style="style"
        class="vux-keyboard"
        @touchStart.stop
        @mousedown.stop

    >
      <div v-if="title || showTitleClose" class="vux-keyboard-title">
        <span v-text="title"/>
        <span
            v-if="showTitleClose"
            class="vux-keyboard-close"
            @click="onBlur"
            v-text="closeButtonText"
        />
      </div>
      <div class="vux-keyboard-body">
        <key
            v-for="{ text, type } in keys"
            :key="text"
            :text="text"
            :type="type"
            @press="onPressKey"
        />
      </div>
      <div v-if="theme === 'default'" class="vux-keyboard-sidebar">
        <key :text="'delete'" :type="['delete', 'big']" @press="onPressKey"/>
        <key :text="okText" :type="['ok', 'blue', 'big']" @press="onPressKey"/>
      </div>
    </div>
  </vux-popup>

</template>

<script>
import Key from './key';
import VuxPopup from "@/packages/popup/src/index.vue";

export default {
  name: 'vux-key-board',
  components: {
    VuxPopup,
    Key,
  },
  props: {
    show: Boolean,
    card: Boolean,
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
        case 'card':
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
.vux-keyboard {
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: var(--vux-white);

  &.vux-keyboard-default {
    .vux-keyboard-body {
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


</style>
