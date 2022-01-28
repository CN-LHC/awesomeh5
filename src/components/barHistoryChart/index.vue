<template>
  <div :id="id" :class="customClass"></div>
</template>

<script>
import * as d3 from "d3";
import $ from "jquery";
import { sleep } from "@/utils/utils.js";
export default {
  props: ["id", "customClass"],
  data() {
    return {
      svg:null,
    };
  },
  methods: {
    async playOut() {
      this.svg.selectAll(`.bar_rect`)
        .transition()
        .delay((d, i) => {
          return i * 40;
        })
        .duration(400)
        .ease(d3.easeExpIn)
        .attr("width", 0);

      this.svg.selectAll(`.label`)
        .attr("opacity", 1)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3.easeExpIn)
        .attr("opacity", 0);

      this.svg.selectAll(`.value`)
        .attr("opacity", 1)
        .transition()
        .delay((d, i) => i * 40)
        .duration(400)
        .ease(d3.easeExpIn)
        .attr("x", 10)
        .attr("opacity", 0);

      this.svg.select(`.x_axis`)
        .attr("opacity", 1)
        .transition()
        .duration(300)
        .ease(d3.easeExpIn)
        .attr("opacity", 0);

      this.svg.select(`.date-title`)
        .attr("opacity", 1)
        .transition()
        .duration(300)
        .ease(d3.easeExpIn)
        .attr("opacity", 0);
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
    BarHistoryChart(
      dataOrigin,
      {
        width = 600,
        height = 600,
        margin = { top: 30, bottom: 0, left: 100, right: 100 },
        chartWidth = width - (margin.left + margin.right),
        chartHeight = height - (margin.top + margin.bottom),
        count = 10,
        playDuration = 1000,
        inDuration = 600,
        delay = 50,
        yPadding = 0.1,
        ease = "easeExpOut",
        data = [], //转换过格式的数据集
        chart = null,
        xScale = null,
        xAxis = null,
        yScale = null,
        svg = null,
        dateTitle = null,
        suffix = "",
      } = {}
    ) {
      const barHeight = chartHeight / count;
      let dateIndex = 0;
      const getDate = () => dataOrigin[0][dateIndex];
      let date = getDate();
      let dataSlice = [];

      // 创建SVG
      const createSvg = () => {
        svg = d3
          .create("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
        $("#" + this.id).html(svg.node());
        this.svg = svg;
      };

      const colorIt = (index) => {
        const colorScale = d3.scaleLinear([0, dataOrigin.length], [0, 1]);
        return d3.interpolateRainbow(colorScale(index));
      };

      // 格式化数据
      const formatData = () => {
        dataOrigin[0].forEach((date, index) => {
          if (index > 0) {
            dataOrigin.forEach((row, rowIndex) => {
              if (rowIndex > 0) {
                data.push({
                  name: row[0],
                  value: Number(row[index]),
                  lastValue: index > 1 ? Number(row[index - 1]) : 0,
                  date: date,
                  color: colorIt(rowIndex),
                });
              }
            });
          }
        });
        console.log("data", data);
      };

      // 获取当天数据并按倒叙排列
      const sliceData = (date) => {
        dataSlice = data
          .filter((d) => d.date === date)
          .sort((a, b) => b.value - a.value)
          .slice(0, count);
      };

      // 创建Y比例尺
      yScale = d3
        .scaleBand()
        .domain(d3.range(count))
        .rangeRound([margin.top, margin.top + barHeight * count])
        .padding(yPadding);

      // 创建X比例尺
      const createScale = () => {
        const xDomain = [0, d3.max(dataSlice, (d) => d.value)];
        const xRange = [0, chartWidth];
        xScale = d3.scaleLinear(xDomain, xRange);
      };

      // 创建x坐标轴
      const renderAxis = () => {
        createScale();
        xAxis = d3.axisTop().scale(xScale).ticks(3).tickPadding(10).tickSize(0);
        svg
          .append("g")
          .classed("x_axis", true)
          .style("transform", `translate3d(${margin.left}px, ${margin.top}px, 0)`)
          .call(xAxis);
      };

      // 画坐标线
      const renderAxisLine = () => {
        d3.selectAll(`#${this.id} .g.x_axis g.tick`).select("line.grid-line").remove();
        d3.selectAll(`#${this.id} .g.x_axis g.tick`)
          .append("line")
          .classed("grid-line", true)
          .attr("stroke", "black")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", chartHeight);
      };

      // 当数据变化时更新坐标轴
      const updateAxis = () => {
        createScale();
        xAxis.scale().domain([0, d3.max(dataSlice, (d) => d.value)]);
        svg.select("g.x_axis").transition().duration(400).ease(d3.easeLinear).call(xAxis);
      };

      // 渲染日期标题
      const renderDateTitle = () => {
        const firstDate = dataOrigin[0][1];
        dateTitle = svg
          .append("text")
          .classed("date-title", true)
          .text(firstDate)
          .attr("x", chartWidth + margin.left + margin.right - 50)
          .attr("y", chartHeight - 20)
          .attr("fill", "rgb(128, 128, 128)")
          .attr("font-size", 40)
          .attr("text-anchor", "end");
      };

      const createChart = () => {
        chart = svg
          .append("g")
          .classed("chart", true)
          .style("transform", `translate3d(${margin.left}px, ${yScale.bandwidth() / 2}px, 0)`);
        this.chart = chart;
      };

      const renderChartIn = () => {
        dateIndex += 1;
        date = getDate();
        sliceData(date);
        createScale();
        const bars = chart.selectAll("g.bar").data(dataSlice, (d) => d.name);
        let barsEnter = bars
          .enter()
          .append("g")
          .classed("bar", true)
          .style("transform", (d, i) => `translate3d(0, ${yScale(i)}px, 0)`);
        //rect
        barsEnter
          .append("rect")
          .classed("bar_rect", true)
          .attr("width", 0)
          .attr("height", (d, i) => yScale.bandwidth() + "px")
          .attr("fill", (d) => d.color)
          .style("transform", `translate(0px, ${(-1 * yScale.bandwidth()) / 2}px)`)
          .transition()
          .duration(inDuration)
          .delay((d, i) => i * delay)
          .ease(d3[ease])
          .attr("width", (d) => xScale(d.value));
        //label
        barsEnter
          .append("text")
          .classed("label", true)
          .attr("dx", "-0.35em")
          .attr("dy", "0.35em")
          .attr("text-anchor", "end")
          .attr("opacity", 0)
          .text((d) => d.name)
          .transition()
          .duration(inDuration)
          .delay((d, i) => i * delay)
          .ease(d3[ease])
          .attr("opacity", 1);
        //value
        barsEnter
          .append("text")
          .classed("value", true)
          .text((d) => d.value + suffix)
          .attr("x", 10)
          .attr("dy", "0.35em")
          .attr("opacity", 0)
          .transition()
          .duration(inDuration)
          .delay((d, i) => i * delay)
          .ease(d3[ease])
          .attr("opacity", 1)
          .attr("x", (d) => xScale(d.value) + 10);
      };

      const renderChartPlay = () => {
        const bars = chart.selectAll("g.bar").data(dataSlice, (d) => d.name);
        let barsEnter = bars
          .enter()
          .append("g")
          .classed("bar", true)
          .style("transform", (d, i) => `translate3d(0, ${yScale(i)}px, 0)`);
        barsEnter
          .append("rect")
          .classed("bar_rect", true)
          .attr("width", (d) => xScale(d.value))
          .attr("height", (d, i) => yScale.bandwidth() + "px")
          .attr("fill", (d) => d.color)
          .style("transform", `translate(0px, ${(-1 * yScale.bandwidth()) / 2}px)`);
        barsEnter
          .append("text")
          .classed("label", true)
          .attr("dx", "-0.35em")
          .attr("dy", "0.35em")
          .attr("text-anchor", "end")
          .text((d) => d.name);
        barsEnter
          .append("text")
          .classed("value", true)
          .attr("x", (d) => xScale(d.value) + 10)
          .attr("dy", "0.35em")
          .text((d) => d.value);

        // 更新模式
        bars
          .transition()
          .duration(playDuration)
          .ease(d3.easeLinear)
          .select("rect")
          .attr("width", (d) => xScale(d.value));
        bars
          .transition()
          .duration(playDuration > 400 ? 400 : playDuration * 0.6)
          .ease(d3.easeLinear)
          .style("transform", (d, i) => `translate3d(0, ${yScale(i)}px, 0)`);

        bars
          .select("text.value")
          .transition()
          .duration(playDuration)
          .ease(d3.easeLinear)
          .attr("x", (d) => xScale(d.value) + 10)
          .tween("text", function (d) {
            const textDom = this;
            const i = d3.interpolateRound(d.lastValue, d.value);
            return (t) => (textDom.textContent = i(t) + suffix);
          });
        // 退出模式
        bars.exit().remove();
      };

      const singleFrame = () => {
        dateIndex++;
        date = getDate();
        dateTitle.text(date);
        sliceData(date);
        updateAxis();
        renderAxisLine();
        renderChartPlay();
      };

      function createTicker() {
        const ticker = d3.interval(() => {
          if (dateIndex < dataOrigin[0].length - 1) {
            singleFrame();
          } else {
            ticker.stop();
          }
        }, playDuration);
      }

      const init = async () => {
        createSvg(); // 创建一个svg
        formatData(); // 格式化数据
        sliceData(date); // 截取当天数据
        renderAxis(); // 渲染坐标轴
        renderAxisLine(); // 渲染指示线
        renderDateTitle(); // 渲染日期
        createChart(); // 创建图表
        renderChartIn();
        await sleep(delay * count);
        createTicker(); // 创建定时器
      };

      init();
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
