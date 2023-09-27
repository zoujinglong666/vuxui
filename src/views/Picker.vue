<template>

  <div>

    <div>
      <demo-block title="基本用法"></demo-block>
      <vux-cell title="选择城市" @click="show1=true">
      </vux-cell>
      <vux-picker :columns="columns1" :show.sync="show1" title="选择城市"/>
    </div>
    <div>
      <demo-block title="多列"></demo-block>
      <vux-cell title="选择日期" @click="show=true">
      </vux-cell>
      <vux-picker :columns="columns" :show.sync="show" title="选择日期"/>
    </div>

    <div>
      <demo-block title="级联选择"></demo-block>
      <vux-cell title="选择省市区" @click="show2=true">
      </vux-cell>
      <vux-picker :columns="list2" :columns-field="{
   text: 'text',
                values: 'value',
                children: 'children',
  }" :show.sync="show2" title="标题" value-key="text"></vux-picker>
    </div>


  </div>

</template>

<script>
import VuxPicker from "@/packages/picker/src/index.vue";
import DemoBlock from "@/components/DemoBlock.vue";
import VuxCell from "@/packages/cell/src/index.vue";

export default {

  components: {VuxCell, DemoBlock, VuxPicker},
  data() {
    return {
      columns: [
        // 第一列
        [
          {text: '周一', value: 'Monday'},
          {text: '周二', value: 'Tuesday'},
          {text: '周三', value: 'Wednesday'},
          {text: '周四', value: 'Thursday'},
          {text: '周五', value: 'Friday'},
        ],
        // 第二列
        [
          {text: '上午', value: 'Morning'},
          {text: '下午', value: 'Afternoon'},
          {text: '晚上', value: 'Evening'},
        ],
      ],
      columns1: [
        {text: '杭州', value: 'Hangzhou'},
        {text: '宁波', value: 'Ningbo'},
        {text: '温州', value: 'Wenzhou'},
        {text: '绍兴', value: 'Shaoxing'},
        {text: '湖州', value: 'Huzhou'},
      ],
      list2: [
        {
          text: '浙江',
          value: 'Zhejiang',
          children: [
            {
              text: '杭州',
              value: 'Hangzhou',
              children: [
                {text: '西湖区', value: 'Xihu'},
                {text: '余杭区', value: 'Yuhang'},
              ],
            },
            {
              text: '温州',
              value: 'Wenzhou',
              children: [
                {text: '鹿城区', value: 'Lucheng'},
                {text: '瓯海区', value: 'Ouhai'},
              ],
            },
          ],
        },
        {
          text: '福建',
          value: 'Fujian',
          children: [
            {
              text: '福州',
              value: 'Fuzhou',
              children: [
                {text: '鼓楼区', value: 'Gulou'},
                {text: '台江区', value: 'Taijiang'},
              ],
            },
            {
              text: '厦门',
              value: 'Xiamen',
              children: [
                {text: '思明区', value: 'Siming'},
                {text: '海沧区', value: 'Haicang'},
              ],
            },
          ],
        },
      ],
      roles: [
        {
          label: '战士',
          value: '战士',
          children: [
            {
              label: '夏侯惇',
              value: '夏侯惇',
            },
            {
              label: '吕布',
              value: '吕布',
            },
            {
              label: '铠',
              value: '铠',
            },
            {
              label: '狂铁',
              value: '狂铁',
            },
          ],
        },
        {
          label: '法师',
          value: '法师',
          children: [
            {
              label: '安琪拉',
              value: '安琪拉',
            },
            {
              label: '扁鹊',
              value: '扁鹊',
            },
            {
              label: '不知火舞',
              value: '不知火舞',
            },
            {
              label: '嫦娥',
              value: '嫦娥',
            },
          ],
        },
      ],
      show: false,
      show1: false,
      show2: false,
    };
  },


};
</script>

<style scoped>

</style>
