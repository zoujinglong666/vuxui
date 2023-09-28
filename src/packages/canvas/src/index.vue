<template>
  <div class="vux-canvas">
    <!--    画板-->
    <canvas id="canvas"
            ref="canvas"
            :height="canvasHeight" :style="{backgroundColor:bgColor}"
            :width="canvasWidth"
    ></canvas>

    <img v-if="imgSrc" :src="imgSrc" alt="canvas">
    <vux-space style="margin-top: 12px" wrap>
      <vux-button size="small" type="danger" @click="clearCanvas">重签</vux-button>
      <vux-button size="small" type="primary" @click="exportCanvas">确认</vux-button>
      <vux-button :type="isEraser?'success':'default'" size="small" @click="eraserCanvas">橡皮檫</vux-button>
      <vux-button size="small" @click="revokeCanvas">撤回</vux-button>
      <vux-button size="small" @click="antiCancellationCanvas">反撤回</vux-button>
    </vux-space>

  </div>

</template>

<script>

import VuxSpace from "@/packages/space/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";

export default {
  name: "vuxCanvas",
  components: {VuxButton, VuxSpace},
  props: {
    //画板颜色
    bgColor: {
      type: String,
      default: '#f5f7fa'
    },
    //画板宽度
    canvasWidth: {
      type: Number,
      default: 400
    },
    //画板高度
    canvasHeight: {
      type: Number,
      default: 200
    },

    //画笔颜色:
    //todo
    //画板颜色和画笔颜色不能一样
    penColor: {
      type: String,
      default: '#000'
    },
    //画笔宽度
    penWidth: {
      type: Number,
      default: 3
    },

  },
  data() {
    return {
      canvasHistory: [],
      step: -1,
      //橡皮檫状态
      isEraser: false,
      isPenClick: false,
      startPoint: {},
      endPoint: {},
      imgSrc: '',
    }
  },
  mounted() {

    this.init();
  },
  methods: {
    //撤销
    revokeCanvas() {
      if (this.step === -1) {
        this.$msg({
          message: '没事先画上两笔', type: 'error'
        })
        return
      }
      //  记录每一步的轨迹
      var canvas = document.getElementById("canvas"); //获取canvas标签
      var cxt = canvas.getContext("2d");
      if (this.step > 0) {
        this.step--;
        let canvasPic = new Image();
        canvasPic.src = this.canvasHistory[this.step];
        canvasPic.onload = () => {
          cxt.drawImage(canvasPic, 0, 0);
        }
      } else {
        console.log(this.step)
        this.$msg({
          message: '已经是最后一步了', type: 'error'
        })
      }


    },
    //反撤销
    antiCancellationCanvas() {
      const canvas = document.getElementById("canvas"); //获取canvas标签
      const cxt = canvas.getContext("2d");
      if (this.step === -1 || this.canvasHistory.length === 0) {
        return
      }
      if (this.step < this.canvasHistory.length - 1) {
        this.step++;
        let canvasPic = new Image();
        canvasPic.src = this.canvasHistory[this.step];
        canvasPic.onload = function () {
          cxt.drawImage(canvasPic, 0, 0);
        }
      }
    },
    eraserCanvas() {
      this.isEraser = !this.isEraser;
      this.isPenClick = false;
    },
    //重置清空画板
    clearCanvas() {
      const canvas = document.getElementById("canvas"); //获取canvas标签
      const cxt = canvas.getContext("2d"); //创建 context 对象
      cxt.fillStyle = this.bgColor; //画布背景色
      cxt.beginPath();
      cxt.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      cxt.closePath();
      this.imgSrc = '';
      this.isPenClick = false;
      this.step = 0;
      this.canvasHistory = [];
      this.isEraser = false;


    },
    //确认实际就是导出图片
    exportCanvas() {
      const canvas = document.getElementById("canvas"); //获取canvas标签
      this.imgSrc = canvas.toDataURL("image/png"); //将画板保存为图片格式的函数
      this.$emit('exportImgSrc', this.imgSrc)

    },

    init() {
      const canvas = this.$refs.canvas;
      const cxt = canvas.getContext("2d");
      cxt.fillStyle = this.bgColor; //画布背景色
      cxt.fillRect(0, 0, this.canvasWidth, this.canvasHeight); //在画布上绘制 width * height 的矩形，从左上角开始 (0,0)
      canvas.addEventListener("mousemove", this.handleMouseMovement); //鼠标移动事件
      canvas.addEventListener("mousedown", this.handleMouseDown); //鼠标按下事件
      canvas.addEventListener("mouseup", this.handleMouseUp); //鼠标抬起事件
      // //模拟移动端事件
      canvas.addEventListener("touchmove", this.handleMouseMovement); //鼠标移动事件
      canvas.addEventListener("touchstart", this.handleMouseDown); //鼠标按下事件 开始触摸
      canvas.addEventListener("touchend", this.handleMouseUp); //鼠标抬起事件 停止触摸


    },
    //mouseDown  按下
    handleMouseDown(e) {
      const canvas = this.$refs.canvas;
      const cxt = canvas.getContext("2d");
      this.isPenClick = true;
      if (e.clientX !== undefined) {
        this.startPoint = {
          x: e.offsetX,
          y: e.offsetY,
        }
        if (this.isEraser) {
          return
        }
        this.drawCircle(this.startPoint.x, this.startPoint.y);
      } else {

        this.startPoint = {
          x: e.changedTouches[0].clientX - canvas.offsetLeft,
          y: e.changedTouches[0].clientY - canvas.offsetTop
        }

        if (this.isEraser) {
          return
        }
        this.drawCircle(this.startPoint.x, this.startPoint.y);

      }


    },
    //MouseMovement
    handleMouseMovement(e) {
      const canvas = document.getElementById("canvas"); //获取canvas标签
      const cxt = canvas.getContext("2d");

      if (this.isPenClick) {
        if (e.clientX !== undefined) {
          this.endPoint = {
            x: e.offsetX,
            y: e.offsetY,
          }
        } else {
          this.endPoint = {
            x: e.changedTouches[0].clientX - canvas.offsetLeft,
            y: e.changedTouches[0].clientY - canvas.offsetTop
          }
        }
        this.drawLine(cxt)
      }
      //终点重新等于起点
      this.startPoint = this.endPoint;


    },


    //mouseUp
    handleMouseUp() {
      this.isPenClick = false;
      this.recordOperation();
      this.startPoint.x = undefined;
      this.startPoint.y = undefined;

    },
    drawLine(cxt) {
      //让画笔更加圆润
      cxt.lineCap = "round";
      cxt.lineCap = "round";
      //让画笔更加圆润
      if (this.isEraser) {
        cxt.strokeStyle = this.bgColor;
        //清除
        cxt.lineWidth = this.penWidth * 3;

      } else {
        cxt.strokeStyle = this.penColor;
        cxt.lineWidth = this.penWidth;


      }
      cxt.beginPath();
      cxt.moveTo(this.startPoint.x, this.startPoint.y)
      cxt.lineTo(this.endPoint.x, this.endPoint.y);
      cxt.stroke();
    },
    recordOperation() {
      if (this.isEraser) {
        return
      }
      const canvas = document.getElementById("canvas"); //获取canvas标签
      this.step++;
      if (this.step < this.canvasHistory.length) {//历史数组记录的步数
        this.canvasHistory.length = this.step;
      }
      // 添加新的绘制记录到历史记录
      this.canvasHistory.push(canvas.toDataURL());
    },
    //画点函数,模拟点击鼠标按下应出现点击点
    drawCircle(x, y) {
      const canvas = document.getElementById("canvas"); //获取canvas标签
      const cxt = canvas.getContext("2d");
      //让画笔更加圆润
      cxt.lineCap = "round";
      cxt.lineCap = "round";
      //让画笔更加圆润
      if (this.isEraser) {
        cxt.strokeStyle = this.bgColor;
        //清除
        cxt.lineWidth = this.penWidth * 3;

      } else {
        cxt.strokeStyle = this.penColor;
        cxt.lineWidth = this.penWidth;


      }

      // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
      cxt.beginPath();
      // 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
      // 从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
      //这里我们随机生成一个不规则的圆点
      cxt.arc(x, y, 0.1, 0, Math.PI * 2);
      // 通过填充路径的内容区域生成实心的图形
      cxt.fill();
      // 闭合路径之后图形绘制命令又重新指向到上下文中。
      cxt.closePath();
      cxt.stroke();

    },


  },

  deactivated() {
    const canvas = document.getElementById("canvas"); //获取canvas标签
    canvas.removeEventListener("mousemove", this.handleMouseMovement); //鼠标移动事件
    canvas.removeEventListener("mousedown", this.handleMouseDown); //鼠标按下事件
    canvas.removeEventListener("mouseup", this.handleMouseUp); //鼠标抬起事件
    // //模拟移动端事件
    canvas.removeEventListener("touchmove", this.handleMouseMovement); //鼠标移动事件
    canvas.removeEventListener("touchstart", this.handleMouseDown); //鼠标按下事件 开始触摸
    canvas.removeEventListener("touchend", this.handleMouseUp); //鼠标抬起事件 停止触摸
  }


}
</script>

<style lang="less" scoped>

#canvas {
  border: 1px dotted #eee;
  border-radius: 8px;
  margin-top: 8px;
}
</style>
