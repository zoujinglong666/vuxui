<template>

</template>

<script>
// 定义这五种类型
const typeArr = ["primary", "success", "warning", "info", "danger"];
export default {
  name: "vuxBadge",
  props: {
    value: [String, Number],
    type: {
      type: String,
      validator(val) {
        // console.log("校验参数", val);
        // props也可以加入类型校验函数，vue自带的哦，不符合就抛出警告
        if (typeArr.includes(val)) {
          return true;
        } else {
          return false;
        }
      },
    },
    max: {
      type: Number,
      validator(val) { // 校验最大值要是数字
        if (val) {
          if (typeof val === "number") {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
    isDot: Boolean,
    isShow: {
      // 默认展示
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      typeArr,
    };
  },
  computed: {
    showValue() {
      // 如果是小圆点，就不用返回值
      if (this.isDot) {
        return;
      }
      // 如果告知最大值，就做一个判断
      if (this.max) {
        return this.value > this.max ? `${this.max}+` : this.value;
      }
      // 其他的情况，无论是数字或者自定义文字，就正常显示即可
      else {
        return this.value;
      }
    },
    showSup() {
      // isShow为false就隐藏喽
      if (!this.isShow) {
        return false;
      }
      // 内容为空，也隐藏咯
      if (this.value === "") {
        return false;
      }
      // 其他正常显示
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.vux-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block; // 把块元素转换成行内块元素，如此，宽度便由内容撑开了
  // 通过定位，把上标定位到右上角的哦
  .fixedRightTop {
    position: absolute; // 因为上方display: inline-block;了
    top: 0; // 所以定位才正好在插槽内容的右上方了，否则块元素默认宽度100%，那定位就在最右侧了
    right: 3px; // 但是还需要transform平移一下
  }

  sup {
    color: #fff;
    background-color: #f56c6c; // 默认淡红色
    border-radius: 10px; // 加个圆角好看些
    padding: 1px 4px;
    font-size: 12px; // 上标字体要设置最小
    transform: translate(100%, -50%); // 要移动一下才行
    white-space: nowrap; // 自定义文字内容会换行，通过css控制，使之不换行
  }

  // 五种类型配色，这里直接抄官方的
  .primary {
    background-color: #409eff;
  }

  .success {
    background-color: #67c23a;
  }

  .warning {
    background-color: #e6a23c;
  }

  .info {
    background-color: #909399;
  }

  .danger {
    background-color: #f56c6c;
  }

  // 小圆点加样式
  .isDotClass {
    height: 8px;
    width: 8px;
    right: 1px;
    border-radius: 50%;
  }
}
</style>
