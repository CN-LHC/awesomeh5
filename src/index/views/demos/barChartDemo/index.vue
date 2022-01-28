<template>
  <div class="holder">
    <h1>v1.0 新增特性</h1>
    <p> numberSuffix支持指定某个字段作为后缀，实现每个柱子后缀不一样</p>

    <h1>x: (d) => d.letter, y: (d) => d.frequency,</h1>
    <p>指定读取数据的哪个字段为X轴数据，哪个为Y轴数据。必须填，没有默认值</p>

    <h1>width: 400, height: 400,</h1>
    <p>图表的宽高，默认640*400</p>

    <h1>marginLeft,marginRight,marginTop,marginBottom</h1>
    <p>图表核心区域距离图表的边界距离</p>

    <h1>xPadding</h1>
    <p>柱子间空隙占比，取值默认0.1，取值范围0.1-0.9。数值越大柱体看起来越细</p>

    <h1>duration</h1>
    <p>默认为400ms，动画持续时长，默认为400</p>

    <h1>delay</h1>
    <p>单个元素之间的间隔时长，默认为40ms</p>

    <h1>ease <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a></h1>
    <p>
      加速减速，可选项：easeQuad,easeCubic,easeExp,easeCircle,easeBack。
      除了easeBack外，其余的加速度强烈程度依次增加
    </p>

    <h1>customClass</h1>
    <p>通过customClass可以控制内部x轴，y轴，每个bar的颜色等样式</p>

    <h1>numberSuffix</h1>
    <p>数字后边可以跟文字，默认为空</p>

    <h1><span>新</span>isFromZero</h1>
    <p>最小值是否从0开始，但是如果数据集里存在负值，则忽略此选项</p>

    <h1><span>新</span>xTickNumber,yTickNumber</h1>
    <p>X轴,Y轴标注的个数。默认为5</p>

    <h1><span>新</span>isShowNumber</h1>
    <p>是否展示数字标识，默认为true展示</p>

    <h1><span>新</span>isNegativeSameDirection</h1>
    <p>
      默认为false，不同方向，如果为true，则负值的柱子和正值的柱子保持同一方向。<br />
      开启true时，isFromZero强制为true
    </p>

    <h2>
      带x轴y轴tick和domian，每个元素均可以通过css控制
      <span @click="playIn1('refBarChart0')">入场</span>
      <span @click="playOut('refBarChart0')">出场</span>
    </h2>
    <bar-chart ref="refBarChart0" id="refBarChart0" customClass="c_bar0"> </bar-chart>

    <h2>
      全是正值，并且从0开始
      <span @click="playIn1('refBarChart1')">入场</span>
      <span @click="playOut('refBarChart1')">出场</span>
    </h2>
    <bar-chart ref="refBarChart1" id="refBarChart1" customClass="c_bar1"> </bar-chart>

    <h2>
      全是正值，但从最小值开始
      <span @click="playIn2('refBarChart2')">入场</span>
      <span @click="playOut('refBarChart2')">出场</span>
    </h2>
    <bar-chart ref="refBarChart2" id="refBarChart2" customClass="c_bar2"> </bar-chart>

    <h2>
      不展示数字
      <span @click="playIn3('refBarChart3')">入场</span>
      <span @click="playOut('refBarChart3')">出场</span>
    </h2>
    <bar-chart ref="refBarChart3" id="refBarChart3" customClass="c_bar2"> </bar-chart>

    <h2>
      包含负值。bar渐变颜色也有区别
      <span @click="playIn4('refBarChart4')">入场</span>
      <span @click="playOut('refBarChart4')">出场</span>
    </h2>
    <bar-chart ref="refBarChart4" id="refBarChart4" customClass="c_bar3"> </bar-chart>

    <h2>
      自定义x轴和y轴tick数量,isNegativeSameDirection true则负值和正值柱子同一个方向
      <span @click="playIn5('refBarChart5')">入场</span>
      <span @click="playOut('refBarChart5')">出场</span>
    </h2>
    <bar-chart ref="refBarChart5" id="refBarChart5" customClass="c_bar3"> </bar-chart>

    <h2>
      全部为负值
      <span @click="playIn6('refBarChart6')">入场</span>
      <span @click="playOut('refBarChart6')">出场</span>
    </h2>
    <bar-chart ref="refBarChart6" id="refBarChart6" customClass="c_bar3"> </bar-chart>

    <svg width="300" height="300" class="svg_gradient">
      <defs>
        <linearGradient id="barPositive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#05a" />
          <stop offset="100%" stop-color="#0a5" />
        </linearGradient>
        <linearGradient id="barNegative" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F51313" />
          <stop offset="100%" stop-color="C60909" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
<script>
import barChart from "@/components/barChart/index_v1.0.vue";
export default {
  data: function () {
    return {
      hasNegative: [
        { letter: "一月", frequency: -10.16 },
        { letter: "二月", frequency: -9.85 },
        { letter: "三月", frequency: 20.78 },
        { letter: "四月", frequency: -40.25 },
        { letter: "五月", frequency: -20.7 },
        { letter: "六月", frequency: -17.28 },
        { letter: "七月", frequency: -13.01 },
        { letter: "八月", frequency: -20.09 },
        { letter: "九月", frequency: -30.96 },
        { letter: "十月", frequency: 90.96 },
      ],
      allNegative: [
        { letter: "一月", frequency: -10.16 },
        { letter: "二月", frequency: -9.85 },
        { letter: "三月", frequency: -20.78 },
        { letter: "四月", frequency: -40.25 },
        { letter: "五月", frequency: -20.7 },
        { letter: "六月", frequency: -17.28 },
        { letter: "七月", frequency: -13.01 },
        { letter: "八月", frequency: -20.09 },
        { letter: "九月", frequency: -30.96 },
        { letter: "十月", frequency: -40.96 },
      ],
      allPositive: [
        { letter: "一月", frequency: 80.16, suffix: "头" },
        { letter: "二月", frequency: 9.85, suffix: "只" },
        { letter: "三月", frequency: 20.78, suffix: "只" },
        { letter: "四月", frequency: 40.25, suffix: "只" },
        { letter: "五月", frequency: 20.7, suffix: "头" },
        { letter: "六月", frequency: 20.28, suffix: "万头" },
        { letter: "七月", frequency: 18.01, suffix: "头" },
        { letter: "八月", frequency: 57.09, suffix: "个" },
        { letter: "九月", frequency: 54.96, suffix: "头" },
        { letter: "十月", frequency: 64.96, suffix: "头" },
      ],
    };
  },
  components: { barChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].BarChart(this.allPositive, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        numberSuffix: (d) => d.suffix,
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 40,
        duration: 1000,
        delay: 40,
        ease: "easeBack",
        isFromZero: true,
        xTickNumber: 5,
        yTickNumber: 5,
      });
    },
    playIn2(refName) {
      this.$refs[refName].BarChart(this.allPositive, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        numberSuffix: "HZ",
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 30,
        duration: 700,
        delay: 70,
        xPadding: 0.5,
        ease: "easeCubic",
        isFromZero: false,
        xTickNumber: 5,
        yTickNumber: 5,
      });
    },
    playIn3(refName) {
      this.$refs[refName].BarChart(this.allPositive, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 50,
        duration: 1000,
        delay: 70,
        ease: "easeCircle",
        isShowNumber: false,
        xTickNumber: 5,
        yTickNumber: 5,
      });
    },
    playIn4(refName) {
      this.$refs[refName].BarChart(this.hasNegative, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 50,
        duration: 1000,
        delay: 70,
        ease: "easeCircle",
        isShowNumber: true,
        xTickNumber: 5,
        yTickNumber: 5,
      });
    },
    playIn5(refName) {
      this.$refs[refName].BarChart(this.hasNegative, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 50,
        duration: 1000,
        delay: 70,
        ease: "easeCircle",
        xTickNumber: 10,
        yTickNumber: 10,
        isNegativeSameDirection: true, //当数据中存在负值时，是否往同一方向画
      });
    },
    playIn6(refName) {
      this.$refs[refName].BarChart(this.allNegative, {
        x: (d) => d.letter,
        y: (d) => d.frequency,
        width: document.body.clientWidth * 0.3,
        height: document.body.clientWidth * 0.2,
        marginLeft: 50,
        duration: 1000,
        delay: 70,
        ease: "easeCircle",
        xTickNumber: 10,
        yTickNumber: 10,
        isNegativeSameDirection: true, //当数据中存在负值时，是否往同一方向画
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
    color: #fff;
    background: #f00;
    padding: 8px;
    border-radius: 5px;
    margin-right: 10px;
  }
}
p {
  margin-bottom: 20px;
  color: #555;
}

.c_bar0 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 20px;
  /deep/ .numbers {
    font-size: 12px;
    fill: #19a84e;
  }
  /deep/ .y_label {
    font-size: 14px;
    fill: #000;
  }
  /deep/ .axis_x {
    font-size: 15px;
    .tick_line,
    .domain {
      stroke: #f00;
    }
    .text {
      fill: #f00;
    }
  }
  /deep/ .axis_y {
    font-size: 15px;
    .tick_line,
    .domain {
      stroke: #19a84e;
    }
    .text {
      fill: #19a84e;
    }
  }
  /deep/ .bar_group rect:nth-child(3n) {
    fill: #ffffb3;
  }
  /deep/ .bar_group rect:nth-child(3n + 1) {
    fill: #8dd3c7;
  }
  /deep/ .bar_group rect:nth-child(3n + 2) {
    fill: #bebada;
  }
}

.c_bar1 {
  font-size: 14px;
  min-height: 200px;
  margin-bottom: 20px;
  /deep/ .numbers {
    font-size: 14px;
    fill: #876;
  }
  /deep/ .y_label {
    font-size: 14px;
    fill: #000;
  }
  /deep/ .axis_x {
    font-size: 15px;
    .tick_line,
    .domain {
      display: none;
    }
    .text {
      fill: #f00;
    }
  }
  /deep/ .axis_y {
    font-size: 15px;
    .tick_line,
    .domain {
      display: none;
    }
    .text {
      fill: #888;
    }
    .tick_long_line {
      display: none;
    }
  }
  // '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'
  /deep/ .bar_group rect:nth-child(3n) {
    fill: #ffffb3;
  }
  /deep/ .bar_group rect:nth-child(3n + 1) {
    fill: #8dd3c7;
  }
  /deep/ .bar_group rect:nth-child(3n + 2) {
    fill: #bebada;
  }
}

.svg_gradient {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: -1;
}

.c_bar2 {
  font-size: 18px;
  min-height: 200px;
  margin-bottom: 20px;
  /deep/ .numbers {
    font-size: 18px;
    fill: #447746;
  }
  /deep/ .y_label {
    font-size: 18px;
    fill: #953e23;
  }
  /deep/ .axis_x {
    font-size: 18px;
    .tick_line,
    .domain {
      display: none;
    }
    .text {
      fill: #fdb462;
    }
  }
  /deep/ .axis_y {
    font-size: 18px;
    .tick_line,
    .domain {
      display: none;
    }
    .text {
      fill: #b3de69;
    }
    .tick_long_line {
      stroke: rgba(0, 0, 0, 0.15);
    }
  }
  // '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'
  /deep/ .bar_group rect:nth-child(3n) {
    fill: #fdb462;
  }
  /deep/ .bar_group rect:nth-child(3n + 1) {
    fill: #b3de69;
  }
  /deep/ .bar_group rect:nth-child(3n + 2) {
    fill: #fccde5;
  }
}

.c_bar3 {
  font-size: 18px;
  min-height: 200px;
  margin-bottom: 20px;
  /deep/ .numbers {
    font-size: 18px;
    fill: #447746;
  }
  /deep/ .numbers_positive {
    fill: #05a;
  }
  /deep/ .numbers_negative {
    fill: #f51313;
  }
  /deep/ .y_label {
    font-size: 18px;
    fill: #953e23;
  }
  /deep/ .axis_x {
    font-size: 18px;
    .tick_line,
    .domain {
      display: none;
    }
    .text {
      fill: #fdb462;
    }
  }
  /deep/ .axis_y {
    font-size: 18px;
    .domain {
      display: none;
    }
    .tick_line {
      stroke: #b3de69;
    }
    .text {
      fill: #b3de69;
    }
    .tick_long_line {
      stroke: rgba(141, 211, 199, 0.15);
    }
  }
  /deep/ .bar_group .bar_positive {
    fill: url(#barPositive);
  }
  /deep/ .bar_group .bar_negative {
    fill: url(#barNegative);
  }
}
</style>
