<template>
  <div class="vux-avatar-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuxAvatarGroup"
}
</script>

<style lang="less" scoped>
.vux-avatar-group {
  display: flex;
  align-items: center;
  position: relative;

  div {
    border: 1px solid var(--vux-white);
    margin-left: calc(-0.5em);
    box-shadow: unset;
    border-radius: 50%;
  }
}

</style>
