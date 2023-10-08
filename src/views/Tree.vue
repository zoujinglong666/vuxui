<template>
  <div class="about">
    <Tree :data="treeData" :isSelect="isSelect" @change="loadData" @node-click="handle"/>
  </div>
</template>

<script>
import Tree from "@/packages/tree";

export default {
  components: {Tree},
  data() {
    return {
      treeData: [
        {
          key: 1,
          title: '一级机构部门',
          children: [
            {
              key: 90001,
              title: '测试机构111',
              children: [
                {
                  key: 90019,
                  title: '测试机构111-2',
                },
                {
                  key: 90025,
                  title: '机构机构',
                  children: [
                    {
                      key: 90026,
                      title: '机构机构-2',
                    },
                  ],
                },
              ],
            },
            {
              key: 90037,
              title: '另一个机构部门',
            },
          ],
        },
        {
          key: 2,
          title: '小卖部总舵',
          children: [
            {
              key: 90037,
              title: '小卖部河边分部',
            },
          ],
        },
      ],
      isSelect: false,
      defaultProps: {
        children: 'children',
        label: 'title',
        key: 'id',
      },
    }
  },
  created() {
    this.treeData = json.data.list
  },
  methods: {
    handle(node) {
      console.log('点击节点 Data : ', node)
    },
    loadData(treeNode) {
      console.log(treeNode)
      // eg: 动态更新子节点
      // treeNode.children = JSON.parse(JSON.stringify(json.data.list))
      // this.treeData = [...this.treeData]
    },
  },
}
</script>
