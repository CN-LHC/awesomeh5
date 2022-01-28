<template>
  <div class="holder">
    <h1>label, valueLow: (d) => d.value1, valueHigh: (d) => d.value2,</h1>
    <p>
      label是指定label为数据源里的哪个字段；<br />
      valueLow指定数据源里小的那个数值 <br />
      valueHigh指定数据源里大的那个数值 <br />
    </p>
    <h1>xTickNumber:4</h1>
    <p>x轴tick的数量</p>

    <h2>
      柱状range图1
      <span @click="playIn1('refBarRangeChart1')">入场</span>
      <span @click="playOut('refBarRangeChart1')">出场</span>
    </h2>
    <bar-range-chart ref="refBarRangeChart1" id="refBarRangeChart1" customClass="c_bar1" />
  </div>
</template>
<script>
import barRangeChart from "@/components/barRangeChart/index.vue";
export default {
  data: function () {
    return {
      data1: [
        { label: "节能风电", value1: 20, value2: 30 },
        { label: "立讯精密", value1: 10, value2: 26 },
        { label: "方大炭素", value1: 23, value2: 38 },
        { label: "格林美", value1: 17, value2: 26 },
        { label: "中国船舶", value1: 10, value2: 26 },
        { label: "格林美2", value1: 15, value2: 23 },
      ],
    };
  },
  components: { barRangeChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].BarRangeChart(this.data1, {
        label: (d) => d.label,
        valueLow: (d) => d.value1,
        valueHigh: (d) => d.value2,
        width: 400,
        height: 500,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 40,
        duration: 400,
        delay: 400,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 4,
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
  /deep/ .bar {
    fill: #d11313;
  }
  /deep/ .numbers {
    fill: #fff;
  }
  /deep/ .numbers.reverse {
    fill: #000;
  }
}
</style>
