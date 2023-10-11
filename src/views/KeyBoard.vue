<template>

  <div>
    <vux-space wrap>
      <vux-button @click="keyboard = 'null'">默认数字键盘</vux-button>
      <vux-button @click="keyboard = 'title'">带标题数字键盘</vux-button>
      <vux-button @click="keyboard = 'default'">主题default数字键盘</vux-button>
    </vux-space>
    {{ this.value }}
    <vux-key-board :show="keyboard === 'null'" @blur="hideKeyBoard" @delete="doDel" @input="onInput"></vux-key-board>
    <vux-key-board
        :close-vux-button-text="'确定'"
        :show="keyboard === 'title'"
        show-title-close
        title="带标题数字键盘"
        @blur="hideKeyBoard"
        @delete="doDel"
        @input="onInput"
    ></vux-key-board>
    <vux-key-board
        :close-vux-button-text="'确定'"
        :show="keyboard === 'default'"
        show-title-close
        theme="default"
        title="主题default数字键盘"
        @blur="hideKeyBoard"
        @delete="doDel"
        @input="onInput"
    ></vux-key-board>

  </div>

</template>

<script>
function deleteLastChar(s) {
  if (!s) {
    return
  }
  return s.slice(0, -1);
}

import VuxKeyBoard from "@/packages/keyboard/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "Key",
  components: {VuxButton, VuxSpace, VuxKeyBoard},

  mounted() {


  },
  data() {
    return {
      keyboard: '',
      value: ""
    };
  },
  methods: {
    hideKeyBoard() {
      this.keyboard = '';
    },
    onInput(text) {
      console.log(text, 'text')
      this.value += text;
    },
    doDel() {
      if (this.value.length) {
        this.value = deleteLastChar(this.value)

      }
    }
  },

}
</script>

<style lang="less" scoped>
.list {
  position: relative;
  height: 100%;

  .vux-button {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
  }
}

</style>
