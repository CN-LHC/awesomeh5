<template>
  <div class="holder">
    <h1>value: (d) => d?.size,</h1>
    <p>指定数据里的哪个字段作为value进行后续运算。没有默认值，必填。</p>

    <h1>width，height</h1>
    <p>图表宽高，默认350*500</p>

    <h1>valueSuffix:'亿',</h1>
    <p>值后边跟着的后缀，默认为空</p>

    <h1>padding: 3,</h1>
    <p>方块之间的间距，默认为2</p>

    <h1>rectRadius: 2</h1>
    <p>方块的圆角，默认为0</p>

    <h1>colors: ["#ff7f50", "#4caf50", "#196666", "#503f70"],</h1>
    <p>
      colors可不填，为系统默认色系，如果填入自己的色系，则会覆盖默认值，给出的颜色数量如果少于数据数量会自动循环；如果多余数据数量则冗余的不展示
    </p>

    <h1>duration: 400,</h1>
    <p>动画持续时长，默认为1000</p>

    <h1>delay: 20,</h1>
    <p>元素之间做动画的间隔时长，默认为40</p>

    <h1>ease:'easeCircleInOut'</h1>
    <p>
      入场动画加速减速效果。默认值 easeCubicInOut。 可选项：easeQuadInOut,easeCubicInOut,easeExpInOut,easeCircleInOut,
      剧烈程度依次增强
    </p>

    <h2>
      方块树图1
      <span @click="playIn1('refTreeMap1')">入场</span>
      <span @click="playOut('refTreeMap1')">出场</span>
    </h2>
    <tree-map ref="refTreeMap1" id="refTreeMap1" customClass="c_tree_map1" />

    <h2>
      方块树图2
      <span @click="playIn2('refTreeMap2')">入场</span>
      <span @click="playOut('refTreeMap2')">出场</span>
    </h2>
    <tree-map ref="refTreeMap2" id="refTreeMap2" customClass="c_tree_map2" />
  </div>
</template>
<script>
import treeMap from "@/components/treeMap/index.vue";
import { sleep, randomNum } from "@/utils/utils.js";
export default {
  data: function () {
    return {
      flareData1: [
        { name: "flare", size: null },
        { name: "flare.通信设备", size: 2322 },
        { name: "flare.原件", size: 300 },
        { name: "flare.计算机应用", size: 4925 },
        { name: "flare.电子制造", size: 1954 },
        { name: "flare.互联网传媒", size: 1932 },
        { name: "flare.化学制品", size: 1929 },
        { name: "flare.化学制药", size: 1254 },
        { name: "flare.饮料制造", size: 1954 },
        { name: "flare.光学光电子", size: 2932 },
        { name: "flare.证券", size: 4929 },
        { name: "flare.白酒", size: 1054 },
      ],
      flareData2: [
        { name: "flare", size: null },
        { name: "flare.通信设备", size: 1.2 },
        { name: "flare.原件", size: 12.2 },
        { name: "flare.计算机应用", size: 15.2 },
        { name: "flare.电子制造", size: 0.5 },
        { name: "flare.互联网传媒", size: 8.5 },
      ],
    };
  },
  components: { treeMap },
  methods: {
    playIn1(refName) {
      const chartWidth = (document.body.clientWidth - 40) * 0.3;
      this.$refs[refName].TreeMap(this.flareData1, {
        value: (d) => d?.size,
        width: chartWidth,
        height: chartWidth * 1.6,
        valueSuffix: "亿",
        padding: 3,
        rectRadius: 4,
        colors: [
          "#fafa6e",
          "#f3f066",
          "#ebe65f",
          "#e3dc57",
          "#dcd250",
          "#d4c848",
          "#cdbf41",
          "#c5b539",
          "#bdac32",
          "#b5a22b",
          "#ae9923",
          "#a6901b",
          "#9e8713",
          "#967e08",
        ].reverse(),
        duration: 400,
        delay: 20,
        ease: "easeCircleInOut",
      });
    },
    playIn2(refName) {
      const chartWidth = (document.body.clientWidth - 40) * 0.3;
      this.$refs[refName].TreeMap(this.flareData2, {
        width: chartWidth,
        height: chartWidth * 1.6,
        value: (d) => d?.size,
        valueSuffix: "%",
        padding: 10,
        rectRadius: 1,
        colors: ["#ff7f50", "#4caf50", "#196666", "#503f70"],
        duration: 400,
        delay: 20,
        ease: "easeCircleInOut",
      });
    },
    playOut(refName) {
      this.$refs[refName].playOut();
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.holder {
  padding: 20px;
}
h2 {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: normal;
  color: #333;
  span {
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    background: #999;
    color: #fff;
    user-select: none;
    margin: 0 3px;
  }
  span:nth-of-type(1) {
    background: #447746;
  }
  span:nth-of-type(2) {
    background: #953e23;
  }
}
h1 {
  font-size: 18px;
  color: #9c27b0;
  margin-bottom: 10px;
}
p {
  margin-bottom: 20px;
  color: #555;
}

.svg_gradient {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: -1;
}
@font-face {
  font-family: "harmony-midium";
  src: url("../../../../assets/fonts/HarmonyOS_Sans_SC_Medium.ttf?t=1638171342335") format("truetype");
}
.c_tree_map1 {
  display: inline-block;
  min-height: 350px;
  margin-bottom: 20px;
  background: #f9dbcf;
  /deep/ .txt1 {
    fill: #fff;
    font-size: 16px;
  }
  /deep/ .txt2 {
    fill: #fff;
    font-family: "harmony-midium";
  }
}
.c_tree_map2 {
  display: inline-block;
  min-height: 350px;
  background: #b0d0ca;
  /deep/ .txt1 {
    fill: #fff;
    font-size: 18px;
  }
  /deep/ .txt2 {
    fill: #fff;
    font-family: "harmony-midium";
  }
}
</style>
