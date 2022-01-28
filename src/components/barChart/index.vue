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
      yScale: null,
      yDomain: [],
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
        .attr("y", (i) => {
          if (this.isHaveNegative) {
            return this.yScale(0);
          } else {
            return this.yScale(this.yDomain[0]);
          }
        })
        .attr("height", 0);

      this.svg
        .selectAll(`.numbers`)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("y", (i) => {
          if (this.isHaveNegative) {
            return this.yScale(0);
          } else {
            return this.yScale(this.yDomain[0]);
          }
        })
        .style("opacity", "0");

      this.svg
        .selectAll(`.axis_x`)
        .transition()
        .duration(400)
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
        x = (d, i) => i, // given d in data, returns the (ordinal) x-value
        y = (d) => d, // given d in data, returns the (quantitative) y-value
        marginTop = 40, // the top margin, in pixels
        marginRight = 0, // the right margin, in pixels
        marginBottom = 30, // the bottom margin, in pixels
        marginLeft = 40, // the left margin, in pixels
        width = 640, // the outer width of the chart, in pixels
        height = 400, // the outer height of the chart, in pixels
        xDomain, // an array of (ordinal) x-values
        xRange = [marginLeft, width - marginRight], // [left, right]
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        xPadding = 0.1, // 柱子的比例
        yFormat = ",f", // a format specifier string for the y-axis
        duration = 400, //动画持续时长
        delay = 40, //元素之间间隔时长
        ease = "easeBack", //元素之间间隔时长
        numberSuffix = "", //数字后缀
        isFromZero = true, //默认是从0开始的，如果为false，则以数据的最小值为准
        xTickNumber = 5,
        yTickNumber = 5,
        isShowNumber = true, //默认展示数字
        isNegativeSameDirection = false, //默认负值往不同方向
      } = {}
    ) {
      const X = d3.map(data, x);
      const Y = d3.map(data, y);

      //数据集中是否存在负值，决定了后续行为不一样
      let isHaveNegative = false;
      Y.map((item) => {
        if (item < 0) {
          isHaveNegative = true;
        }
      });
      let yMax = d3.max(Y);
      if (yMax < 0) {
        yMax = Math.abs(d3.min(Y));
        isNegativeSameDirection = true;
      }
      if (isNegativeSameDirection) {
        isHaveNegative = false;
        isFromZero = true;
      }
      if (isHaveNegative) {
        yRange = [height - marginBottom - 30, marginTop];
        isFromZero = false;
      }
      this.isHaveNegative = isHaveNegative;

      //x轴的输入值
      if (xDomain === undefined) xDomain = X;

      //y轴最小值，假设全为正，则非0的最小值需要乘以一个缩小系数
      let yMin = isFromZero ? 0 : d3.min(Y) * 0.9;
      //如果发现为负，则最小值需要乘以一个扩大系数
      if (isHaveNegative) {
        yMin = d3.min(Y) * 1.1;
      }

      if (yDomain === undefined) yDomain = [yMin, yMax];
      console.log("yDomain", yDomain);

      xDomain = new d3.InternSet(xDomain);
      this.yDomain = yDomain;

      const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

      const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
      const yScale = d3.scaleLinear(yDomain, yRange);
      const modeNum = Math.ceil(data.length / xTickNumber);
      console.log(xScale.domain().filter((d, i) => i % modeNum == 0));
      const xAxis = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        .tickValues(xScale.domain().filter((d, i) => i % modeNum == 0));
      const yAxis = d3
        .axisLeft(yScale)
        .ticks(yTickNumber, yFormat)
        .tickSizeOuter(0);

      this.yScale = yScale;
      this.duration = duration;
      this.delay = delay;
      this.ease = ease;

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      this.svg = svg;

      //y轴坐标轴
      const axisY = svg
        .append("g")
        .attr("class", "axis_y")
        .attr("opacity", "0")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call((g) => {
          g.select(".domain").attr("class", "domain").attr("opacity", 0);
          g.selectAll(".tick line")
            .attr("class", "tick_line")
            .attr("opacity", 0);
          g.selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke", "rgba(0,0,0,.1)")
            .attr("class", "tick_long_line");
          g.selectAll(".tick text").attr("class", "text");
        });
      axisY.selectAll(".domain").transition().duration(400).attr("opacity", 1);
      axisY
        .selectAll(".tick_line")
        .transition()
        .duration(400)
        .attr("opacity", 1);
      axisY
        .selectAll(".tick_long_line")
        .transition()
        .duration(400)
        .attr("opacity", 1);
      axisY.transition().duration(duration).style("opacity", "1");

      //柱子
      const bars = svg
        .append("g")
        .attr("class", "bar_group")
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("x", (i) => xScale(X[i]))
        .attr("y", (d, i) => {
          //对于有负数的情况，大于0时，y位于0值
          if (isHaveNegative) {
            return yScale(0);
          } else {
            return yScale(yDomain[0]);
          }
        })
        .attr("class", (d, i) =>
          Y[i] >= 0 ? "bar bar_positive" : "bar bar_negative"
        )
        .attr("height", 0)
        .attr("width", xScale.bandwidth());

      bars
        .transition()
        .delay((d, i) => i * delay)
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("y", (d, i) => {
          if (isHaveNegative && Y[i] < 0) {
            return yScale(0);
          } else {
            return yScale(Math.abs(Y[i]));
          }
        })
        .attr("height", (d, i) => {
          if (isHaveNegative) {
            if (Y[i] >= 0) {
              return yScale(0) - yScale(Y[i]); //全部数据含负值时的正值情况
            } else {
              return yScale(Y[i]) - yScale(0); //全部数据含负值时的负值情况
            }
          } else {
            return yScale(yDomain[0]) - yScale(Math.abs(Y[i])); //全部数据为正直时
          }
        });

      if (isShowNumber) {
        //柱状图上边的数字
        const numbers = svg
          .append("g")
          .attr("text-anchor", "start")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .selectAll("text")
          .data(I)
          .join("text")
          .attr("text-anchor", "middle")
          // .attr("class", "numbers")
          .attr("class", (d, i) =>
            Y[i] >= 0 ? "numbers numbers_positive" : "numbers numbers_negative"
          )
          .attr("x", (i) => xScale(X[i]) + xScale.bandwidth() / 2)
          .attr("y", (d, i) => {
            if (isHaveNegative) {
              return yScale(0);
            } else {
              return yScale(yDomain[0]);
            }
          })
          .attr("dy", (i) => {
            if (isHaveNegative && Y[i] < 0) {
              return "1.4em";
            } else {
              return "-0.5em";
            }
          })
          .attr("opacity", "0")
          .text((i) => Y[i] + numberSuffix);

        numbers
          .transition()
          .delay(function (d, i) {
            return i * delay;
          })
          .duration(duration)
          .ease(d3[ease + "Out"])
          .attr("y", (i) =>
            yScale(isNegativeSameDirection ? Math.abs(Y[i]) : Y[i])
          )
          .attr("opacity", "1");
      }

      //x轴坐标轴
      const axisX = svg
        .append("g")
        .attr("class", "axis_x")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call((g) => {
          g.select(".domain").attr("class", "domain").attr("opacity", 0);
          g.selectAll(".tick line")
            .attr("class", "tick_line")
            .attr("opacity", 0);
          g.selectAll(".tick text").attr("class", "text").attr("opacity", 0);
        });
      axisX.selectAll(".domain").transition().duration(400).attr("opacity", 1);
      axisX
        .selectAll(".tick_line")
        .transition()
        .duration(400)
        .attr("opacity", 1);
      axisX
        .selectAll(".text")
        .transition()
        .delay(function (d, i) {
          return i * delay;
        })
        .ease(d3[ease + "Out"])
        .duration(duration)
        .attr("opacity", 1);

      $("#" + this.id).html(svg.node());
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
