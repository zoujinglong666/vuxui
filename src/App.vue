<template>
  <div>
    <vux-steps v-model="active" @change="onChange">
      <vux-step title="买家下单"></vux-step>
      <vux-step title="商家接单"></vux-step>


    </vux-steps>


    <vux-drop-down-menu>
      <vux-drop-down-menu-item v-model="value1" :options="option1">
      </vux-drop-down-menu-item>
    </vux-drop-down-menu>


  </div>
</template>

<script>


export default {
  components: {},

  data() {
    return {
      value1: 0,
      option1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2},
      ],
      active: 1,
      loading: false,
      checked: false,
      list: [
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

    }
  },
  methods: {
    onChange(index) {
      console.log(index)

    },
    onChecked(val) {
      console.log(val)
    },
    onclick() {
      this.loading = !this.loading;
    }
  }


}
</script>