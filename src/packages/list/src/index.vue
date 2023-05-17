<template>
  <div
      ref="containerRef"
      :style="{ height: containerHeight, overflow: 'auto' }"
  >
    <div ref="wrapperRef" class="wrapper">
      <div :style="{ paddingTop: startOffset + 'px', paddingBottom: endOffset + 'px' }">
        <Item
            v-for="(item, index) in visibleData"
            :key="startIndex + index"
            :index="startIndex + index"
            :item="item"
            @cache-position="cachePosition"
        >
          <slot v-bind="item"></slot>
        </Item>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item.vue'

export default {
  components: {
    Item,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    containerHeight: {
      type: [Number, String],
      default: '100%'
    },
    defaultHeight: {
      type: Number,
      default: 100,
    },
    bufferSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      startOffset: 0,
      endOffset: 0,
      visibleData: [],
      anchorItem: {
        index: 0,
        top: 0,
        bottom: 0,
      },
    };
  },
  computed: {
    startIndex() {
      return this.anchorItem.index;
    },
    endIndex() {
      return this.startIndex + this.visibleCount;
    },
    visibleCount() {
      return Math.ceil(this.$refs.containerRef.getBoundingClientRect().height / this.defaultHeight) + this.bufferSize;
    },
  },
  mounted() {
    this.cache = {};
    this.$nextTick(() => {
      this.updateVisibleData();
      this.list.forEach((item, index) => {
        this.cache[index] = {
          index: index,
          top: index * this.defaultHeight,
          bottom: index * this.defaultHeight + this.defaultHeight,
        };
      });
      this.$refs.containerRef.addEventListener("scroll", this.handleScroll, false);
    });
  },
  beforeDestroy() {
    this.$refs.containerRef.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    cachePosition(node, index) {
      const rect = node.getBoundingClientRect();
      const wrapperRect = this.$refs.wrapperRef.getBoundingClientRect();
      const top = rect.top - wrapperRect.top;
      this.cache[index] = {
        index,
        top,
        bottom: top + rect.height,
      };
    },
    handleScroll(e) {
      console.log(e, 'e')
      const curScrollTop = this.$refs.containerRef.scrollTop;
      if (
          (curScrollTop > this.anchorItem.bottom && curScrollTop > this.anchorItem.top) ||
          (curScrollTop < this.anchorItem.bottom && curScrollTop < this.anchorItem.top)
      ) {
        this.updateBoundaryIndex(curScrollTop);
        this.updateVisibleData();
      }
    },
    updateBoundaryIndex(scrollTop = 0) {
      const newAnchorItem = this.cache[
          Object.keys(this.cache).find((key) => this.cache[key].bottom >= scrollTop)
          ];
      if (!newAnchorItem) {
        return;
      }
      this.anchorItem = {...newAnchorItem};
    },
    updateVisibleData() {
      this.visibleData = this.list.slice(this.startIndex, this.endIndex);
      this.startOffset = this.anchorItem.top;
      this.endOffset = (this.list.length - this.endIndex) * this.defaultHeight;
    },
  },
};
</script>
