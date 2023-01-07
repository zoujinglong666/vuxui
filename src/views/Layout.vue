<template>
  <div>
    <router-link v-for="item in components" :to="item.path" class="vux__layout">{{
        item.path
      }}
    </router-link>
  </div>
</template>

<script>
import {routes} from "@/router";

export default {
  name: "layout",
  data() {
    return {
      components: []
    }
  },
  computed: {},
  created() {
    this.toRouterData()
  }, activated() {
    this.toRouterData()
  },
  methods: {
    // handleClick(item) {
    //   this.$router.push(`/${item}`)
    // },
    toRouterData() {
      this.components = routes.map(item => {
        return {
          ...item,
          path: item.path.substring(1)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>


a {
  text-decoration: none;
}

.vux__layout {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 40px;
  margin-bottom: 4px;
  background-color: #b3d8ff;
  border-color: #b3d8ff;
  color: #0068ff;
}
</style>