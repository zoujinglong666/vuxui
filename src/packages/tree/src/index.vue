<template>
  <ul class="treeMenu">
    <li v-for="(item, index) in data" :key="item[props.key]">
      <i v-show="item[props.children]" :class="['triangle', carets[tapScopes[index]]]" @click="changeStatus(index)"/>
      <p :class="['treeNode', { 'treeNode--select': item.onSelect }]" @click="changeStatus(index)">
        <vux-checkbox v-if="isSelect"
                      v-model="item.checked" shape="square" size="12" @click="checked(item)"></vux-checkbox>
        <span class="title" @click="tap(item, index)">{{ item[props.label] }}</span>
      </p>
      <vux-tree v-show="scopes[index]" :data="item[props.children]" v-bind="$props" v-on="$listeners"></vux-tree>
    </li>
  </ul>
</template>
<script>
import VuxCheckbox from "@/packages/checkBox/src/index.vue";

const CARETS = {open: 'caret-down', close: 'caret-right'}
export default {
  name: 'vuxTree',
  components: {VuxCheckbox},

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isSelect: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'title',
          key: 'id',
        }
      },
    },
  },
  data() {
    return {
      carets: CARETS,
      tapScopes: {},
      scopes: {},
    }
  },
  methods: {
    operation(type, treeNode) {
      this.$emit('operation', {type, treeNode})
    },
    tap(item, index) {
      this.$emit('node-click', item)
    },
    changeStatus(index) {
      this.$emit('change', this.data[index])
      // 图标变化
      this.$set(this.tapScopes, index, this.tapScopes[index] ? (this.tapScopes[index] === 'open' ? 'close' : 'open') : 'open')
      // 展开闭合
      this.$set(this.scopes, index, !this.scopes[index])
    },
    checked(item) {
      this.$emit('checked', item)
    },
  },
}
</script>
<style scoped>
.treeMenu {
  padding-left: 20px;
  list-style: none;
  position: relative;
  user-select: none;
}

.triangle {
  transition: all 0.1s;
  left: 6px;
  margin: 4px 0 0 0;
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left: 8px solid grey;
}

.caret-down {
  transform: rotate(90deg);
  left: 2px;
  margin: 9px 0 0 0;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
}

.checkbox {
  margin-right: 0.5rem;
}

.treeNode:hover,
.treeNode:hover > .operation {
  color: #3771e5;
  background: #f0f7ff;
}

.treeNode--select {
  background: #f0f7ff;
}

.treeNode:hover > .operation {
  opacity: 1;
}

p {
  position: relative;
  display: flex;
  align-items: center;
}

p > .title {
  cursor: pointer;
}

a {
  color: cornflowerblue;
}

.operation {
  position: absolute;
  right: 0;
  font-size: 18px;
  opacity: 0;
}
</style>
