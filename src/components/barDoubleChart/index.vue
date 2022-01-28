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
      // isHaveNegative: false,
      isPositive: false,
      noPositive: false,
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
          if (this.isPositive) {
            return this.yScale(this.yDomain[0]);
          } else if (this.noPositive) {
            return this.yScale(this.yDomain[1]);
          } else {
            return this.yScale(0);
          }
        })
        .attr("height", 0);

      this.svg
        .selectAll(`.text`)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("y", (i) => {
          if (this.isPositive) {
            return this.yScale(this.yDomain[0]);
          } else if (this.noPositive) {
            return this.yScale(this.yDomain[1]);
          } else {
            return this.yScale(0);
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
        // y = (d) => d, // given d in data, returns the (quantitative) y-value
        // z = () => 1,
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
        zDomain, // array of z-values
        zPadding = 0.05,
        xPadding = 0.1, // 柱子的比例
        yFormat = ",f", // a format specifier string for the y-axis
        duration = 400, //动画持续时长
        delay = 40, //元素之间间隔时长
        ease = "easeBack", //元素之间间隔时长
        numberSuffix = "", //数字后缀
        isFromZero = true, //默认是从0开始的，如果为false，则以数据的最小值为准
        xTickNumber = 5,
        yTickNumber = 5,
        colors = d3.schemeTableau10,
        isShowText = false, //是否展示柱子顶部数据,默认不展示
        isShowYAxis = true, //是否显示Y轴
        isShowXAxis = true, //是否显示X轴
      } = {}
    ) {
      const keys = Object.keys(data[0]).filter(
        (item) => item != "label" && item != "suffix"
      );
      // console.log("data",data);
      const initData = keys.flatMap((item) =>
        data.map((d) => ({
          state: x(d),
          value: item,
          population: d[item],
          suffix: !d.suffix ? numberSuffix : d.suffix,
        }))
      );
      // console.log("keys", keys);
      // console.log("initData", initData);
      const X = initData.map((e) => e.state);
      const Y = initData.map((e) => e.population);
      const Z = initData.map((e) => e.value);
      // console.log("X", X);
      // console.log("Y ", Y);
      // console.log("Z ", Z);
      const isPositive = Y.every((item) => item >= 0);
      const noPositive = Y.every((item) => item < 0);
      this.isPositive = isPositive;
      this.noPositive = noPositive;
      if (xDomain === undefined) xDomain = X;
      if (yDomain === undefined)
        yDomain = noPositive
          ? [d3.min(Y) * 1.1, 0]
          : isPositive
          ? [0, d3.max(Y)]
          : [d3.min(Y) * 1.4, d3.max(Y)];
      if (zDomain === undefined) zDomain = Z;
      xDomain = new d3.InternSet(xDomain);
      zDomain = new d3.InternSet(zDomain);

      // console.log("xDomain", xDomain);
      // console.log("yDomain ", yDomain);
      // console.log("zDomain ", zDomain);
      this.yDomain = yDomain;
      const I = d3
        .range(X.length)
        .filter((i) => xDomain.has(X[i]) && zDomain.has(Z[i]));
      // console.log("I", I);
      const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
      const xzScale = d3
        .scaleBand(zDomain, [0, xScale.bandwidth()])
        .padding(zPadding);
      const yScale = d3.scaleLinear(
        yDomain,
        noPositive ? yRange.reverse() : yRange
      );
      this.yScale = yScale;
      // console.log("colors ", colors);
      const zScale = d3.scaleOrdinal(zDomain, colors);

      const modeNum = Math.ceil(data.length / xTickNumber);

      const xAxis = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        .tickValues(xScale.domain().filter((d, i) => i % modeNum == 0));
      const yAxis = d3.axisLeft(yScale).ticks(yTickNumber, yFormat);

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      this.svg = svg;
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .attr("class", "axis_y")
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1)
        );

      const bar = svg
        .append("g")
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("fill", (i) => zScale(Z[i]))
        .attr("class", "bar")
        .attr("x", (i) => {
          return xScale(X[i]) + xzScale(Z[i]);
        })
        .attr("y", (i) => {
          if (isPositive) {
            return yScale(yDomain[0]);
          } else if (noPositive) {
            return yScale(yDomain[1]);
          } else {
            return yScale(0);
          }
        })
        .attr("height", 0)
        .attr("width", xzScale.bandwidth());

      bar
        .transition()
        .delay((d, i) => i * delay)
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("y", (i) => {
          if (noPositive) {
            return yScale(Y[i]);
          } else {
            if (Y[i] > 0) {
              return yScale(Y[i]);
            } else {
              return yScale(0);
            }
          }
        })
        .attr("height", (i) => {
          if (isPositive) {
            return yScale(yDomain[0]) - yScale(Y[i]);
          } else if (noPositive) {
            return yScale(yDomain[1]) - yScale(Y[i]);
          } else {
            if (Y[i] > 0) {
              return yScale(0) - yScale(Y[i]);
            } else {
              return Math.abs(yScale(Y[i]) - yScale(0));
            }
          }
        });

      if (isShowText) {
        const textGroup = svg
          .append("g")
          .attr("text-anchor", "start")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .selectAll("text")
          .data(I)
          .join("text")
          .attr("text-anchor", "middle")
          .attr("class", "text")
          .text("")
          .attr("x", (i) => {
            return xScale(X[i]) + xzScale(Z[i]) + xzScale.bandwidth() / 2;
          })
          .attr("y", (i) => {
            if (isPositive) {
              return yScale(yDomain[0]);
            } else if (noPositive) {
              return yScale(yDomain[1]);
            } else {
              return yScale(0);
            }
          });

        textGroup
          .transition()
          .delay((d, i) => i * delay)
          .duration(duration)
          .ease(d3[ease + "Out"])
          .attr("y", (i) => {
            if (isPositive) {
              return yScale(Y[i]) - 5;
            } else if (noPositive) {
              return yScale(Y[i]) - 5;
            } else {
              if (Y[i] > 0) {
                return yScale(Y[i]) - 5;
              } else {
                return yScale(Y[i]) + 15;
              }
            }
          })
          .text((i) => Y[i] + initData[i].suffix);
      }

      svg
        .append("g")
        .attr("class", "axis_x")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

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
