<template>

  <div>
    <!--    <vux-list :list="list" v-slot="item">-->

    <!--      {{item}}-->

    <!--    </vux-list>-->
    <div ref="el" style="height: 3000px;overflow-y: auto;" @scroll="handleScroll">

      1
    </div>
  </div>


</template>

<script>

import vuxList from '../packages/list/src/index.vue'

export default {
  name: "List",
  components: {
    vuxList
  },
  data() {
    return {
      // 全部数据量
      list: []

    }
  },
  created() {
    for (let i = 1; i <= 10000; i++) {
      this.list.push({id: i, value: i + '字符内容'.repeat(Math.random() * 20)})
    }
  },
  mounted() {
    this.$refs.el.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      console.log('1111111')
    }
  }
}
</script>

<style scoped>

</style>