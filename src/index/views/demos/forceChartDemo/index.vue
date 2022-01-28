<template>
  <div class="holder">
    <h1>radius: (d) => d.value,</h1>
    <p>指定读取数据的哪个字段作为圆的半径。必须填，没有默认值</p>

    <h1>radiusRange: [4, 10],</h1>
    <p>指定圆半径的波动范围。默认为[20,40]</p>

    <h1>circleGap: 2,</h1>
    <p>圆和圆之间的空隙，默认为1</p>

    <h1>width: 400, height: 400,</h1>
    <p>图表的宽高，默认640*400</p>

    <h1>duration</h1>
    <p>默认为400ms，动画持续时长，默认为400</p>

    <h1>delay</h1>
    <p>单个元素之间的间隔时长，默认为40ms</p>

    <h1>ease <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a></h1>
    <p>
      加速减速，可选项：easeQuad,easeCubic,easeExp,easeCircle,easeBack。 除了easeBack外，其余的加速度强烈程度依次增加
    </p>

    <h2>
      力图1 (easeBack)
      <span @click="playIn1('refForceChart1')">入场</span>
      <span @click="playOut('refForceChart1')">出场</span>
    </h2>
    <force-chart ref="refForceChart1" id="refForceChart1" customClass="c_force1"> </force-chart>
    
    <h2>
      自定义delay数组
      <span @click="playIn2('refForceChart2')">入场</span>
      <span @click="playOut('refForceChart2')">出场</span>
    </h2>
    <force-chart ref="refForceChart2" id="refForceChart2" customClass="c_force1"> </force-chart>

    <svg width="300" height="300" class="svg_gradient">
      <defs>
        <radialGradient id="radial1" fx="50%" fy="50%" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stop-color="#ef622e" stop-opacity="1" />
          <stop offset="100%" stop-color="#d24511" stop-opacity="1" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>
<script>
import forceChart from "@/components/forceChart/index.vue";
export default {
  data: function () {
    return {
      forceData: [
        { value: 18, title: "弘德臻远回报", subTitle: "005395" },
        { value: 22, title: "弘德臻远回报", subTitle: "005395" },
        { value: 14, title: "弘德臻远回报", subTitle: "005395" },
        { value: 22, title: "弘德臻远回报", subTitle: "005395" },
        { value: 16, title: "弘德臻远回报", subTitle: "005395" },
      ],
    };
  },
  components: { forceChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].ForceChart(this.forceData, {
        radius: (d) => d.value,
        width: 600,
        height: 600,
        duration: 600,
        delay: 249,
        ease: "easeBack",
        radiusRange: [60, 80],
        circleGap: 1,
      });
    },
    playIn2(refName) {
      this.$refs[refName].ForceChart(this.forceData, {
        radius: (d) => d.value,
        width: 600,
        height: 600,
        duration: 600,
        delay: [50,50,50,1400,50],
        ease: "easeBack",
        radiusRange: [60, 80],
        circleGap: 1,
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
.c_force1 {
  width: 600px;
  height: 600px;
  background: #f9dbcf;
  /deep/ .title {
    fill: #fff;
    font-size: 16px;
  }
  /deep/ .sub_title {
    fill: #fff;
    font-size: 14px;
  }
  /deep/ .circle {
    stroke: rgba(0, 0, 0, 0.1);
    stroke-width: 9px;
    // fill: #ef622e;
    fill: url(#radial1);
  }
}
</style>
