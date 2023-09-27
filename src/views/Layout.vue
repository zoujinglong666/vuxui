<template>
  <div>

  <vux-cell
      v-for="item in components"
      :key="item.path"
      :title="item.title"
      :to="item.path"
      block
      is-link
  >
  </vux-cell>
  </div>
</template>

<script>
import {routes} from "@/router";
import Button from "@/views/Button";
import VuxButton from "@/packages/button/src/index.vue";
import VuxCell from "@/packages/cell/src/index.vue";

export default {
  name: "layout",
  components: {VuxCell, VuxButton, Button},
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
          path: item.path.substring(1),
          title: item.path.substring(1) + item.meta.title
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
  width: 100%;
  background-color: #b3d8ff;
  border-color: #b3d8ff;
  color: #1989fa;
  margin: 8px 0;

}
</style>
