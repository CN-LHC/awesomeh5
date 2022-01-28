<template>
  <div class="holder">
    <h1>width: 400, height: 400,</h1>
    <p>图表的宽高，默认640*400</p>

    <h1>marginLeft,marginRight,marginTop,marginBottom</h1>
    <p>图表核心区域距离图表的边界距离</p>

    <h1>yPadding</h1>
    <p>柱子间空隙占比，取值默认0.1，取值范围0.1-0.9。数值越大柱体看起来越细</p>

    <h1>customClass</h1>
    <p>通过customClass可以控制内部x轴，y轴，每个bar的颜色等样式</p>

    <h1>count</h1>
    <p>柱子的个数</p>

    <h1>inDuration</h1>
    <p>第一帧入场单个柱子的动画</p>

    <h1>delay</h1>
    <p>柱子入场之间开始动画的间隔</p>

    <h1>ease <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a></h1>
    <p>
      out系列：easeExpOut,easeCubicOut,easeCircleOut,easeBackOut
      inOut系列：easeExpInOut,easeCubicInOut,easeCircleInOut,easeBackInOut
       除了easeBack外，其余的加速度强烈程度依次增加
    </p>

    <h1>playDuration</h1>
    <p>播放每一帧需要多久</p>

    <h2>
      跑马图1
      <span @click="playIn1('refBarRaceChart1')">入场</span>
      <span @click="playOut('refBarRaceChart1')">出场</span>
    </h2>
    <bar-history-chart ref="refBarRaceChart1" id="refBarRaceChart1" customClass="c_bar1"> </bar-history-chart>


    <h2>
      跑马图2 （不要轴辅助线）
      <span @click="playIn2('refBarRaceChart2')">入场</span>
      <span @click="playOut('refBarRaceChart2')">出场</span>
    </h2>
    <bar-history-chart ref="refBarRaceChart2" id="refBarRaceChart2" customClass="c_bar2"> </bar-history-chart>



    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>
<script>
import BarHistoryChart from "@/components/barHistoryChart/index.vue";
import { raceData } from "@/index/views/demos/barHistoryChartDemo/raceData.js";
console.log("raceData", raceData);
export default {
  data: function () {
    return {};
  },
  components: { BarHistoryChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].BarHistoryChart(raceData.covid19, {
        width: 600,
        height: 600,
        margin: { top: 35, left: 70, bottom: 5, right: 80 },
        inDuration: 300,
        delay:40,
        playDuration: 800,
        ease:'easeCircleOut',
        yPadding: 0.2,
        count: 20,
      });
    },
    playIn2(refName) {
      this.$refs[refName].BarHistoryChart(raceData.covid19, {
        width: 600,
        height: 600,
        margin: { top: 35, left: 70, bottom: 5, right: 80 },
        inDuration: 300,
        delay:30,
        playDuration: 500,
        yPadding: 0.1,
        count: 14,
        ease:'easeBackOut'
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

.c_bar1 {
  font-size: 14px;
  display: inline-block;
  min-height: 400px;
  background: #fff;
  margin-bottom: 30px;
  /deep/ .x_axis {
    font-size: 14px;
    fill: #333;
  }
  /deep/ .tick {
    font-size: 14px;
    fill: #ccc;
  }
  /deep/ .domain {
    stroke: rgba(0, 0, 0, 0.1);
  }
  /deep/ .grid-line {
    stroke: rgba(0, 0, 0, 0.1);
  }
  /deep/ .tick:first-of-type .grid-line {
    opacity: 0;
  }
  /deep/ .date-title {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    fill: #d4d4d4;
  }
  /deep/ .bar rect {
    opacity: 0.8;
  }
}

.c_bar2 {
  font-size: 16px;
  display: inline-block;
  min-height: 400px;
  background: #f0f0f0;
  margin-bottom: 30px;
  /deep/ .x_axis {
    font-size: 14px;
    fill: #333;
    display: none;
  }
  /deep/ .tick {
    font-size: 14px;
    fill: #ccc;
  }
  /deep/ .domain {
    stroke: rgba(0, 0, 0, 0.1);
  }
  /deep/ .grid-line {
    stroke: rgba(0, 0, 0, 0.1);
  }
  /deep/ .tick:first-of-type .grid-line {
    opacity: 0;
  }
  /deep/ .date-title {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    fill: #d4d4d4;
  }
  /deep/ .bar rect {
    opacity: 1;
  }
}
</style>
