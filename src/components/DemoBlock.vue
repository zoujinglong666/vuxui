<template>
  <div class="vux-doc-demo-block">
    <h2 v-if="title" class="vux-doc-demo-block__title">
      <slot>
        {{ title }}
      </slot>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  props: {
    title: String,
  },


};
</script>

<style lang="less">
.vux-doc-demo-block {
  &__title {
    margin: 0;
    padding: 16px 8px;
    color: #969799;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }


  &__title + &__card {
    margin-top: 0;
  }

  &:first-of-type {
    .vux-doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
