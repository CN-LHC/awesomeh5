<template>
  <div :id="id" :class="customClass"></div>
</template>

<script>
import * as d3 from "d3";
import $ from "jquery";
export default {
  props: ["id", "customClass"],
  data() {
    return {
      svg: null,
      xScale: null,
      xDomain: [],
      ease: "easeBack",
      isHaveNegative: false,
    };
  },
  methods: {
    async playOut() {
      this.svg
        .selectAll(`.bar`)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("x", (i) => {
          if (this.isHaveNegative) {
            return this.xScale(0);
          } else {
            return this.xScale(this.xDomain[0]);
          }
        })
        .attr("width", 0);

      this.svg
        .selectAll(`.numbers`)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("x", (i) => this.xScale(this.xDomain[0]))
        .style("opacity", "0");

      this.svg
        .selectAll(`.axis_y`)
        .transition()
        .duration(400)
        .style("opacity", "0");
    },
    async init() {
      await this.getSettings();
    },
    getSettings() {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          resolve();
        });
      });
    },
    //核心库
    BarChart(
      data,
      {
        x = (d) => d, //横向的是数值
        y = (d, i) => i, //纵向的是label
        marginTop = 10, // the top margin, in pixels
        marginRight = 30, // the right margin, in pixels
        marginBottom = 0, // the bottom margin, in pixels
        marginLeft = 90, // the left margin, in pixels
        width = 640, // the outer width of the chart, in pixels
        height = 400, // the outer height of the chart, in pixels
        xDomain, // an array of (ordinal) x-values
        xRange = [marginLeft, width - marginRight], // [left, right]
        yDomain, // [ymin, ymax]
        yRange = [marginTop, height - marginBottom], // [top, bottom]
        yPadding = 0.3, // 柱子的比例
        duration = 400, //动画持续时长
        delay = 40, //元素之间间隔时长
        ease = "easeBack", //元素之间间隔时长
        numberSuffix = "", //数字的后缀
        numberPosition = "inside", //数字显示在柱子里边还是外边
        labelPosition = "left", //label的位置在左边还是上边
        isFromZero = true, //是否从0开始
        isNegativeSameDirection = false, //默认负值柱子和正值柱子不同方向
        barRadius = 0, //柱子的圆角
      } = {}
    ) {
      const X = d3.map(data, x);
      const Y = d3.map(data, y);

      let suffixArr = [];
      if (typeof numberSuffix == "function") {
        suffixArr = d3.map(data, numberSuffix);
      }

      //预处理有负值的柱状图
      let isHaveNegative = false;
      X.map((item) => {
        if (item < 0) {
          isHaveNegative = true;
        }
      });
      //如果xMax最小值为负值，说明全为负值，则xMas取绝对值，
      //并且强制isNegativeSameDirection为ture
      let xMax = d3.max(X);
      if (xMax < 0) {
        xMax = Math.abs(d3.min(X));
        isNegativeSameDirection = true;
      }
      //isNegativeSameDirection为true会强制最小值从0开始
      if (isNegativeSameDirection) {
        isHaveNegative = false;
        isFromZero = true;
      }
      if (isHaveNegative) {
        isFromZero = false;
        labelPosition = "left";
        numberPosition = "outside";
      }
      this.isHaveNegative = isHaveNegative;

      //y轴最小值，假设全为正，则非0的最小值需要乘以一个缩小系数
      let xMin = isFromZero ? 0 : d3.min(X) * 0.9;
      //如果发现为负，则最小值需要乘以一个扩大系数
      if (isHaveNegative) {
        xMin = d3.min(X) * 1.1;
      }

      if (labelPosition == "top") {
        xRange = [5, width - marginRight];
      }

      //domain是数值范围
      //range是画图范围
      if (xDomain === undefined) xDomain = [xMin, xMax];
      if (yDomain === undefined) yDomain = Y;
      yDomain = new d3.InternSet(yDomain);
      const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]));

      const xScale = d3.scaleLinear(xDomain, xRange);
      const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
      const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

      this.xDomain = xDomain;
      this.xScale = xScale;
      this.ease = ease;

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      this.svg = svg;

      //柱子
      const bar = svg
        .append("g")
        .attr("class", "bar_group")
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("x", (i) => (isHaveNegative ? xScale(0) : xScale(xDomain[0])))
        .attr("y", (i) => yScale(Y[i]))
        .attr("rx", barRadius)
        .attr("ry", barRadius)
        .attr("class", (d, i) =>
          X[i] >= 0 ? "bar bar_positive" : "bar bar_negative"
        )
        .attr("width", 0)
        .attr("height", yScale.bandwidth());
      //柱子动画
      bar
        .transition()
        .delay(function (d, i) {
          return i * delay;
        })
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("x", (d, i) => {
          if (isHaveNegative && X[i] < 0) {
            return xScale(X[i]);
          } else {
            return xScale(0);
          }
        })
        .attr("width", (i) => {
          if (isHaveNegative) {
            return Math.abs(xScale(X[i]) - xScale(0)); //全部数据含负值时的正值情况
          } else {
            return xScale(Math.abs(X[i])) - xScale(xDomain[0]); //全部数据为正直时
          }
        });

      //柱状图上边的数字
      const numbers = svg
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(I)
        .join("text")
        .attr("opacity", "0")
        .attr("class", "numbers")
        .text(
          (i) =>
            X[i] +
            (typeof numberSuffix == "function" ? suffixArr[i] : numberSuffix)
        );

      if (numberPosition == "inside") {
        numbers.call((text) =>
          text
            .attr("text-anchor", "end")
            .attr("x", (i) => xScale(xDomain[0]))
            .attr("y", (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -9)
            .filter((i) => xScale(X[i]) - xScale(xDomain[0]) < 40) // short bars
            .attr("dx", +4)
            .attr("class", "numbers reverse")
            .attr("text-anchor", "start")
        );
      } else {
        numbers.call((text) =>
          text
            .attr("text-anchor", "start")
            .attr("class", (d, i) =>
              X[i] >= 0
                ? "numbers numbers_positive"
                : "numbers numbers_negative"
            )
            .attr("x", (i) => (isHaveNegative ? xScale(0) : xScale(xDomain[0])))
            .attr("y", (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", 9)
        );
      }

      numbers
        .transition()
        .delay(function (d, i) {
          return i * delay;
        })
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("x", (i) =>
          isHaveNegative && X[i] < 0 ? xScale(0) : xScale(Math.abs(X[i]))
        )
        .attr("opacity", "1");

      //y轴坐标轴
      const axisY = svg
        .append("g")
        .attr("class", "axis_y")
        .attr("text-anchor", "end")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line").remove();
          g.selectAll(".tick text").attr("class", "text").attr("opacity", 0);
        });
      axisY
        .selectAll(".text")
        .transition()
        .delay(function (d, i) {
          return i * delay;
        })
        .ease(d3[ease + "Out"])
        .duration(duration)
        .attr("opacity", 1);

      /*
      !!important!!
     怎样才能保证文字居于bar的上方而不是间隙中间呢？
     答案是先往上偏移bandwidth的一半，让文字中线和bar的上边线对齐，接着用dy平移自身高度的0.7倍。完美！
      */
      if (labelPosition == "top") {
        const offsetY = yScale.bandwidth() / 2;
        axisY
          .attr("text-anchor", "start")
          .attr("transform", `translate(15,-${offsetY})`);
        axisY.selectAll(".text").attr("dy", "-0.7em");
      }

      $("#" + this.id).html(svg.node());
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
// @import "./index.less";
</style>
