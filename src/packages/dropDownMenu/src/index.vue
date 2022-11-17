<template>
  <div ref="Rect" class="vux-down-menu" style="box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);">
    <div v-for="(item,key) in titleList" :key="key" class="vux-drop-down-menu title" @click="handleClickTitle(key)">
      <span>{{ item.text }}
      </span>

    </div>
    <slot></slot>
  </div>
</template>
<script>
import {useRect} from "../uitls";

export default {
  name: "VuxDropDownMenu",
  data() {
    return {
      titleList: [],
      offset: 0
    }
  },
//   参数	说明	类型	默认值
//   active-color	菜单标题和选项的选中态颜色	string	#ee0a24
//   direction	菜单展开方向，可选值为up	string	down

  props: {
    activeColor: {
      type: String,
      default: '#0068FF'
    },
    direction: {
      type: String,
      default: 'down',
      validate(val) {
        return ['up', 'down'].includes(val)
      }
    },
  },

  activated() {
    this.init()
    this.renderTitle()
  },
  mounted() {
    this.init()
    this.renderTitle()

  },
  watch: {},


  methods: {

    renderTitle() {
      const value = this.$children.map(item => item.value)
      const data = this.$children.map(item => item.options)
      this.titleList = data.map((it, i) => {
        return it.find(item => item.value == value[i]);
      });

    },
    init() {
      const rect = useRect(this.$refs.Rect);
      const {top, bottom} = rect;
      this.offset = bottom + 40;

    },

    handleClickTitle(active) {
      this.$children.forEach((item, index) => {
        if (active === index) {
          item.toggle()
        } else if (item.isOpen) {
          item.toggle(false)
        }

      })
    }

  }


}
</script>

<style lang="less" scoped>
.vux-down-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.vux-drop-down-menu {
  &.title {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }

}

</style>
