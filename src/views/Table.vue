<template>
  <div>
    <vux-table :columns="columns" :data="tableData"></vux-table>
  </div>

</template>

<script>
import VuxTable from "@/packages/table/src/index.vue";

export default {
  name: "Table",
  components: {VuxTable},
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      columns: [{
        prop: 'date',
        label: "日期"

      }, {
        prop: 'name',
        label: "姓名"

      },
        {
          prop: 'address',
          label: "地址"

        },

      ]
    }

  }
}
</script>

<style scoped>

</style>
