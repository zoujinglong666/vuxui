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
            :cache-position="cachePosition"
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
      default: '667px'
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
      flag: false,
      endOffset: 0,
      visibleData: [],
      anchorItem: {
        index: 0,
        top: 0,
        bottom: 0,
      },
      cache: {}
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
    this.updateVisibleData();
    this.list.forEach((item, index) => {
      this.cache[index] = {
        index: index,
        top: index * this.defaultHeight,
        rect: this.defaultHeight,
        updateRect: false,
        bottom: index * this.defaultHeight + this.defaultHeight,
      };
    });
    this.$nextTick(() => {

      this.$refs.containerRef.addEventListener("scroll", this.handleScroll, false);
    });
  },
  beforeDestroy() {
    this.$refs.containerRef.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    cachePosition(node, index, updateRect = false) {
      const rect = node.getBoundingClientRect();
      const wrapperRect = this.$refs.wrapperRef.getBoundingClientRect();
      const top = rect.top - wrapperRect.top;
      this.cache[index] = {
        index,
        top,
        updateRect: updateRect,
        rect: rect.height,
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

      // console.log(this.startIndex)
      // console.log(this.visibleCount)
      // console.log(this.list.length)
      if (this.startIndex + this.visibleCount >= this.list.length) {
        this.endOffset = 0;
        return;
      }
    },
    updateBoundaryIndex(scrollTop = 0) {
      console.log(this.cache, 'this.cache')
      const newAnchorItem = this.cache[
          Object.keys(this.cache).find((key) => this.cache[key].bottom >= scrollTop)
          ];
      if (!newAnchorItem) {
        return;
      }
      this.anchorItem = {...newAnchorItem};
    },


    calcRect() {
      const cacheList = Object.values(this.cache);
      this.flag = cacheList.every(item => item.updateRect === true)
      if (this.flag) {
        const total = cacheList.reduce((pre, item) => {
          return pre + item.rect;
        }, 0);
        return total - this.anchorItem.top
      }


    },
    updateVisibleData() {
      console.log(this.flag)
      this.visibleData = this.list.slice(this.startIndex, this.endIndex);
      this.startOffset = this.anchorItem.top;
      this.endOffset = this.flag ? this.calcRect() : this.list.length - this.endIndex * this.defaultHeight;
    },
  },
};
</script>
