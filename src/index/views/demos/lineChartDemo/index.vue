<template>
  <div class="holder">
    <h2>label: (d) => d.label</h2>
    <p>指定labe字段</p>

    <h2>线的值固定规律 value1,value2,value3...  如果字段不同请自行处理，参考例子1</h2>

    <h2>
      width: 600, height: 300, marginTop: 20, marginBottom: 40, marginLeft: 50, marginRight: 50,
    </h2>
    <p>指定宽高和四周margin</p>
    <h2>duration: 2000, delay: 40, ease: "easeCubicInOut",</h2>
    <p>指定动画时长，delay，ease特性</p>
    <h2>curveName: "curveLinear",</h2>
    <p>画线方式，有两种，一种为curveLinear不带弧度，一种为curveMonotoneX带弧度</p>
    <h2>isFromZero: true,</h2>
    <p>最小值是否从0开始。默认为true</p>
    <h2>xTickNumber: 3, yTickNumber: 6,</h2>
    <p>指定x轴和y轴的tick数量</p>
    <h2>isShowMinMax</h2>
    <p>是否展示最大值最小值，默认为false</p>
    <h2>isShowTxtTips</h2>
    <p>是否展示线图动画的数据提示，默认为true显示</p>
    <h2>lineColors</h2>
    <p>线的颜色，默认字的颜色与线一致</p>

    <h1>
      线图
      <span @click="playIn1('refLineChart1')">入场</span>
      <span @click="playOut('refLineChart1')">出场</span>
    </h1>
    <line-chart ref="refLineChart1" id="refLineChart1" customClass="c_line1" />

    <h1>
      不要tickline小线段，显示背景长线段，isShowMinMax true
      显示最小最大值(注意只会针对指定的line1生效)
      <span @click="playIn2('refLineChart2')">入场</span>
      <span @click="playOut('refLineChart2')">出场</span>
    </h1>
    <line-chart ref="refLineChart2" id="refLineChart2" customClass="c_line2" />

    <h1>
      不要tickline小线段，不要轴线的横竖线，显示背景长线段
      <span @click="playIn3('refLineChart3')">入场</span>
      <span @click="playOut('refLineChart3')">出场</span>
    </h1>
    <line-chart ref="refLineChart3" id="refLineChart3" customClass="c_line3" />

    <h1>
      曲线带弧度，curveName为curveMonotoneX
      <span @click="playIn4('refLineChart4')">入场</span>
      <span @click="playOut('refLineChart4')">出场</span>
    </h1>
    <line-chart ref="refLineChart4" id="refLineChart4" customClass="c_line1" />

    <h1>
      isFromZero 为flase，从数据的最小值开始，默认为true从0开始
      <span @click="playIn6('refLineChart6')">入场</span>
      <span @click="playOut('refLineChart6')">出场</span>
    </h1>
    <line-chart ref="refLineChart6" id="refLineChart6" customClass="c_line1" />

    <h1>
      xTickNumber，yTickNumber自定义轴线的tick个数
      <span @click="playIn7('refLineChart7')">入场</span>
      <span @click="playOut('refLineChart7')">出场</span>
    </h1>
    <line-chart ref="refLineChart7" id="refLineChart7" customClass="c_line1" />

    <h1>
      只指定一条线
      <span @click="playIn8('refLineChart8')">入场</span>
      <span @click="playOut('refLineChart8')">出场</span>
    </h1>
    <line-chart ref="refLineChart8" id="refLineChart8" customClass="c_line1" />

    <h1>
      换一种ease入场感觉
      <span @click="playIn9('refLineChart9')">入场</span>
      <span @click="playOut('refLineChart9')">出场</span>
    </h1>
    <line-chart ref="refLineChart9" id="refLineChart9" customClass="c_line1" />

    <h1>
      显示最大最小值
      <span @click="playIn10('refLineChart10')">入场</span>
      <span @click="playOut('refLineChart10')">出场</span>
    </h1>
    <line-chart ref="refLineChart10" id="refLineChart10" customClass="c_line1" />

    <h1>
      显示数据提示，默认为true显示
      <span @click="playIn11('refLineChart11')">入场</span>
      <span @click="playOut('refLineChart11')">出场</span>
    </h1>
    <line-chart ref="refLineChart11" id="refLineChart11" customClass="c_line11" />

    <h1>
      使用lineColors，lineWidth改变线的颜色和宽度
      <span @click="playIn12('refLineChart12')">入场</span>
      <span @click="playOut('refLineChart12')">出场</span>
    </h1>
    <line-chart ref="refLineChart12" id="refLineChart12" customClass="c_line12" />
  </div>
</template>
<script>
import lineChart from "@/components/lineChart/index.vue";
export default {
  data: function () {
    return {
      // lineData: [
      //   { label: "2021.12.01", value1: 8.17, value2: 2.17 },
      //   { label: "2021.12.02", value1: 6.17, value2: 3.17 },
      //   { label: "2021.12.03", value1: 13.17, value2: 4.17 },
      //   { label: "2021.12.04", value1: 12.17, value2: 6.17 },
      //   { label: "2021.12.05", value1: 5.17, value2: 5.17 },
      //   { label: "2021.12.06", value1: 6.47, value2: 4.17 },
      //   { label: "2021.12.07", value1: 9.17, value2: 2.17 },
      //   { label: "2021.12.08", value1: 7.17, value2: 3.17 },
      //   { label: "2021.12.09", value1: 8.17, value2: 5.17 },
      //   { label: "2021.12.10", value1: 34.7, value2: 6.17 },
      //   { label: "2021.12.11", value1: 8.7, value2: 4.17 },
      //   { label: "2021.12.12", value1: 6.7, value2: 8.17 },
      //   { label: "2021.12.13", value1: 14.7, value2: 5.17 },
      //   { label: "2021.12.14", value1: 9.7, value2: 6.17 },
      //   { label: "2021.12.15", value1: 10.9, value2: 10.2 },
      // ],
      lineData: [
        { label: "2021.12.01", value1: 8.17, value2: 2.17, value3: 6.24 },
        { label: "2021.12.02", value1: 6.17, value2: 3.17, value3: -8.24 },
        { label: "2021.12.03", value1: 13.17, value2: 4.17, value3: 5.24 },
        { label: "2021.12.04", value1: 12.17, value2: 6.17, value3: 6.24 },
        { label: "2021.12.05", value1: 5.17, value2: 5.17, value3: 19.24 },
        { label: "2021.12.06", value1: 6.47, value2: 4.17, value3: 3.24 },
        { label: "2021.12.07", value1: 9.17, value2: 2.17, value3: 18.24 },
        { label: "2021.12.08", value1: 7.17, value2: 3.17, value3: 7.24 },
        { label: "2021.12.09", value1: 8.17, value2: 5.17, value3: 24.24 },
        { label: "2021.12.10", value1: 34.7, value2: 6.17, value3: 5.24 },
        { label: "2021.12.11", value1: 8.7, value2: 4.17, value3: 9.24 },
        { label: "2021.12.12", value1: 6.7, value2: 8.17, value3: 11.24 },
        { label: "2021.12.13", value1: 14.7, value2: 5.17, value3: 4.24 },
        { label: "2021.12.14", value1: 9.7, value2: 6.17, value3: 1.24 },
        { label: "2021.12.15", value1: 10.9, value2: 7.2, value3: 22.24 },
      ],
      lineData1: [
        {
          tradingday: "2015-12-31",
          rrsincestart: -0.1,
          hs300rr: -0.91,
        },
        {
          tradingday: "2016-01-29",
          rrsincestart: -2.3,
          hs300rr: -21.75,
        },
        {
          tradingday: "2016-02-29",
          rrsincestart: -3.8,
          hs300rr: -23.58,
        },
        {
          tradingday: "2016-03-31",
          rrsincestart: 2.1,
          hs300rr: -14.53,
        },
        {
          tradingday: "2016-04-29",
          rrsincestart: 3.2,
          hs300rr: -16.16,
        },
        {
          tradingday: "2016-05-31",
          rrsincestart: 4.4,
          hs300rr: -15.82,
        },
        {
          tradingday: "2016-06-30",
          rrsincestart: 11.2,
          hs300rr: -16.23,
        },
        {
          tradingday: "2016-07-29",
          rrsincestart: 13.9,
          hs300rr: -14.91,
        },
        {
          tradingday: "2016-08-31",
          rrsincestart: 16.5,
          hs300rr: -11.62,
        },
        {
          tradingday: "2016-09-30",
          rrsincestart: 19.1,
          hs300rr: -13.6,
        },
        {
          tradingday: "2016-10-31",
          rrsincestart: 20.5,
          hs300rr: -11.39,
        },
        {
          tradingday: "2016-11-30",
          rrsincestart: 21.5,
          hs300rr: -6.03,
        },
        {
          tradingday: "2016-12-30",
          rrsincestart: 15.6,
          hs300rr: -12.09,
        },
        {
          tradingday: "2017-01-26",
          rrsincestart: 14.8,
          hs300rr: -10.02,
        },
      ],
    };
  },
  components: { lineChart },
  methods: {
    playIn1(refName) {
      const data=this.lineData1.map(item=>{
        return {
          label:item.tradingday,
          value1:item.rrsincestart,
          value2:item.hs300rr,
        }
      })
      this.$refs[refName].LineChart(data, {
        label: (d) => d.label,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        xTickNumber: 3,
        yTickNumber: 6,
      });
    },
    playIn2(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2400,
        delay: 80,
        ease: "easeCubicOut",
        curveName: "curveLinear",
        xTickNumber: 3,
        yTickNumber: 6,
        isShowMinMax: true,
      });
    },
    playIn3(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        xTickNumber: 3,
        yTickNumber: 6,
      });
    },
    playIn4(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveMonotoneX",
        xTickNumber: 3,
        yTickNumber: 6,
      });
    },
    playIn6(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        isFromZero: false,
        xTickNumber: 3,
        yTickNumber: 6,
      });
    },
    playIn7(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        xTickNumber: 5,
        yTickNumber: 3,
      });
    },
    playIn8(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        // line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        xTickNumber: 3,
        yTickNumber: 6,
      });
    },
    playIn9(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 3000,
        delay: 40,
        ease: "easeCubicOut",
        curveName: "curveMonotoneX",
        xTickNumber: 4,
        yTickNumber: 4,
      });
    },
    playIn10(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 3000,
        delay: 40,
        ease: "easeCubicOut",
        curveName: "curveMonotoneX",
        xTickNumber: 4,
        yTickNumber: 4,
        isShowMinMax: true,
      });
    },
    playIn11(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 3000,
        delay: 40,
        ease: "easeCubicOut",
        curveName: "curveMonotoneX",
        xTickNumber: 4,
        yTickNumber: 4,
        isShowMinMax: true,
        isShowTxtTips: true,
      });
    },
    playIn12(refName) {
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        line1: (d) => d.value1,
        line2: (d) => d.value2,
        width: 600,
        height: 300,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        duration: 3000,
        delay: 40,
        ease: "easeCubicOut",
        curveName: "curveMonotoneX",
        xTickNumber: 4,
        yTickNumber: 4,
        isShowMinMax: true,
        isShowTxtTips: true, //可以不写
        lineColors: ["red", "green", "blue"], //不写默认为黑色
        lineWidth: [3, 3, 3], //不写默认线宽是1
        xTickNumber: 8,
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
h1 {
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
h2 {
  font-size: 15px;
  color: #000;
  margin-bottom: 10px;
  font-weight: bold;
}
p {
  margin-bottom: 20px;
}

.c_line1,
.c_line11 {
  margin-bottom: 20px;
  min-height: 200px;
  background: #e5884f;
  background: -webkit-linear-gradient(top right, #e5884f, #e16906);
  background: -moz-linear-gradient(top right, #e5884f, #e16906);
  background: linear-gradient(to bottom left, #e5884f, #e16906);
  display: inline-block;
  /deep/ .label_min {
    font-size: 14px;
    fill: #fff;
  }
  /deep/ .label_min_bg {
    fill: #e24c4c;
  }
  /deep/ .circle_min {
    fill: rgba(226, 76, 76, 0.692);
  }
  /deep/ .label_max {
    font-size: 14px;
    fill: #fff;
  }
  /deep/ .label_max_bg {
    fill: #0b777a;
  }
  /deep/ .circle_max {
    fill: rgba(11, 118, 122, 0.712);
  }

  /deep/ .line1 {
    stroke: #fefefe;
    stroke-width: 3px;
  }
  /deep/ .line2 {
    stroke: #81195c;
    stroke-width: 3px;
  }
  /deep/ .axis_x,
  /deep/ .axis_y {
    .text {
      fill: #fff;
      font-size: 14px;
    }
    .domain,
    .tick_line {
      stroke: #fff;
    }
    .tick_long_line {
      display: none;
    }
  }
}

.c_line2 {
  margin-bottom: 20px;
  min-height: 200px;
  background: #bfe54f;
  background: -webkit-linear-gradient(top right, #bfe54f, #a3a829);
  background: -moz-linear-gradient(top right, #bfe54f, #a3a829);
  background: linear-gradient(to bottom left, #bfe54f, #a3a829);
  display: inline-block;
  /deep/ .label_min {
    font-size: 14px;
    fill: #fff;
  }
  /deep/ .label_min_bg {
    fill: #e24c4c;
  }
  /deep/ .circle_min {
    fill: rgba(226, 76, 76, 0.692);
  }
  /deep/ .label_max {
    font-size: 14px;
    fill: #fff;
  }
  /deep/ .label_max_bg {
    fill: #0b777a;
  }
  /deep/ .circle_max {
    fill: rgba(11, 118, 122, 0.712);
  }
  /deep/ .line1 {
    stroke: #fefefe;
    stroke-width: 3px;
  }
  /deep/ .line2 {
    stroke: #81195c;
    stroke-width: 3px;
  }
  /deep/ .axis_x,
  /deep/ .axis_y {
    .text {
      fill: #fff;
      font-size: 14px;
    }
    .domain,
    .tick_line {
      stroke: #fff;
    }
    .tick_line {
      display: none;
    }
    .tick_long_line {
      stroke: rgba(255, 255, 255, 0.15);
    }
  }
}

.c_line3 {
  margin-bottom: 20px;
  min-height: 200px;
  background: #4fd8e5;
  background: -webkit-linear-gradient(top right, #4fd8e5, #297aa8);
  background: -moz-linear-gradient(top right, #4fd8e5, #297aa8);
  background: linear-gradient(to bottom left, #4fd8e5, #297aa8);
  display: inline-block;
  /deep/ .line1 {
    stroke: #fefefe;
    stroke-width: 3px;
  }
  /deep/ .line2 {
    stroke: #81195c;
    stroke-width: 3px;
  }
  /deep/ .axis_x,
  /deep/ .axis_y {
    .text {
      fill: #fff;
      font-size: 14px;
    }
    .domain,
    .tick_line {
      display: none;
    }
  }
}

.c_line11 {
  /deep/ .circle1 {
    fill: #fefefe;
  }
  /deep/ .valueTip1 {
    fill: #fefefe;
  }
  /deep/ .circle2 {
    fill: #81195c;
  }
  /deep/ .valueTip2 {
    fill: #81195c;
  }
  /deep/ .circle3 {
    fill: red;
  }
  /deep/ .valueTip3 {
    fill: red;
  }
  /deep/ .line3 {
    stroke: red;
    stroke-width: 3px;
  }
}
</style>
