<template>
  <div>
    <vux-popup v-model="visible" round>
      <div class="vux_data_picker">
        <div v-if="showToolbar" class="vux_data_picker--toolbar">
          <div>
            <vux-button link size="small" @click="onCancel"> {{ cancelText }}
            </vux-button>
          </div>
          <div v-if="title">
            {{ titleLabel }}
          </div>
          <div>
            <vux-button link size="small" type="primary" @click="onConfirm"> {{ confirmText }}
            </vux-button>
          </div>
        </div>
        <div class="vux_data_picker--columns">
          <Column
              v-for="(column,index)
         in formatColumns"
              :key="index"
              ref="columnRef"
              :columns="dataType==='cascade'?column[columnsFieldNames.values]:column"
              :default-index="column.defaultIndex?columns.defaultIndex:defaultIndex"
              :itemHeight="itemHeight"
              :readonly="readonly"
              :swipeDuration="swipeDuration"
              :text-key="valueKey" :visibleItemCount="visibleItemCount" @change="onChange(index)">
          </Column>
        </div>
      </div>
    </vux-popup>
  </div>
</template>
<script>
import Column from './PickerColumn'
import {isTwoArray} from "../utils";
import {basePickerProp} from "../prop";
import VuxPopup from "@/packages/popup/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "VuxPicker",
  components: {
    VuxButton,
    VuxPopup,
    Column,
  },
  data() {
    return {
      formatColumns: [],
      currentValue: this.value
    }
  },
  model: {
    prop: "value",
  },
  props: {
    ...basePickerProp,
    show: {
      type: Boolean
    },

  },
  computed: {
    visible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    children() {
      return this.$refs.columnRef
    },
    titleLabel() {
      const {title} = this;
      return title ? title : ''
    },
    heightStyle() {
      return {
        height: this.itemHeight * this.visibleItemCount + 'px'
      }
    },
    dataType() {
      const firstColumn = this.columns[0];
      if (isTwoArray(this.columns)) {
        return 'object'
      } else if (firstColumn.hasOwnProperty('children') && this.columnsFieldNames) {
        return 'cascade'
      } else {
        return 'plain';
      }
    },
    columnsFieldNames() {
      const {columnsField, valueKey} = this;
      return {
        text: columnsField.text || valueKey || 'text',
        values: columnsField.values || 'values',
        children: columnsField.children || 'children',
      };
    }
  },
  mounted() {
    this.format()
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.emitChange(val)
    }
  },
  created() {
    this.format()
  },
  activated() {
    this.format()
  },

  methods: {
    onCancel(e) {
      this.visible = false;
      this.$emit('cancel', e)
    },
    emitChange(val) {
      this.$emit('input', val)
      // this.$emit('change', val)
    },
    onConfirm() {
      const {children, dataType, valueKey, prop} = this;
      const values = children.map(item => item.options)
      const indexes = this.getIndexes()
      // const confirmValue = dataType === 'plain' ? {value: indexes.map((item, i) => values[i][item])[0],index:indexes[0]} : indexes.map((item, i) => values[i][item]).map(item => item[valueKey])
      const confirmValue = dataType === 'plain' ? indexes.map((item, i) => values[i][item])[0] : indexes.map((item, i) => values[i][item]).map(item => item[valueKey])
      const value = prop ? confirmValue[prop] : confirmValue
      this.$emit('confirm', value)
      console.log(value)
      this.emitChange(value)
      this.visible = false;
    },
    format() {
      if (this.dataType === 'plain') {
        this.formatColumns = [this.columns];
      }
      if (this.dataType === 'object') {
        this.formatColumns = this.columns;
      }
      if (this.dataType === 'cascade') {
        this.formatColumns = this.formatCascade();
      }
    },

    getValues() {
      if (this.children) {
        return this.children.map((child) => child.getValue())
      }
    },
    getIndexes() {
      if (this.children) {
        return this.children.map((child) => child.getIndex())
      }
    },
    onChange(columnIndex) {
      //子组件实例所在索引
      // columnIndex
      const {dataType} = this;
      if (dataType === 'cascade') {
        this.cascadeChange(columnIndex)
      }
      if (dataType === 'plain') {
        this.$emit('change', this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        // this.$emit('change', this.getValues(), columnIndex);
        this.$emit('change', this.getValues(), this.getIndexes());
      }
    },
    getColumnValue(index) {
      const column = this.children[index];
      if (column) {
        return column.getValue()
      }
    },
    getColumnIndex(index) {
      const column = this.children[index];
      if (column) {
        return column.index
      }

    },
    setColumnValues(index, options) {
      const column = this.children[index];
      if (column) {
        column.setOption(options);
      }
    },
    formatCascade() {
      const res = []
      const {columnsFieldNames} = this;
      let cursor = {
        [columnsFieldNames.children]: this.columns,
      };

      while (cursor && cursor[columnsFieldNames.children]) {
        const children = cursor[columnsFieldNames.children];
        console.log(children, 'children')
        let defaultIndex = this.defaultIndex !== null && this.defaultIndex !== undefined ? +this.defaultIndex : cursor.defaultIndex;
        while (children[defaultIndex] && children[defaultIndex].disabled) {
          if (defaultIndex < children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }
        res.push({
          [columnsFieldNames.values]: cursor[columnsFieldNames.children],
          defaultIndex,
        });
        console.log(res)
        cursor = children[defaultIndex];
      }
      return res;
    },
    cascadeChange(columnIndex) {
      const {columnsFieldNames} = this;
      let cursor = {
        [columnsFieldNames.children]: this.columns,
      };
      const cache = {};
      const getIndexesMemoized = (startIndex) => {
        if (cache[startIndex]) {
          console.log("缓存结果")
          return cache[startIndex];
        }
        const result = this.getIndexes(startIndex);
        cache[startIndex] = result;
        return result;
      };
      const indexes = getIndexesMemoized(0); // use the memoized function
      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor[columnsFieldNames.children][indexes[i]];
      }
      while (cursor && cursor[columnsFieldNames.children]) {
        columnIndex++;
        this.setColumnValues(columnIndex, cursor[columnsFieldNames.children]);
        cursor = cursor[columnsFieldNames.children][cursor.defaultIndex || 0];
      }
    },
  }
}
</script>

<style lang="less" scoped>
.vux_data_picker {
  display: flex;
  flex-direction: column;

  &--toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }

  &--columns {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
  }

}
</style>





