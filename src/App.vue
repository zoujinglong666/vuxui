<template>
  <div id="app">
    <vux-navbar :title="navbarTitle"></vux-navbar>
    <Layout v-if="onHomePath"></Layout>
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from "@/views/Layout";
import VuxNavbar from "@/packages/navBar/src/index.vue";

export default {
  components: {VuxNavbar, Layout},
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


  data() {
    return {}
  },
  methods: {}


}
</script>
