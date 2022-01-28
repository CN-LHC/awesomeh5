<template>
  <div class="holder">
    <canvas id="granim-canvas"></canvas>

    <h1>改变颜色</h1>
    <ul>
      <li @click="changeState('default-state')">绿色缓慢渐变</li>
      <li @click="changeState('purpleFast')">紫色快速渐变</li>
      <li @click="changeState('staticOrange')">橙色静态渐变</li>
    </ul>

    <h1>改变渐变方向</h1>
    <ul>
      <li @click="changeDirection('diagonal')">diagonal</li>
      <li @click="changeDirection('left-right')">left-right</li>
      <li @click="changeDirection('top-bottom')">top-bottom</li>
      <li @click="changeDirection('radial')">radial</li>
      <li @click="changeDirection('custom')">自定义</li>
    </ul>

    <h1>叠加图片</h1>
    <ul>
      <li>开启</li>
      <li>关闭</li>
    </ul>
  </div>
</template>
<script>
import Granim from "granim";
export default {
  data: function () {
    return {
      granimInstance: null,
    };
  },
  components: {},
  methods: {
    initGranimBg() {
      this.granimInstance = new Granim({
        element: "#granim-canvas",
        name: "granim",
        opacity: [1, 1],
        direction: "diagonal",
        isPausedWhenNotInView: true,
        stateTransitionSpeed: 600,
        customDirection: {
          x0: "40%",
          y0: "10px",
          x1: "60%",
          y1: "50%",
        },
        // image: {
        //   source: "../assets/img/bg-forest.jpg",
        //   position: ["center", "bottom"],
        //   stretchMode: ["stretch", "stretch-if-bigger"],
        //   blendingMode: "multiply",
        // },
        states: {
          "default-state": {
            gradients: [
              ["#B3FFAB", "#12FFF7"],
              ["#ADD100", "#7B920A"],
              ["#1A2980", "#26D0CE"],
            ],
            transitionSpeed: 10000,
          },
          purpleFast: {
            gradients: [
              ["#9D50BB", "#6E48AA"],
              ["#4776E6", "#8E54E9"],
            ],
            transitionSpeed: 2000,
          },
          staticOrange: {
            gradients: [["#FF4E50", "#F9D423"]],
            loop: false,
          },
        },
      });
    },
    changeState(stateName) {
      this.granimInstance.changeState(stateName);
    },
    changeDirection(direction) {
      this.granimInstance.changeDirection(direction);
    },
  },
  mounted() {
    this.initGranimBg();
  },
};
</script>
<style lang="less" scoped>
#granim-canvas {
  position: fixed;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.holder {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
    color: #333;
    margin-bottom: 10px;
  }
  ul {
    font-size: 16px;
    margin-bottom: 20px;
    li {
      display: inline-block;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.8);
      color: #222;
      padding: 8px 12px;
      margin: 5px;
      border-radius: 4px;
    }
  }
}
</style>
