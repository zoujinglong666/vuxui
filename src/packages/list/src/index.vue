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
    this.cache = {};
    this.updateVisibleData();
    this.list.forEach((item, index) => {
      this.cache[index] = {
        index: index,
        top: index * this.defaultHeight,
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
      requestAnimationFrame(() => {
        const curScrollTop = this.$refs.containerRef.scrollTop;
        if (
            (curScrollTop > this.anchorItem.bottom && curScrollTop > this.anchorItem.top) ||
            (curScrollTop < this.anchorItem.bottom && curScrollTop < this.anchorItem.top)
        ) {
          this.updateBoundaryIndex(curScrollTop);
          this.updateVisibleData();
        }
        if (this.endIndex + this.bufferSize > this.list.length) {
          this.endOffset = 0;
        }
      });
    },
    updateBoundaryIndex(scrollTop = 0) {
      console.log(scrollTop, 'curScrollTop')
      console.log()
      const newAnchorItem = this.cache[
          Object.keys(this.cache).find((key) => this.cache[key].bottom >= scrollTop)
          ];
      if (!newAnchorItem) {
        return;
      }
      this.anchorItem = {...newAnchorItem};
    },
    updateVisibleData() {
      console.log(this.anchorItem)
      this.visibleData = this.list.slice(this.startIndex, this.endIndex);
      this.startOffset = this.anchorItem.top;
      console.log(this.cache)

      this.endOffset = (this.list.length - this.endIndex) * this.defaultHeight;
    },
  },
};
</script>
<!--<template>-->
<!--  <div style="overflow: hidden;margin: 0;">-->
<!--    <el-row>-->
<!--      <el-col :span="24">-->
<!--        &lt;!&ndash; 此处就是用来显示输入框、选择器这类组件的地方 &ndash;&gt;-->
<!--        <el-form :model="props.form" :label-position="responsiveMap.xs ? 'top' : 'left'"-->
<!--                 :label-width="responsiveMap.xs ? 'auto' : 'auto'">-->
<!--          <el-row :gutter="8" :cols="cols" :collapse="collapsed">-->
<!--            <el-col v-for="item in allSlotsName" :key="item" :span="resultCol">-->
<!--              <slot :name="item"></slot>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-form>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {ElButton, ElDivider, ElForm, ElRow, ElCol, ElIcon} from 'element-plus';-->

<!--const collapsed = ref(false);-->
<!--const cols = {xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6};-->
<!--const slots = useSlots();-->
<!--const allSlotsName = computed(() => Object.keys(toRaw(slots)));-->
<!--console.log(allSlotsName, 'allSlotsNames')-->
<!--const props = defineProps({-->
<!--  form: {type: Object, required: true}, onSearchQuery: {-->
<!--    type: Function, default: () => {-->
<!--    }-->
<!--  },-->
<!--  onResetQuery: {-->
<!--    type: Function, default: () => {-->
<!--    }-->
<!--  }-->
<!--});-->

<!--const colArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];-->
<!--const responsiveMap = {-->
<!--  xs: '(max-width: 575px)',-->
<!--  sm: '(min-width: 576px)',-->
<!--  md: '(min-width: 768px)',-->
<!--  lg: '(min-width: 992px)',-->
<!--  xl: '(min-width: 1200px)',-->
<!--  xxl: '(min-width: 1600px)'-->
<!--};-->

<!--const screens = reactive({xs: true, sm: true, md: true, lg: true, xl: true, xxl: true});-->
<!--const resultCol = computed(() => {-->
<!--  let res = 1;-->
<!--  for (let i = 0; i < colArr.length; i++) {-->
<!--    const breakpoint = colArr[i];-->
<!--    if (screens[breakpoint] || breakpoint === 'xs') {-->
<!--      res = cols[breakpoint];-->
<!--      console.log(res, 'res')-->
<!--      break;-->
<!--    }-->
<!--  }-->
<!--  return res;-->
<!--});-->
<!--const multipleRows = computed(() => {-->
<!--  return !collapsed.value && allSlotsName.value.length > resultCol.value;-->
<!--});-->
<!--const matchHandlers = {};-->
<!--onMounted(() => {-->
<!--  Object.keys(responsiveMap).forEach(screen => {-->
<!--    const matchMediaQuery = responsiveMap[screen];-->
<!--    if (!matchMediaQuery) return;-->
<!--    const listener = ({matches}) => {-->
<!--      screens[screen] = matches;-->
<!--    };-->
<!--    const mql = window.matchMedia(matchMediaQuery);-->
<!--    if (mql.addEventListener) {-->
<!--      mql.addEventListener('change', listener);-->
<!--    } else {-->
<!--      mql.addListener(listener);-->
<!--    }-->
<!--    matchHandlers[matchMediaQuery] = {mql, listener};-->
<!--    listener(mql);-->
<!--  });-->
<!--});-->
<!--onUnmounted(() => {-->
<!--  Object.keys(responsiveMap).forEach(screen => {-->
<!--    const matchMediaQuery = responsiveMap[screen];-->
<!--    if (!matchMediaQuery) return;-->
<!--    const handler = matchHandlers[matchMediaQuery];-->
<!--    if (handler && handler.mql && handler.listener) {-->
<!--      if (handler.mql.removeEventListener) {-->
<!--        handler.mql.removeEventListener('change', handler.listener);-->
<!--      } else {-->
<!--        handler.mql.removeListener(handler.listener);-->
<!--      }-->
<!--    }-->
<!--  });-->
<!--});-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--:deep(.el-select) {-->
<!--  display: flex;-->
<!--  flex: 1;-->
<!--  width: 100%;-->
<!--}-->
