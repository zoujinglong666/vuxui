<template>
  <div ref="textOverflow" :style="boxStyle" class="vux-ellipsis-content">
    <span ref="overEllipsis" style="font-size: 14px">{{ realText }}</span>
    <template v-if="showOperation">
      <span v-if="isCutText" ref="slotRef" :class="[expanded?'':'float-right']" style="display: inline-block">
        <vux-button link size="mini" type="primary" @click="toggle()">
          {{ expanded ? stowText : openText }}
        </vux-button>
    </span>
    </template>

  </div>
</template>

<script>
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "vux-ellipsis",
  components: {VuxButton},
  props: {
    content: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 1,
    },
    width: {
      type: Number,
      default: 0,
    },
    openText: {
      type: String,
      default: "展开",
    },
    stowText: {
      type: String,
      default: "收起",
    },
    ellipsisStyle: {
      type: String,
      default: "...",
    },
    showOperation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      offset: this.content.length,
      expanded: false,
      slotBoxWidth: 0,
      textBoxWidth: this.width,
      isCutText: false
    };
  },
  computed: {
    boxStyle() {
      if (this.width) {
        return {
          width: this.width + "px",
        };
      }
    },
    realText() {
      const isCutOut = this.offset !== this.content.length;
      let realText = this.content;
      if (isCutOut && !this.expanded) {
        realText = this.content.slice(0, this.offset) + "...";
      }
      return realText;
    },
  },
  methods: {
    calculateOffset(from, to) {
      this.$nextTick(() => {
        if (Math.abs(from - to) <= 1) return;
        if (this.isOverflow()) {
          to = this.offset;
        } else {
          from = this.offset;
        }
        this.offset = Math.floor((from + to) / 2);
        this.calculateOffset(from, to);
      });
    },
    isOverflow() {
      const {len, lastWidth} = this.getLines();

      if (len < this.rows) {
        return false;
      }
      if (this.rows) {
        // 超出部分 行数 > 最大行数 或则  已经是最大行数但最后一行宽度 + 后面内容超出正常宽度
        const lastLineOver = !!(
            len === this.rows &&
            lastWidth + this.slotBoxWidth > this.textBoxWidth
        );
        if (len > this.rows || lastLineOver) {
          return true;
        }
      }
      return false;
    },
    getLines() {
      const clientRects = this.$refs.overEllipsis.getClientRects();
      return {
        len: clientRects.length,
        lastWidth: clientRects[clientRects.length - 1].width,
      };
    },
    toggle() {
      this.expanded = !this.expanded;
    },
  },
  mounted() {
    const {len} = this.getLines()
    if (len > this.rows) {
      this.isCutText = true
      this.$nextTick(() => {
        if (this.showOperation) {
          this.slotBoxWidth = this.$refs.slotRef.clientWidth;
        }
        this.textBoxWidth = this.$refs.textOverflow.clientWidth;
        this.calculateOffset(0, this.content.length);
      })
    }
  },
};
</script>

<style lang="less" scoped>

.float-right {
  float: right;
}


</style>
