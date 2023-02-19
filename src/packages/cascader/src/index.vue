<template>
  <vuxDrawer v-model="curOpen" :closeable="closeable" :height="80" :title="title" round>

    <div></div>
    <div v-for="(item,index) in options" :key="item.label">

      <vux-cell :title="item.label" @click="handleClick(item)"></vux-cell>
    </div>
  </vuxDrawer>
</template>

<script>


export default {
  name: "VuxCascader",
  components: {},

  data() {
    return {
      curOpen: this.open,

    };
  },
  model: {
    prop: 'open',
  },
//   close-btn	Boolean / Slot	true	关闭按钮	N
// keys	Object	-	用来定义 value / label 在 options 中对应的字段别名。TS 类型：KeysType	N
// custom-style v0.25.0	String	-	自定义组件样式	N
// options	Array	[]	可选项数据源。TS 类型：Array<CascaderOption>	N
// sub-titles	Array	[]	每级展示的次标题。TS 类型：Array<string>	N
// theme	String	'step'	展示风格。可选项：step/tab	N
// title	String / Slot	-	标题	N
// value	String / Number	null	选项值	N
// default-value	String / Number	undefined	选项值。非受控属性	N
// visible	Boolean	false	是否展示
  props: {
    title: String,
    open: {
      type: Boolean,
      default: false,
    },
    prop: {
      type: Object,
      default: () => {
        return {}
      }
    },
    closeable: Boolean,
    subTitle: Boolean,
    value: {
      type: [String, Number]
    },
    theme: {
      type: String,
    },


    options: {

      type: Array,
      default: () => {
        return []
      }

    }


  },
  computed: {},

  watch: {

    open(val) {
      this.curOpen = val;
    },
    curOpen(val) {
      this.$emit('input', val)
    }
  },

  methods: {

    handleClose() {
      this.curOpen = false;
    },
    handleClick(item) {

      console.log(item)
      const data = this.addLevel(this.options, 0)
      console.log(data, 'data')

    },

    addLevel(list, parentLevel = 0) {
      return list.map(item => {
        return {
          ...item,
          level: parentLevel + 1,
          children: this.addLevel(item.children || [], parentLevel + 1)
        }
      })
    },


    closeMaskHandle(e) {
      if (e.target !== this.$el) {
        return;
      }
      this.handleClose();
    },

  },


};
</script>
<style lang="scss" scoped>


</style>
