<template>
  <!--  <vux-picker title="标题" :columns="columns" :show.sync="show"/>-->
  <!--  <vux-picker title="标题" :columns="columns1" :show.sync="show"/>-->
  <vux-picker :columns="roles" :columns-field="{
   text: 'label',
                values: 'values',
                children: 'children',
  }" :show.sync="show" title="标题" value-key="label"></vux-picker>
</template>

<script>
export default {
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

      areaList: [
        {
          label: '北京市',
          value: '110000',
          children: [
            {
              value: '110100',
              label: '北京市',
              children: [
                {value: '110101', label: '东城区'},
                {value: '110102', label: '西城区'},
                {value: '110105', label: '朝阳区'},
                {value: '110106', label: '丰台区'},
                {value: '110107', label: '石景山区'},
                {value: '110108', label: '海淀区'},
                {value: '110109', label: '门头沟区'},
                {value: '110111', label: '房山区'},
                {value: '110112', label: '通州区'},
                {value: '110113', label: '顺义区'},
                {value: '110114', label: '昌平区'},
                {value: '110115', label: '大兴区'},
                {value: '110116', label: '怀柔区'},
                {value: '110117', label: '平谷区'},
                {value: '110118', label: '密云区'},
                {value: '110119', label: '延庆区'},
              ],
            },
          ],
        },
        {
          label: '天津市',
          value: '120000',
          children: [
            {
              value: '120100',
              label: '天津市',
              children: [
                {value: '120101', label: '和平区'},
                {value: '120102', label: '河东区'},
                {value: '120103', label: '河西区'},
                {value: '120104', label: '南开区'},
                {value: '120105', label: '河北区'},
                {value: '120106', label: '红桥区'},
                {value: '120110', label: '东丽区'},
                {value: '120111', label: '西青区'},
                {value: '120112', label: '津南区'},
                {value: '120113', label: '北辰区'},
                {value: '120114', label: '武清区'},
                {value: '120115', label: '宝坻区'},
                {value: '120116', label: '滨海新区'},
                {value: '120117', label: '宁河区'},
                {value: '120118', label: '静海区'},
                {value: '120119', label: '蓟州区'},
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
      show: true
    };
  },
};
</script>

<style scoped>

</style>