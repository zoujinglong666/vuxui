<template>
  <div>
    <DemoBlock title="基本用法"></DemoBlock>
    <vux-table :columns="columns" :data="tableData"></vux-table>
    <DemoBlock title="显示总结栏"></DemoBlock>
    <vux-table :columns="columns" :data="tableData" total-footer></vux-table>
  </div>
</template>

<script>
import VuxTable from "@/packages/table/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";

export default {
  name: "Table",
  components: {DemoBlock, VuxTable},
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 18
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        age: 19
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        age: 20
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        age: 21
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
        {
          prop: 'age',
          label: "年龄",
          total: true,
          sort: true

        },

      ]
    }

  }
}
</script>

<style scoped>

</style>
