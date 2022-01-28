<template>
  <div class="holder">
    <h1>name: (d) => d.name, value: (d) => d.value,</h1>
    <p>指定数据里的哪个字段是name，哪个字段是value，必填。</p>

    <h1>width: 340, height: 340,</h1>
    <p>图表的宽高，默认340*340</p>

    <h1>donutRatio</h1>
    <p>圈图内部小圆的半径，如果为0，则为饼图。默认为40</p>

    <h1>cornerRadius</h1>
    <p>饼图每个pie的圆角，默认为0</p>

    <h1>padAngle</h1>
    <p>pie之间的间隔角度，默认为1</p>

    <h1>colors: ["#ff7f50", "#4caf50", "#196666", "#503f70"],</h1>
    <p>
      colors可不填，为系统默认色系，如果填入自己的色系，则会覆盖默认值，给出的颜色数量如果少于数据数量会自动循环；如果多余数据数量则冗余的不展示
    </p>

    <h1>duration</h1>
    <p>默认为400ms，动画持续时长，默认为400</p>

    <h1>delay</h1>
    <p>单个元素之间的间隔时长，默认为40ms</p>

    <h1>ease <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a></h1>
    <p>
      加速减速<br />
      减速可选项：easeQuadOut,easeCubicOut,easeExpOut,easeCircleOut,easeBackOut。<br />
      先加速后减速可选项：easeQuadInOut,easeCubicInOut,easeExpInOut,easeCircleInOut,easeBackInOut。
    </p>

    <h1>customClass</h1>
    <p>通过customClass可以控制内部pie,文字的样式,line的样式</p>

    <h1>labelPosition</h1>
    <p>label的显示模式。默认inside，可选 outsideWithLine , outsideWithOutLine</p>

    <h1>valueType</h1>
    <p>
      值可选展示绝对值还是相对的百分比。默认relative。 可选 relative，absolute。
      当值为absolute时，valueSuffix生效
    </p>

    <h1>valueSuffix</h1>
    <p>数字后边可以跟后缀，比如"亿"，默认为空。 有依赖条件。只在valueType 为absolute时有效</p>

    <h1><span>新增</span> isRotateLabel: true</h1>
    <p>
      默认为true，文字会沿着圆弧旋转。如果为false则始终水平。
      需要注意的是，当labelPosition为outsideWithLine时忽略此参数，始终保持水平
    </p>

    <h1><span>新增</span> labelOffset: 30</h1>
    <p>当labelPosition为outsideWithOutLine时生效，调整文字与饼图的距离</p>

    <h2>
      donut图 labe文字在饼图内
      只适合数据量不超过5个，且数据的最大值/最小值倍数不超过3，否则label文字会看不见
      <span @click="playIn1('refDonutChart1')">入场</span>
      <span @click="playOut('refDonutChart1')">出场</span>
    </h2>
    <donut-chart ref="refDonutChart1" id="refDonutChart1" customClass="c_donut1"> </donut-chart>

    <h2>
      (自定义颜色) (padAngle 4) (cornerRadius 6) (valueSuffix %)(isRotateLabel false)
      <span @click="playIn2('refDonutChart2')">入场</span>
      <span @click="playOut('refDonutChart2')">出场</span>
    </h2>
    <donut-chart ref="refDonutChart2" id="refDonutChart2" customClass="c_donut2"> </donut-chart>

    <h2>
      (labelPosition outsideWithLine) (valueType: "relative",)
      <span @click="playIn3('refDonutChart3')">入场</span>
      <span @click="playOut('refDonutChart3')">出场</span>
    </h2>
    <donut-chart ref="refDonutChart3" id="refDonutChart3" customClass="c_donut3"> </donut-chart>

    <h2>
      (labelPosition outsideWithOutLine) (valueType: "absolute",)
      <span @click="playIn4('refDonutChart4')">入场</span>
      <span @click="playOut('refDonutChart4')">出场</span>
    </h2>
    <donut-chart ref="refDonutChart4" id="refDonutChart4" customClass="c_donut4"> </donut-chart>

    <h2>
      饼图
      <span @click="playIn5('refDonutChart5')">入场</span>
      <span @click="playOut('refDonutChart5')">出场</span>
    </h2>
    <donut-chart ref="refDonutChart5" id="refDonutChart5" customClass="c_donut4"> </donut-chart>

    <svg width="300" height="300" class="svg_gradient">
      <defs>
        <linearGradient id="linear1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#05a" />
          <stop offset="100%" stop-color="#0a5" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
<script>
import donutChart from "@/components/donutChart/index_v1.0.vue";
export default {
  data: function () {
    return {
      population: [
        { name: "通信设备", value: 1836 },
        { name: "互联网传媒", value: 646 },
        { name: "化学制药", value: 423 },
        { name: "光学电子", value: 336 },
      ],
      population2: [
        { name: "通信设备", value: 436 },
        { name: "互联网传媒", value: 446 },
        { name: "化学制药", value: 323 },
        { name: "光学电子", value: 336 },
        { name: "媒体", value: 256 },
        { name: "白酒", value: 236 },
      ],
      chartData: [
        { name: "非金融企业及机关团体贷款", value: 43832.61 },
        { name: "住户贷款", value: 20965.63 },
        { name: "非银行业金融机构贷款", value: 12.0 },
      ],
      chartData2: [
        { name: "财政性存款", value: 2164.32 },
        { name: "机关团体存款", value: 10063.07 },
        { name: "非金融企业存款", value: 18642.79 },
        { name: "住户存款", value: 38063.88 },
        { name: "非银行业金融机构存款", value: 2212.95 }
      ],
    };
  },
  components: { donutChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].DonutChart(this.population2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: 340,
        height: 340,
        donutRatio: 0.4, //donut的内圆半径占比
        padAngle: 2, //pad间隔角度
        cornerRadius: 1, //圆角
        duration: 500,
        delay: 50,
        ease: "easeBackOut",
        labelPosition: "inside",
        valueType: "absolute",
        valueSuffix: "亿",
      });
    },
    playIn2(refName) {
      this.$refs[refName].DonutChart(this.population, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: 340,
        height: 340,
        donutRatio: 0.4, //donut的内圆半径占比
        padAngle: 2, //pad间隔角度
        cornerRadius: 5, //圆角
        colors: ["#ff7f50", "#4caf50", "#196666", "#503f70"],
        duration: 600,
        delay: 50,
        ease: "easeBackOut",
        labelPosition: "inside",
        valueSuffix: "%",
        isRotateLabel: false,
      });
    },
    playIn3(refName) {
      this.$refs[refName].DonutChart(this.chartData2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: 540,
        height: 540,
        donutRatio: 0.2, //donut的内圆半径占比
        labelRatio: 0.65, //label的半径占比
        padAngle: 5, //pad间隔角度
        cornerRadius: 6, //圆角
        colors: ["#ff7f50", "#4caf50"],
        duration: 800,
        delay: 50,
        ease: "easeBackInOut",
        labelPosition: "outsideWithLine",
        valueSuffix: "%",
      });
    },
    playIn4(refName) {
      this.$refs[refName].DonutChart(this.chartData, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: 540,
        height: 540,
        donutRatio: 0.4, //donut的内圆半径占比
        labelRatio: 0.75, //label的半径占比
        padAngle: 0, //pad间隔角度
        cornerRadius: 4, //圆角
        colors: ["#00a59d", "#11b3a0", "#2ec0a1", "#47cea0", "#60db9e", "#7ae79a"],
        duration: 800,
        delay: 50,
        ease: "easeBackInOut",
        labelPosition: "outsideWithOutLine",
        valueType: "absolute",
        valueSuffix: "亿",
      });
    },
    playIn5(refName) {
      this.$refs[refName].DonutChart(this.population2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: 540,
        height: 540,
        donutRatio: 0, //donut的内圆半径占比
        labelRatio: 0.65, //label的半径占比
        padAngle: 0, //pad间隔角度
        cornerRadius: 0, //圆角
        // colors: ["#00a59d", "#11b3a0", "#2ec0a1", "#47cea0", "#60db9e", "#7ae79a"],
        duration: 800,
        delay: 50,
        ease: "easeBackInOut",
        labelPosition: "outsideWithLine",
        valueType: "absolute",
        valueSuffix: "亿",
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
  span {
    color: #f00;
  }
}
p {
  margin-bottom: 20px;
  color: #555;
}

.c_donut1 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 30px;
  display: inline-block;
  background: #d3e8ce;
  /deep/ .donut_txt1 {
    fill: #fff;
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    fill: #fff;
    font-size: 14px;
  }
}
.c_donut2 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 30px;
  display: inline-block;
  margin-bottom: 30px;
  background: #efc191;
  /deep/ .donut_txt1 {
    fill: #fff;
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    fill: #fff;
    font-size: 14px;
  }
}
.c_donut3 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 30px;
  display: inline-block;
  margin-bottom: 30px;
  background: #ffeeec;
  /deep/ .donut_txt1 {
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    font-size: 14px;
  }
  /deep/ .poly_lines {
    stroke-dasharray: 11px 2px;
    stroke-width: 2px;
  }
}
.c_donut4 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 30px;
  display: inline-block;
  margin-bottom: 30px;
  background: #254281;
  background: -webkit-linear-gradient(bottom right, #254281, #1347ba);
  background: -moz-linear-gradient(bottom right, #254281, #1347ba);
  background: linear-gradient(to top left, #254281, #1347ba);
  /deep/ .donut_txt1 {
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    font-size: 14px;
  }
  /deep/ .poly_lines {
    stroke-dasharray: 11px 2px;
    stroke-width: 2px;
  }
}

.svg_gradient {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: -1;
}
</style>
