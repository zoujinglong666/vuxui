<template>
  <div class="vux__navbar">
    <div class="vux__navbar__left" @click="goBack">
      <span>      返回
</span>
    </div>
    <div class="vux__navbar__title"><span>
      {{ title }}
    </span></div>

    <div class="vux__navbar__right">

      <template>
        <slot name="right">
        </slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "VuxNavbar",
  props: {
    title: String,
    leftText: {
      type: String
    },
    rightText: {
      type: String
    },
    leftArrow: {
      type: Boolean
    },
    border: Boolean,
    zIndex: {
      type: [Number, String]
    },
    placeholder: Boolean
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.vux__navbar {
  display: flex;
  align-items: center;
  position: relative;
  height: 46px;;
  line-height: 46px;
  font-weight: 500;
  font-size: 16px;
  padding: 0 16px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #eeeeee;

  .vux__navbar__left {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    font-size: 13px;
  }

  .vux__navbar__title {
    margin: 0 auto;
    max-width: 60%;

  }

  .vux__navbar__right {
    right: 0;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;

  }
}

</style>
