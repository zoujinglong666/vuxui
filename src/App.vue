<template>
  <div id="app">
    <vux-navbar :title="navbarTitle"></vux-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import VuxNavbar from "@/packages/navBar/src/index.vue";

export default {
  components: {VuxNavbar},
  computed: {
    onHomePath() {
      return this.$route.path === '/';
    },
    navbarTitle() {
      if (this.onHomePath) {
        return "首页"
      }
      return this.$route.meta.title || this.$route.path.substring(1);
    }
  },
}
</script>
