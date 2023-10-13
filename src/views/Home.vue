<script>
import Layout from "@/views/Layout.vue";
import VuxNavbar from "@/packages/navBar/src/index.vue";

export default {
  name: "Home",
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

<template>
  <div>
    <Layout v-if="onHomePath"></Layout>
  </div>

</template>

<style lang="less" scoped>

</style>
