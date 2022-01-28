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
        .selectAll(`.numbers1`)
        .transition()
        .delay((d, i) => i * 20)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("x", (i) => this.xScale(this.xDomain[0]))
        .style("opacity", "0");
      this.svg
        .selectAll(`.numbers2`)
        .transition()
        .delay((d, i) => i * 20)
        .duration(400)
        .ease(d3[this.ease + "In"])
        .attr("x", (i) => this.xScale(this.xDomain[0]))
        .style("opacity", "0");

      this.svg.selectAll(`.axis_y`).transition().duration(400).style("opacity", "0");
      this.svg.selectAll(`.axis_x`).transition().duration(400).style("opacity", "0");
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
    BarRangeChart(
      data,
      {
        valueLow = (d) => d, //横向的是数值
        valueHigh = (d) => d, //横向的是数值
        label = (d, i) => i, //纵向的是label
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
        xTickNumber = 5,
      } = {}
    ) {
      const X1 = d3.map(data, valueLow);
      const X2 = d3.map(data, valueHigh);
      const Y = d3.map(data, label);

      //domain是数值范围
      //range是画图范围
      if (xDomain === undefined) xDomain = [0, d3.max(X2)];
      if (yDomain === undefined) yDomain = Y;
      yDomain = new d3.InternSet(yDomain);
      const I = d3.range(X1.length).filter((i) => yDomain.has(Y[i]));

      const xScale = d3.scaleLinear(xDomain, xRange).nice();
      const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
      const xAxis = d3.axisBottom(xScale).tickSizeOuter(0).ticks(xTickNumber);
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
        .attr("x", (i) => xScale(X1[i]))
        .attr("y", (i) => yScale(Y[i]))
        .attr("class", "bar")
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

        .attr("width", (i) => xScale(X2[i]) - xScale(X1[i]));

      //柱状图上边的数字
      const numbers1 = svg
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(I)
        .join("text")
        .attr("opacity", "0")
        .text((i) => X1[i])
        .attr("text-anchor", "end")
        .attr("class", "numbers numbers1")
        .attr("x", (i) => xScale(xDomain[0]))
        .attr("y", (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", "-0.35em");
      numbers1
        .transition()
        .delay((d, i) => i * delay)
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("x", (i) => xScale(X1[i]))
        .attr("opacity", "1");

      const numbers2 = svg
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(I)
        .join("text")
        .attr("opacity", "0")
        .attr("class", "numbers numbers2")
        .text((i) => X2[i])
        .attr("text-anchor", "start")
        .attr("x", (i) => xScale(xDomain[0]))
        .attr("y", (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", "0.3em");
      numbers2
        .transition()
        .delay((d, i) => i * delay)
        .duration(duration)
        .ease(d3[ease + "Out"])
        .attr("x", (i) => xScale(X2[i]))
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
        .delay((d, i) => i * delay)
        .ease(d3[ease + "Out"])
        .duration(duration)
        .attr("opacity", 1);

      //x轴坐标轴
      const axisX = svg
        .append("g")
        .attr("class", "axis_x")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call((g) => {
          g.select(".domain").attr("class", "domain").attr("opacity", 0);
          g.selectAll(".tick text").attr("class", "text").attr("opacity", 0);
          g.selectAll(".tick line").attr("class", "tick_line").attr("opacity", 0);
          g.selectAll(".tick line")
            .clone()
            .attr("y1", -1 * (height - marginTop - marginBottom))
            .attr("stroke", "rgba(0,0,0,.1)")
            .attr("class", "tick_long_line");
        });
      axisX.selectAll(".domain").transition().duration(400).attr("opacity", 1);
      axisX.selectAll(".tick_line").transition().duration(400).attr("opacity", 1);
      axisX.selectAll(".tick_long_line").transition().duration(400).attr("opacity", 1);
      axisX
        .selectAll(".text")
        .transition()
        .delay((d, i) => i * 40)
        .ease(d3[ease + "Out"])
        .duration(400)
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
// @import "./index.less";
</style>
