<template>
  <div class="holder">
    <h1>v1.0 新增特性</h1>
    <p> numberSuffix支持指定某个字段作为后缀，实现每个柱子后缀不一样</p>

    <h1>x: (d) => d.letter, y: (d) => d.value,</h1>
    <p>指定读取数据的哪个字段为X轴数据，哪个为Y轴数据。必须填，没有默认值</p>

    <h1>width: 400, height: 400,</h1>
    <p>图表的宽高，默认640*400</p>

    <h1>marginLeft,marginRight,marginTop,marginBottom</h1>
    <p>图表核心区域距离图表的边界距离</p>

    <h1>yPadding</h1>
    <p>柱子间空隙占比，取值默认0.1，取值范围0.1-0.9。数值越大柱体看起来越细</p>

    <h1>duration</h1>
    <p>默认为400ms，动画持续时长，默认为400</p>

    <h1>delay</h1>
    <p>单个元素之间的间隔时长，默认为40ms</p>

    <h1>
      ease
      <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a>
    </h1>
    <p>
      加速减速，可选项：easeQuad,easeCubic,easeExp,easeCircle,easeBack。
      除了easeBack外，其余的加速度强烈程度依次增加
    </p>

    <h1>customClass</h1>
    <p>通过customClass可以控制内部x轴，y轴，每个bar的颜色等样式</p>

    <h1>numberSuffix</h1>
    <p>数字后边可以跟文字，默认为空</p>

    <h1>numberPosition</h1>
    <p>
      默认值为inside，当为inside时，如果柱子过短，会自动显示在外边；
      也可以全部显示在外边，取值outside。
    </p>

    <h1>labelPosition</h1>
    <p>默认值为left，还有一个值为top</p>

    <h2>
      全是正值，数字在里边
      <span @click="playIn1('refBarChart1')">入场</span>
      <span @click="playOut('refBarChart1')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart1" id="refBarChart1" customClass="c_bar1">
    </bar-chart-horizen>

    <h2>
      全是正值，数字在外边
      <span @click="playIn2('refBarChart2')">入场</span>
      <span @click="playOut('refBarChart2')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart2" id="refBarChart2" customClass="c_bar2">
    </bar-chart-horizen>

    <h2>
      全是正值，labe在上边
      <span @click="playIn3('refBarChart3')">入场</span>
      <span @click="playOut('refBarChart3')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart3" id="refBarChart3" customClass="c_bar2">
    </bar-chart-horizen>

    <h2>
      有负值，则label强制在左边
      <span @click="playIn3Extra('refBarChart3Extra')">入场</span>
      <span @click="playOut('refBarChart3Extra')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart3Extra" id="refBarChart3Extra" customClass="c_bar2">
    </bar-chart-horizen>

    <h2>
      有负值，但设置了isNegativeSameDirection为true，则柱子都沿同一方向发育
      <span @click="playIn4('refBarChart4')">入场</span>
      <span @click="playOut('refBarChart4')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart4" id="refBarChart4" customClass="c_bar2">
    </bar-chart-horizen>

    <h2>
      全为负值
      <span @click="playIn5('refBarChart5')">入场</span>
      <span @click="playOut('refBarChart5')">出场</span>
    </h2>
    <bar-chart-horizen ref="refBarChart5" id="refBarChart5" customClass="c_bar2">
    </bar-chart-horizen>
  </div>
</template>
<script>
import barChartHorizen from "@/components/barChartHorizen/index_v1.0.vue";
export default {
  data: function () {
    return {
      market1: [
        { label: "上涨家数", value: 1600, suffix: "家" },
        { label: "下跌家数", value: 2784, suffix: "只" },
        { label: "涨停", value: 80, suffix: "个" },
        { label: "跌停", value: 60, suffix: "幢" },
      ],
      market2: [
        { label: "节能风电", value: 11.71 },
        { label: "立讯精密", value: 9.56 },
        { label: "方大炭素", value: 5.26 },
        { label: "格林美", value: -7.26 },
      ],
      market3: [
        { label: "电器设备", value: 6 },
        { label: "采掘", value: -5.56 },
        { label: "化工", value: 4.26 },
        { label: "有色金属", value: 3.26 },
        { label: "共用事业", value: 3.19 },
        { label: "通信", value: 3.06 },
        { label: "休闲服务", value: 2.6 },
        { label: "医药生物", value: 2.26 },
        { label: "视频饮料", value: 1.26 },
        { label: "纺织服装", value: 10.16 },
      ],
      market4: [
        { label: "电器设备", value: -6 },
        { label: "采掘", value: -5.56 },
        { label: "化工", value: -4.26 },
        { label: "有色金属", value: -3.26 },
        { label: "共用事业", value: -3.19 },
        { label: "通信", value: -3.06 },
        { label: "休闲服务", value: -2.6 },
        { label: "医药生物", value: -2.26 },
        { label: "视频饮料", value: -1.26 },
        { label: "纺织服装", value: -10.16 },
      ],
    };
  },
  components: { barChartHorizen },
  methods: {
    playIn1(refName) {
      this.$refs[refName].BarChart(this.market1, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeBack",
        numberSuffix: "家",
        numberPosition: "inside",
      });
    },
    playIn2(refName) {
      this.$refs[refName].BarChart(this.market1, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeBack",
        numberSuffix: (d) => d.suffix,
        // numberSuffix: "亿",
        numberPosition: "outside",
      });
    },

    playIn3(refName) {
      this.$refs[refName].BarChart(this.market1, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "家",
        numberPosition: "outside",
        labelPosition: "top",
      });
    },
    playIn3Extra(refName) {
      this.$refs[refName].BarChart(this.market2, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "家",
        numberPosition: "outside",
        labelPosition: "top",
      });
    },
    playIn4(refName) {
      this.$refs[refName].BarChart(this.market3, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 600,
        marginLeft: 90,
        marginRight: 80,
        duration: 1400,
        delay: 40,
        yPadding: 0.3,
        ease: "easeQuad",
        numberSuffix: "%",
        numberPosition: "outside",
        labelPosition: "left",
        isNegativeSameDirection: true,
      });
    },
    playIn5(refName) {
      this.$refs[refName].BarChart(this.market4, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: 400,
        height: 600,
        marginLeft: 90,
        marginRight: 80,
        duration: 1000,
        delay: 50,
        yPadding: 0.6,
        ease: "easeQuad",
        numberSuffix: "%",
        numberPosition: "outside",
        labelPosition: "top",
        isNegativeSameDirection: true,
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
  // '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'
  /deep/ .bar_group rect:nth-child(2n + 1) {
    fill: #d11313;
  }
  /deep/ .bar_group rect:nth-child(2n) {
    fill: #17a109;
  }

  /deep/ .numbers {
    fill: #fff;
  }
  /deep/ .numbers.reverse {
    fill: #000;
  }
}

.c_bar2 {
  background: #708768;
  background: -webkit-linear-gradient(bottom right, #708768, #9ea68c);
  background: -moz-linear-gradient(bottom right, #708768, #9ea68c);
  background: linear-gradient(to top left, #708768, #9ea68c);
  font-size: 14px;
  display: inline-block;
  min-height: 200px;
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
  /deep/ .bar_negative {
    fill: #e62c0e;
  }
  /deep/ .bar_positive {
    fill: #47e60e;
  }

  /deep/ .numbers {
    fill: #fff;
  }
  /deep/ .numbers.reverse {
    fill: #000;
  }
  /deep/ .numbers_positive {
    fill: #47e60e;
  }
  /deep/ .numbers_negative {
    fill: #e62c0e;
  }
}
</style>
