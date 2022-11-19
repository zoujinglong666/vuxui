<template>
  <div v-show="showWarp" :style="[offsetStyle,heightStyle]" style="position: absolute;width: 100%;">
    <vux-drawer v-model="isOpen" :close-on-click-overlay="closeOnClickOverlay" :placement="directionStyle"
                style="position: absolute;overflow-y: auto;"
                @click.native="clickCloseMark">
      <div v-for="(item,key) in options" :key="key" class="vux-down-menu-item" @click="handleClickItem(item)">
        <div style="display: flex;justify-content: space-between;">
          <div :style="{color:activeColorStyle(item)?activeColor:''}">{{ item.text }}</div>
          <div v-if="activeColorStyle(item)">
            <span :style="{color:activeColorStyle(item)?activeColor:''}">√</span></div>
        </div>
      </div>
      <slot></slot>
    </vux-drawer>

  </div>

</template>

<script>

export default {
  name: "vuxDropDownMenuItem",

  data() {
    return {
      isOpen: false,
      showWarp: false,
      offset: 0,
      activeColor: this.$parent.activeColor,
      direction: this.$parent.direction,
      height: 0,
      closeOnClickOverlay: this.$parent.closeOnClickOverlay,

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
    value: {type: [String, Number, Array, Boolean]},
    disabled: {
      type: Boolean,


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
    directionStyle() {
      return this.direction === 'down' ? 'top' : 'bottom';
    },
    offsetStyle() {
      if (this.direction === 'down') {
        return {
          top: this.$parent.offset + 'px',
        }
      } else {
        return {
          bottom: this.$parent.offset + 'px',
        }
      }

    },
    heightStyle() {
      if (this.direction === 'down') {
        return {
          height: this.height - this.$parent.offset + 'px',
        }
      } else {
        return {
          height: this.height + 'px',
        }
      }
    }
  },

  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
        this.$parent.renderTitle();
      }
    }

  },
  activated() {
    this.init()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.height = window.innerHeight;
    },
    handleClickItem(option) {
      if (this.disabled) {
        return
      }
      this.isOpen = false;
      this.showWarp = false;
      this.$emit('input', option.value);
      this.$emit('change', option);
    },
    toggle(show = !this.isOpen) {
      if (show === this.isOpen) {
        return;
      }
      this.isOpen = show;
      this.showWarp = show;

    },
    clickCloseMark() {
      // if (!this.closeOnClickOverlay) {
      //   return
      // }

      this.$children.forEach(item => {
        item.isOpen = false;
        item.showWarp = false;
      })
    },
    activeColorStyle(item) {
      return item == this.options.find(item => item.value === this.value);
    },


  }
}
</script>

<style lang="less" scoped>


.vux-down-menu-item {
  height: 40px;
  line-height: 40px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}


</style>
