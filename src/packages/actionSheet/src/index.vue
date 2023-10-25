<script>
import VuxPopup from "@/packages/popup/src/index.vue";

export default {
  name: "VuxActionSheet",
  components: {VuxPopup},
  data() {
    return {}
  },
  model: {
    prop: "show"
  },
  computed: {
    showCom: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('input', val)
      }
    },

  },
  methods: {
    handleClick(item) {
      this.$emit("select", item)
      this.showCom = false;
    },
    handleCancel() {
      this.$emit("cancel")
      this.showCom = false;
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
    },
    cancelText: {
      type: [String, Number]
    }

  }
}
</script>

<template>
  <vux-popup v-model="showCom" position="bottom" round>
    <div v-for="(item,index) in actions" class="vux-action-sheet">
      <div class="vux-action-sheet item" @click="handleClick(item)">
        {{ item.name }}
      </div>
    </div>
    <div v-if="cancelText" class="vux-action-sheet gap"></div>
    <div v-if="cancelText" class="vux-action-sheet item" @click="handleCancel">
      {{ cancelText }}
    </div>
  </vux-popup>
</template>

<style lang="less" scoped>

.vux-action-sheet {
  &.item {
    height: 48px;
    line-height: 48px;
    text-align: center;
  }

  &.gap {
    height: 8px;
    background: var(--vux-gray-1);
  }
}

</style>
