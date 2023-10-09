<script>
import VuxPopup from "@/packages/popup/index.vue";

export default {
  name: "VuxActionSheet",
  components: {VuxPopup},
  data() {
    return {}
  },
  computed: {
    showCom: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },

  },
  methods: {
    handleClick(item) {
      this.$emit("select", item)
    },
    handleCancel() {
      this.$emit("cancel")
    }
  },
  props: {
    show: {
      type: Boolean
    },
    actions: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Number]
    }

  }
}
</script>

<template>
  <vux-popup :show.sync="showCom" position="bottom" round>
    <div v-for="(item,index) in actions" class="vux-action-sheet">
      <div class="vux-action-sheet item" @click="handleClick(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="vux-action-sheet gap"></div>
    <div class="vux-action-sheet item" style="margin-top: 8px" @click="handleCancel">
      取消
    </div>
  </vux-popup>
</template>

<style lang="less" scoped>

.vux-action-sheet {
  &.item {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  &.gap {
    height: 8px;
    background: #f7f8fa;
  }
}

</style>
