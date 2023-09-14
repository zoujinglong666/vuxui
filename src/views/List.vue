<template>

  <vux-list :list="list">

    <template #default="item">
      <div style="border: 1px solid #eeeeee">
        <p>{{ item.id }}</p>
        <p>{{ item.content }}</p>

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
    for (let i = 1; i < 100000; i++) {
      this.list.push({
        id: i,
        key: Math.random().toString(36).slice(-8),
        words: 'word-' + i,
        content: 'content-' + i,
        height: Math.random() * 200,
      });
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
