<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <Layout v-if="onHomePath"></Layout>
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from "@/views/Layout";

export default {
  components: {Layout},
  computed: {
    onHomePath() {
      return this.$route.path === '/';
    },
  },


  data() {
    return {}
  },
  methods: {}


}
</script>