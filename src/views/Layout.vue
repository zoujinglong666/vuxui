<template>
  <div>
    <vux-button
        v-for="item in components"
        :key="item.path"
        :to="item.path"
        block
        class="vux__layout"
        style="margin-bottom: 8px"
    >{{
        item.path
      }}
    </vux-button>
  </div>
</template>

<script>
import {routes} from "@/router";
import Button from "@/views/Button";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "layout",
  components: {VuxButton, Button},
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
  margin-bottom: 4px;
  background-color: #b3d8ff;
  border-color: #b3d8ff;
  color: #0068ff;
}
</style>
