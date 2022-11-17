<template>
  <vux-drawer v-model="isOpen" :style="offsetStyle" placement="top" style="position: absolute;"
              @click.native="clickCloseMark"
  >
    <div v-for="(item,key) in options" :key="key" class="item" @click="handleClickItem(item)">
      <div style="display: flex;justify-content: space-between">
        <div :class="[selectActiveByStyle(item)]">{{ item.text }}</div>
        <div v-if="selectActiveByStyle(item)"><i :class="selectActiveByStyle(item)" class="iconfont icon-add"></i></div>
      </div>
    </div>
    <slot></slot>
  </vux-drawer>
</template>

<script>


export default {
  name: "VuxDropDownMenuItem",

  data() {
    return {
      isOpen: false,
      offset: 0,
    }
  },

  model: {
    prop: 'value',
  },
  props: {

//       参数	说明	类型	默认值
//       v-model	当前选中项对应的 value	number | string	-
//     title	菜单项标题	string	当前选中项文字
//   options	选项数组	Option[]	[]
//   disabled	是否禁用菜单	boolean	false
    value: {
      type: [Number, String]
    },
    disabled: {
      title: Boolean,
    },
    title: {
      type: [Number, String]
    },
    options: {
      type: Array,
      default: () => []
    }


  },
  computed: {


    offsetStyle() {
      return {
        top: this.$parent.offset + 'px',
      }
    },


  },
  watch: {
    value(newVal, oldVal) {
      //这个语句尽量少用，
      // if(val){
      //
      // }
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
        this.$parent.renderTitle();
      }


    }

  },

  methods: {
    handleClickItem(option) {
      this.isOpen = false;
      this.$emit('input', option.value);
      this.$emit('change', option);
    },
    toggle(show = !this.isOpen) {
      if (show === this.isOpen) {
        return;
      }
      this.isOpen = show;

    },
    clickCloseMark() {
      this.$children.forEach(item => {
        item.isOpen = false;
      })
    },
    selectActiveByStyle(item) {
      if (item == this.options.find(item => item.value === this.value)) {
        return 'red'
      }
      return ''
    },


  }
}
</script>

<style lang="less" scoped>
.red {
  color: red;
}

.item {
  height: 40px;
  line-height: 40px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}


</style>
