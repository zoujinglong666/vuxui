<template>

  <vux-list :list="list">

    <template #default="item">
      <div class="card">
        <p>{{ item.id }}</p>
        <p>{{ item.value }}</p>
      </div>
    </template>
  </vux-list>


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
    for (let i = 1; i <= 500; i++) {
      this.list.push({id: i, value: i + '字符内容'.repeat(Math.random() * 20)})
    }
  },


}
</script>

<style scoped>
.card {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

</style>
