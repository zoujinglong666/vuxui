<script>
import VuxPasswordInput from "@/packages/passwordInput/src/index.vue";
import VuxKeyBoard from "@/packages/keyboard/src/index.vue";

export default {
  name: "PassWordInput",
  components: {VuxKeyBoard, VuxPasswordInput},
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
}
</script>

<template>
  <div>
    <vux-password-input @change="onChange" @/>
    <vux-key-board :show="keyboard === 'null'"
                   @blur="hideKeyBoard"
                   @delete="doDel"
                   @input="onInput"></vux-key-board>

  </div>
</template>

<style lang="less" scoped>

</style>
