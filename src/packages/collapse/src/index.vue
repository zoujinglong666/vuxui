<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuxCollapse",
  data() {
    return {
      // 展开的项可一个，可多个（使用层v-model数组传的有谁，就展开谁）
      activeNames: this.value, // 收集谁需要展开
    };
  },
  props: {
    //是否开启手风琴模式
    accordion: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => []
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    showOperation: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    defaultExpandAll(val) {
      this.expandAndCollapse(val)
    },

    // 监听props中value的变化，及时更新
    value(value) {
      this.activeNames = value;
    },
  },
  mounted() {
    if (this.defaultExpandAll) {
      this.expandAndCollapse(this.defaultExpandAll)
    }

  },

  methods: {
    expandAndCollapse(val) {
      this.$nextTick(() => {
        this.$children.forEach(item => {
          item.isOpen = val;
        })
      })
    },
    updateParent(name, isOpen, vNode) {
      // 若为手风琴模式
      if (this.accordion && isOpen) {
        this.closeOther(name)
        this.activeNames = [name]
      } else {
        if (!this.activeNames.includes(name)) {
          this.activeNames.push(name);
        } else {
          this.activeNames = this.activeNames.filter(it => it !== name)
        }
      }
      this.$emit("input", this.activeNames);
      this.$emit("change", this.activeNames);
    },
    closeOther(name) {

      this.$children.forEach((item) => {
        // 将除了自身以外的都置为false，故其他的就都折叠上了
        if (item.name !== name) {
          item.isOpen = false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
