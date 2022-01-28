<template>
  <div class="holder">
    <h1>label, valueLow: (d) => d.value1, valueHigh: (d) => d.value2,</h1>
    <p>x是指定label为数据源里的哪个字段；<br /></p>
    <h1>xTickNumber:6</h1>
    <p>x轴tick的数量</p>
    <h1>isShowText</h1>
    <p>isShowText:false 是否展示柱子上方的数值 默认不展示</p>
    <h1>colors</h1>
    <p>colors:[] 柱子的颜色</p>
    <h1>suffix, numberSuffix</h1>
    <p>
      suffix:''
      数值单位,若所有数值单位一致使用numberSuffix,若单位不一致则在data中添加suffix字段
    </p>

    <h2>
      展示柱子的数值
      <span @click="playIn1('refBarDoubleChart1')">入场</span>
      <span @click="playOut('refBarDoubleChart1')">出场</span>
    </h2>
    <bar-double-chart
      ref="refBarDoubleChart1"
      id="refBarDoubleChart1"
      customClass="c_bar1"
    />

    <h2>
      数值单位
      <span @click="playIn2('refBarDoubleChart2')">入场</span>
      <span @click="playOut('refBarDoubleChart2')">出场</span>
    </h2>
    <bar-double-chart
      ref="refBarDoubleChart2"
      id="refBarDoubleChart2"
      customClass="c_bar2"
    />

    <h2>
      柱子颜色
      <span @click="playIn3('refBarDoubleChart3')">入场</span>
      <span @click="playOut('refBarDoubleChart3')">出场</span>
    </h2>
    <bar-double-chart
      ref="refBarDoubleChart3"
      id="refBarDoubleChart3"
      customClass="c_bar3"
    />

    <h2>
      值全为负
      <span @click="playIn4('refBarDoubleChart4')">入场</span>
      <span @click="playOut('refBarDoubleChart4')">出场</span>
    </h2>
    <bar-double-chart
      ref="refBarDoubleChart4"
      id="refBarDoubleChart4"
      customClass="c_bar4"
    />
  </div>
</template>
<script>
import * as d3 from "d3";
import barDoubleChart from "@/components/barDoubleChart/index.vue";
export default {
  data: function () {
    return {
      data1: [
        { label: "节能风电", value1: -5, value2: 22 },
        { label: "立讯精密", value1: 10, value2: 26 },
        { label: "方大炭素", value1: 23, value2: 38 },
        { label: "格林美", value1: 17, value2: 26 },
        { label: "中国船舶", value1: 10, value2: 26 },
        { label: "格林美2", value1: 15, value2: 23 },
      ],
      data2: [
        { label: "节能风电", value1: 5, value2: 22, suffix: "%" },
        { label: "立讯精密", value1: 10, value2: 26, suffix: "万" },
        { label: "方大炭素", value1: 23, value2: 38, suffix: "吨" },
        { label: "格林美", value1: 17, value2: 26, suffix: "斤" },
        { label: "中国船舶", value1: 10, value2: 26 },
        { label: "格林美2", value1: 15, value2: 23 },
      ],
      data3: [
        { label: "节能风电", value1: -5, value2: -22, suffix: "%" },
        { label: "立讯精密", value1: -10, value2: -26, suffix: "万" },
        { label: "方大炭素", value1: -23, value2: -38, suffix: "吨" },
        { label: "格林美", value1: -17, value2: -26, suffix: "斤" },
        { label: "中国船舶", value1: -10, value2: -26 },
        { label: "格林美2", value1: -15, value2: -23 },
      ],
    };
  },
  components: { barDoubleChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].BarChart(this.data1, {
        x: (d) => d.label,
        width: 640,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 40,
        zPadding: 0.05,
        duration: 800,
        delay: 400,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 6,
        yTickNumber: 10,
        isShowText: true,
      });
    },
    playIn2(refName) {
      this.$refs[refName].BarChart(this.data2, {
        x: (d) => d.label,
        width: 640,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 40,
        zPadding: 0.05,
        duration: 800,
        delay: 400,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 6,
        yTickNumber: 10,
        isShowText: true,
        numberSuffix: "kg",
      });
    },
    playIn3(refName) {
      this.$refs[refName].BarChart(this.data1, {
        x: (d) => d.label,
        width: 640,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 40,
        zPadding: 0.05,
        duration: 800,
        delay: 400,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 6,
        yTickNumber: 10,
        colors: ["red", "green"],
      });
    },
    playIn4(refName) {
      this.$refs[refName].BarChart(this.data3, {
        x: (d) => d.label,
        width: 640,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 40,
        zPadding: 0.05,
        duration: 800,
        delay: 400,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 6,
        yTickNumber: 10,
        colors: ["red", "green"],
        isShowText: true,
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
  background: #ffd918;
  background: -webkit-linear-gradient(bottom right, #ffd918, #e8882d);
  background: -moz-linear-gradient(bottom right, #ffd918, #e8882d);
  background: linear-gradient(to top left, #ffd918, #e8882d);
  font-size: 14px;
  min-height: 200px;
  display: inline-block;
  margin-bottom: 30px;
  /deep/ .numbers {
    font-size: 16px;
    fill: #876;
  }
  /deep/ .axis_y {
    font-size: 16px;
    .text {
      fill: #fff;
    }
  }
  /deep/ .axis_x {
    font-size: 16px;
    .text {
      fill: #fff;
    }
    .tick_line,
    .domain {
      stroke: #fff;
    }
  }
  // /deep/ .bar {
  //   fill: #d11313;
  // }
  // /deep/ .numbers {
  //   fill: #fff;
  // }
  // /deep/ .numbers.reverse {
  //   fill: #000;
  // }
}
</style>
