<template>
  <div :style="{width:autoCountWidth+'px'}" class="vux-data-table">
    <table :border="borderWidth" class="table">
      <colgroup>
        <col v-for="(item, index) in allColumns" :key="index" :title="item.prop" :width="item.width">
      </colgroup>
      <thead :class="[fixedHeader?'fixedHeader':'']">
      <tr :style="{backgroundColor:headColor}" class="tr">
        <th v-for="(item, index) in allColumns" :key="index"
            :style="{textAlign: textAlignment}" class="th">
          <div v-if="item.hasOwnProperty('type')&&item.type=='checkbox'">
            <input v-model="isCheckAll" type="checkbox" @click="handleCheckAll"/>
          </div>
          <div v-else style="display: flex;align-items: center;justify-content: center">
            {{ item.label }}
            <div v-if="item.hasOwnProperty('sort')"
                 :class="[item.sortType==='asc'?'asc':'desc']"
                 class="sort-icon"
                 style="display:inline-block;margin-left: 6px" @click="handleSort(item)"></div>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData" :key="index" :style="{textAlign: textAlignment}" class="list-tr">
        <td v-for="(tp) in typesColumns" :key="tp.type" class="td">
          <span v-if="tp.type=='index'">{{ index + 1 }}</span>
          <div v-if="tp.type==='radio'">
            <input v-model="item.isCheck" type="checkbox"
                   @click="handleRadio(item)"></input>
          </div>
        </td>
        <td v-for="(context, i) in renderColumns" :key="i">
          <span v-if="item.isEdit">
            <input ref="inputData" v-model="item[context.prop]" :disabled="context.prop==='op'||!context.prop"
                   class="vux-data-table input"
                   type="text">
            <span style="white-space: nowrap">
              <vux-button link size="mini" type="primary"
                          @click="handleSave(item)">保存</vux-button>
            <vux-button link size="mini" type="danger" @click="cancelEdit(item,index)"
            >取消</vux-button>
            </span>
          </span>
          <slot v-else :name="context.prop" v-bind="item">
            <div :style="context.width?'width:'+context.width+'px':''" class="uni-ellipsis"
                 @click="handleItemClick(item,index)">{{
                item[context.prop]
              }}
            </div>
          </slot>
        </td>
      </tr>
      <tr v-if="tableData.length>0&&totalFooter">
        <td v-for="(tdItem,index) in columns" :key="tdItem.label" style="height: 40px;text-align: center;">
          <span v-if="index===0" style="font-weight: bold;white-space: nowrap">合计</span>
          <span v-if="tdItem.hasOwnProperty('total')" style="color: red;font-weight: bold">{{ totalNum(tdItem) }}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="!tableData.length" class="empty-text">
      <span>{{ emptyText }}</span>
    </div>
  </div>
</template>
<script>
import {floatAdd, floatDiv} from "src/utils/util"

export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    textAlignment: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].includes(val)
      }
    },
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    width: {
      type: String,
      default: ""
    },
    //表头颜色
    headColor: {
      type: String,
      default: "#909399"
    },
    //表格背景颜色
    bgColor: {
      type: String,
      default: "#fff"
    },
    //表头固定
    fixedHeader: {
      type: Boolean,
      default: false
    },
    //合计
    totalFooter: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    //是否开启表格斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    operation: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: [String, Number],
      default: "1"
    },
    cancellable: {
      type: Boolean
    },
  },
  data() {
    return {
      isCheckAll: false,
      selectList: [],
      singleData: {},
      copyItem: {}
    }
  },
  created() {
  },
  activated() {

  },


  computed: {
    tableData: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
        //
        this.$emit('change', val)
      }
    },

    typesColumns() {
      return this.columns.filter(item => item.hasOwnProperty("type"))
    },
    renderColumns() {
      return this.columns.filter(item => !item.hasOwnProperty("type"))
    },
    allColumns() {
      return this.typesColumns.concat(this.renderColumns)
    },
    autoCountWidth() {
      if (this.width) {
        return this.width
      } else if (this.columns.some(item => item.hasOwnProperty("width"))) {
        return this.columns.reduce((prev, curr) => {
          return prev += Number(curr.width)
        }, 0)
      }
    }
  },
  methods: {
    cancelEdit(item, index) {
      if (!this.editable) {
        return
      }
      this.tableData.forEach((it, i) => {
        if (i === index) {
          this.$set(this.tableData, index, {...this.copyItem, isEdit: false})
        } else {
          this.$set(this.tableData, i, {...it, isEdit: false})
        }
      })

    },
    handleItemClick(item, index) {
      if (!this.editable) {
        this.$emit("click", item)
        return
      }
      this.copyItem = item;
      this.tableData.forEach((it, i) => {
        if (i === index) {
          //解决双向绑定失效问题
          this.$set(this.tableData, index, {...item, isEdit: true})
        } else {
          this.$set(this.tableData, i, {...it, isEdit: false})
        }
      })
      // this.$nextTick(() => {
      //   this.$refs.inputData.focus()
      // })


    },
    handleSave(item) {
      // 直接将修改好数据返回
      this.$emit('save', item)
    },
    // handleItemClick(item, index) {
    //   this.$emit("click", item)
    // },
    //全选
    handleCheckAll() {
      this.isCheckAll = !this.isCheckAll
      this.tableData.forEach(item => {
        item.isCheck = this.isCheckAll
      })
      if (this.isCheckAll) {
        this.selectList = this.tableData
      } else {
        this.selectList = []
      }
      this.$emit("selectionChange", this.selectList)
    },
    handleRadio(item, index) {
      this.tableData = this.tableData.map(it => {
        it.isCheck = false
        return it
      })
      if (item.isCheck) {
        this.selectList = this.tableData.filter(item => item.isCheck)
      } else {
        const delIndex = this.selectList.findIndex(it => it.isCheck);
        this.selectList.splice(delIndex, 1)
      }
      this.$emit('selectionChange', this.selectList)

    },
    handleSort(item) {
      //从小到大
      if (item.sortType === "asc") {
        this.tableData = this.tableData.sort((a, b) => {
          if (this.isNumber(a[item.prop])) {
            return a[item.prop] - b[item.prop]
          }
          return a[item.prop].localeCompare(b[item.prop])
        })
        item.sortType = "desc"
      } else {
        this.tableData = this.tableData.sort((a, b) => {
          if (this.isNumber(a[item.prop])) {
            return b[item.prop] - a[item.prop]
          }
          return b[item.prop].localeCompare(a[item.prop])
        })
        item.sortType = "asc"
      }
    },
    //求和
    totalNum(item) {
      let total = 0
      this.tableData.forEach(el => {
        total = floatAdd(total, Number(el[item.prop]))
      })
      switch (item.totalType) {
        case "AVG":
          return floatDiv(total, this.tableData.length)
        case "SUM":
          return total
        default:
          return total
      }
    },
    isNumber(val) {
      const reg = /^\d+.?\d*/ //判断是否是数字。
      return reg.test(val)
    }
  }
}
</script>
<style lang="less" scoped>
.vux-data-table {
  &.input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 36px;
    outline: none;
    padding: 0 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;


    &:focus {
      border: 1px solid #0068ff;
    }

  }

  //overflow-x: auto;
  .table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-left: 1px solid #E4E7ED;
    border-top: 1px solid #E4E7ED;

    .fixedHeader {
      position: sticky;
      top: 0;
    }

    th, td {
      border-right: 1px solid #E4E7ED;
      border-bottom: 1px solid #E4E7ED;
    }

    .th {
      position: relative;
      font-size: 14px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .list-tr:nth-child(2n) {
      background-color: #F8F9FB;
    }

    .list-tr {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }

  .empty-text {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    color: #333;
  }

  .sort-icon {
    /*宽高为0*/
    width: 0;
    height: 0;
    border-top: 5px solid #666666;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin-left: 4px;

    &.asc {
      transition: all 0.5s ease-in-out;
      transform: rotate(180deg);
    }

    &.desc {
      transition: all 0.5s ease-in-out;
    }
  }

  .sort-icon::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
}
</style>
