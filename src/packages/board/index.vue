<template>
  <div class="text-container">
    <!--    <p style="white-space:nowrap">本教程涵盖 JavaScript 基础和高级教程。 每章中的实例 通过我们的“亲自试一试”编辑器,您能够修改所有实例并查</p>-->
    <transition class="" mode="out-in" name="slide">
      <p :key="text.id" ref="left" class="text">{{ text.val.title }}</p>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'TextScroll',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    },
    delay: {
      type: Number,
      default: 5000
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: ""
    }

  },
  data() {
    return {
      count: 0, // 当前索引
      intervalId: null, // 定时器ID
      playTime: 5000, // 定时器执行间隔
    };
  },
  computed: {
    text() {
      return {
        id: this.count,
        val: this.data[this.count],
      };
    },
  },
  created: function () {
    this.scrollLeft()
    this.intervalId = setInterval(() => { // 定义定时器
      this.getText();

    }, this.playTime);
  },
  mounted() {

  },

  methods: {
    scrollLeft() {
      const leftContent = this.$refs.left;
      console.log(leftContent)

      setInterval(() => {
        leftContent.style.left++
      })

    },


    getText() {
      const len = this.data.length; // 获取数组长度
      if (!len) {
        return; // 当数组为空时，直接返回
      }
      if (this.count === len - 1) { // 当前为最后一个时
        this.count = 0; // 从第一个开始
      } else {
        this.count++; // 自增
      }
    },
  },
  destroyed() {
    clearInterval(this.intervalId); // 清除定时器
  },
};
</script>

<style scoped>
.text-container {
  display: flex;
  padding: 0 16px;
  height: 40px;
  font-size: 14px;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(251, 248, 220);
  color: #d9500b;
  overflow: hidden;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.4s;
}

.slide-enter {
  transform: translateY(28px);
}

.slide-leave-to {
  transform: translateY(-28px);
}
</style>

