<template>
  <div :id="id" :class="customClass"></div>
</template>

<script>
import * as d3 from "d3";
import $ from "jquery";
import { sleep, randomNum } from "@/utils/utils.js";
export default {
  props: ["id", "customClass"],
  data() {
    return {
      svg: null,
      svgLineTotalLength: 0,
      svgLineTotalArr: [],
    };
  },
  methods: {
    async playOut() {
      for (let i = 0; i < this.svgLineTotalArr.length; i++) {
        this.svg
          .selectAll(`.line${i + 1}`)
          .attr("stroke-dashoffset", 0)
          .transition()
          .duration(600)
          .ease(d3.easeCubicIn)
          .attr("stroke-dashoffset", -this.svgLineTotalArr[i]);
      }
      this.svg
        .selectAll(`.circle,.valueTip`)
        .transition()
        .duration(600)
        .style("opacity", "0")
        .ease(d3.easeCubicIn);

      this.svg
        .selectAll(`.axis_x .domain`)
        .transition()
        .duration(300)
        .style("opacity", "0");
      this.svg
        .selectAll(`.axis_x .tick_line`)
        .transition()
        .duration(600)
        .style("opacity", "0");
      this.svg
        .selectAll(`.axis_x .text`)
        .transition()
        .duration(300)
        .delay((d, i) => i * 40)
        .ease(d3.easeCircleOut)
        .style("opacity", "0");
      this.svg
        .selectAll(`.axis_y .domain`)
        .transition()
        .duration(300)
        .style("opacity", "0");
      this.svg
        .selectAll(`.axis_y .tick_line, .axis_y .tick_long_line`)
        .transition()
        .duration(600)
        .style("opacity", "0");
      this.svg
        .selectAll(`.axis_y .text`)
        .transition()
        .duration(300)
        .delay((d, i) => i * 40)
        .ease(d3.easeCircleOut)
        .style("opacity", "0");

      this.svg
        .selectAll(".g_min, .g_max, .circle_min, .circle_max")
        .transition()
        .duration(300)
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
    async LineChart(
      data,
      {
        label = (d, i) => d, // given d in data, returns the (ordinal) x-value
        line1 = (d) => d, // given d in data, returns the (quantitative) y-value
        line2 = (d) => d, // given d in data, returns the (quantitative) y-value
        // curveName = "curveMonotoneX",
        // curveName = 'curveNatural',
        curveName = "curveLinear",
        marginTop = 40, // the top margin, in pixels
        marginRight = 50, // the right margin, in pixels
        marginBottom = 30, // the bottom margin, in pixels
        marginLeft = 40, // the left margin, in pixels
        width = 640, // the outer width of the chart, in pixels
        height = 400, // the outer height of the chart, in pixels
        xDomain, // an array of (ordinal) x-values
        xRange = [marginLeft, width - marginRight], // [left, right]
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        yFormat = ",f", // a format specifier string for the y-axis
        duration = 400, //动画持续时长
        delay = 40, //元素之间间隔时长
        ease = "easeQuadOut", //元素之间间隔时长
        isFromZero = true, //默认最小值从0开始
        xTickNumber = 5,
        yTickNumber = 5,
        isShowMinMax = false, //默认不显示最小最大值
        isShowTxtTips = true, //是否显示文字提示 默认开启
        lineColors = [],
        lineWidth = [],
        isShowYAxis = true, //是否显示Y轴
        isShowXAxis = true, //是否显示X轴
        numberSuffix = [], //每根线提示数据的单位
      } = {}
    ) {
      const curve = d3[curveName];
      const X = d3.map(data, label);
      let lineData = [], //折线数据 格式[[],[]] 表示有两条线
        lineCount = 0; //多少跟线
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        lineCount = 0;
        for (const key in item) {
          if (key.search("value") != -1) {
            lineCount++;
          }
        }
      }
      for (let i = 0; i < lineCount; i++) {
        let arr = [];
        for (let j = 0; j < data.length; j++) {
          arr[j] = data[j]["value" + (i + 1)];
        }
        lineData[i] = arr;
      }
      const YArray = [];
      for (let i = 0; i < lineData.length; i++) {
        let item = lineData[i];
        YArray.push(d3.min(item));
        YArray.push(d3.max(item));
      }
      const I = d3.range(X.length);
      isFromZero = d3.min(YArray) < 0 ? false : true;

      if (xDomain === undefined) xDomain = X;
      if (yDomain === undefined)
        yDomain = [isFromZero ? 0 : d3.min(YArray), d3.max(YArray)];

      const xScale = d3.scalePoint(xDomain, xRange);
      const yScale = d3.scaleLinear(yDomain, yRange);
      const yMagnify = d3.scaleLinear().domain(yRange).range(yDomain); //计算y轴坐标和value对应关系 yMagnify(y)=>value

      //算出每几个标一个tick
      const modeNum = Math.ceil(data.length / xTickNumber);
      const xAxis = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        .tickValues(xScale.domain().filter((d, i) => i % modeNum == 0));
      const yAxis = d3
        .axisLeft(yScale)
        .ticks(yTickNumber, yFormat)
        .tickSizeOuter(0);

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
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call((g) => {
          g.select(".domain").attr("opacity", 0);
          g.selectAll(".tick line")
            .attr("class", "tick_line")
            .attr("opacity", 0);
          g.selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke", "rgba(0,0,0,.1)")
            .attr("class", "tick_long_line");
          g.selectAll(".tick text").attr("class", "text").attr("opacity", 0);
        });
      axisY
        .selectAll(".domain")
        .transition()
        .duration(600)
        .attr("opacity", isShowYAxis ? 1 : 0);
      axisY
        .selectAll(".tick_line")
        .transition()
        .duration(600)
        .attr("opacity", 1);
      axisY
        .selectAll(".tick_long_line")
        .transition()
        .duration(600)
        .attr("opacity", 1);
      axisY
        .selectAll(".text")
        .transition()
        .delay((d, i) => i * delay)
        .ease(d3.easeCircleOut)
        .duration(600)
        .attr("opacity", 1);

      //x轴坐标轴
      const axisX = svg
        .append("g")
        .attr("class", "axis_x")
        .attr("transform", `translate(0,${height - marginBottom + 1})`)
        .call(xAxis)
        .call((g) => {
          g.select(".domain").attr("opacity", 0);
          g.selectAll(".tick line")
            .attr("class", "tick_line")
            .attr("opacity", 0);
          g.selectAll(".tick text").attr("class", "text").attr("opacity", 0);
        });

      axisX
        .selectAll(".domain")
        .transition()
        .duration(600)
        .attr("opacity", isShowXAxis ? 1 : 0);
      axisX
        .selectAll(".tick_line")
        .transition()
        .duration(600)
        .attr("opacity", 1);
      axisX
        .selectAll(".text")
        .transition()
        .delay((d, i) => i * delay)
        .ease(d3.easeCircleOut)
        .duration(600)
        .attr("opacity", 1);

      //画线
      let maxSvgLineTotalLength = 0;
      for (let i = 0; i < lineCount; i++) {
        const color = !lineColors[i] ? "#000" : lineColors[i];
        const width = !lineWidth[i] ? 1 : lineWidth[i];
        const Y = lineData[i];
        const pathLine = d3
          .line()
          .curve(curve)
          .x((i) => xScale(X[i]))
          .y((i) => yScale(Y[i]));
        const svgLine = svg
          .append("path")
          .attr("fill", "none")
          .attr("class", `line line${i + 1}`)
          .attr("stroke", color)
          .attr("stroke-width", width)
          .attr("d", pathLine(I));
        const svgLineTotalLength = svgLine.node().getTotalLength();
        this.svgLineTotalArr[i] = svgLineTotalLength;
        svgLine
          .attr(
            "stroke-dasharray",
            svgLineTotalLength + "," + svgLineTotalLength
          )
          .attr("stroke-dashoffset", svgLineTotalLength)
          .transition()
          .duration(duration)
          .ease(d3[ease])
          .attr("stroke-dashoffset", 0);
        //是否需要数据提示
        if (isShowTxtTips == true) {
          //圆点
          let circle = svg
            .append("circle")
            .attr("cx", xScale(X[0]))
            .attr("cy", yScale(Y[0]))
            .attr("r", width)
            .attr("class", `circle circle${i + 1}`)
            .attr("stroke-width", width / 2)
            .attr("stroke", color)
            .attr("fill", "#fff");
          let circleTran = circle
            .transition()
            .duration(duration)
            .ease(d3[ease])
            .tween("attr.circle", function (d, i, a) {
              return function (t) {
                let x = svgLine
                  .node()
                  .getPointAtLength(svgLineTotalLength * t).x;
                let y = svgLine
                  .node()
                  .getPointAtLength(svgLineTotalLength * t).y;
                d3.select(this).attr("cx", x).attr("cy", y);
              };
            });
          //文字
          let text = svg
            .append("text")
            .attr("fill", color)
            .attr("x", xScale(X[0]))
            .attr("y", yScale(Y[0]))
            .attr("class", `valueTip valueTip${i + 1}`)
            .attr("text-anchor", "start")
            .text(0);

          let textTran = text
            .transition()
            .duration(duration)
            .ease(d3[ease])
            .tween("attr.text", function (d, b, a) {
              return function (t) {
                let x = svgLine
                  .node()
                  .getPointAtLength(svgLineTotalLength * t).x;
                let y = svgLine
                  .node()
                  .getPointAtLength(svgLineTotalLength * t).y;
                d3.select(this)
                  .attr("x", x + 5)
                  .attr("y", () => {
                    return y;
                  })
                  .text(() => {
                    let suffix = !numberSuffix[i] ? "" : numberSuffix[i];
                    return yMagnify(y).toFixed(2) + suffix;
                  });
              };
            });
        }
      }

      /*
      1. 标注最大最小默认只在第一条线上进行
      2. 当标注处于左半边则向右偏移，处于右半边则向左偏移
      3. 最低值的标注在上边，最高值的标注在下边
      */
      if (isShowMinMax) {
        //最大值最小值
        const Y1Array = [d3.min(lineData[0]), d3.max(lineData[0])];
        //最大值最小值所在索引
        const Y1IndexArray = [
          lineData[0].indexOf(Y1Array[0]),
          lineData[0].indexOf(Y1Array[1]),
        ];
        //x轴具体为哪一个
        const X1Array = [X[Y1IndexArray[0]], X[Y1IndexArray[1]]];

        //画最小值和最大值的圆
        const circleMin = svg
          .append("circle")
          .attr("cx", xScale(X1Array[0]))
          .attr("cy", yScale(Y1Array[0]))
          .attr("r", 5)
          .attr("class", "circle_min")
          .attr("opacity", "0");
        circleMin
          .transition()
          .duration(500)
          .attr("opacity", "1")
          .delay(200 + delay * (Y1IndexArray[0] + 2));

        const circleMax = svg
          .append("circle")
          .attr("cx", xScale(X1Array[1]))
          .attr("cy", yScale(Y1Array[1]))
          .attr("r", 5)
          .attr("class", "circle_max")
          .attr("opacity", "0");
        circleMax
          .transition()
          .duration(500)
          .attr("opacity", "1")
          .delay(200 + delay * (Y1IndexArray[1] + 2));

        //仅仅为了获得label宽高高度
        svg
          .append("text")
          .attr("x", -90)
          .attr("y", -90)
          .attr("class", "label_min_invisible label_min")
          .attr("text-anchor", "middle")
          .text(Y1Array[0]);
        svg
          .append("text")
          .attr("x", -90)
          .attr("y", -90)
          .attr("class", "label_max_invisible label_max")
          .attr("text-anchor", "middle")
          .text(Y1Array[1]);

        setTimeout(() => {
          //最小值的逻辑是得到隐藏数字的宽高，然后再画rect，再画text
          const minRect = document
            .querySelector(`#${this.id} .label_min_invisible`)
            .getBoundingClientRect();
          const isMinSitLeft = xScale(X1Array[0]) < marginLeft + width / 2;
          const minTranslateX = isMinSitLeft
            ? (minRect.width * 1.5) / 2 + 10
            : (minRect.width * 1.5 * -1) / 2 - 10;
          const minGroup = svg
            .append("g")
            .attr("class", "g_min")
            .attr("opacity", "0");
          const minLabelBg = minGroup
            .append("rect")
            .attr("x", () => xScale(X1Array[0]) - (minRect.width * 1.5) / 2)
            .attr("y", yScale(Y1Array[0]))
            .attr("width", minRect.width * 1.5)
            .attr("height", minRect.height * 1.4)
            .attr("rx", 4)
            .attr("fill", "#ccc")
            .attr("class", "label_min_bg")
            .text(Y1Array[0]);
          const minLabel = minGroup
            .append("text")
            .attr("x", xScale(X1Array[0]))
            .attr("y", yScale(Y1Array[0]))
            .attr("dy", "1.34em")
            .attr("class", "label_min")
            .attr("text-anchor", "middle")
            .text(Y1Array[0]);
          minGroup
            .transition()
            .duration(500)
            .attr("opacity", "1")
            .attr("transform", `translate(${minTranslateX},-26)`)
            .delay(200 + delay * (Y1IndexArray[0] + 2));

          //最大值
          const maxRect = document
            .querySelector(`#${this.id} .label_max_invisible`)
            .getBoundingClientRect();
          const isMaxSitLeft = xScale(X1Array[1]) < marginLeft + width / 2;
          const maxTranslateX = isMaxSitLeft
            ? (maxRect.width * 1.5) / 2 + 10
            : (maxRect.width * 1.5 * -1) / 2 - 10;
          const maxGroup = svg
            .append("g")
            .attr("class", "g_max")
            .attr("opacity", "0");
          const maxLabelBg = maxGroup
            .append("rect")
            .attr("x", () => xScale(X1Array[1]) - (maxRect.width * 1.5) / 2)
            .attr("y", yScale(Y1Array[1]))
            .attr("width", maxRect.width * 1.5)
            .attr("height", maxRect.height * 1.4)
            .attr("rx", 4)
            .attr("fill", "#ccc")
            .attr("class", "label_max_bg")
            .text(Y1Array[1]);
          const maxLabel = maxGroup
            .append("text")
            .attr("x", xScale(X1Array[1]))
            .attr("y", yScale(Y1Array[1]))
            .attr("dy", "1.34em")
            .attr("class", "label_max")
            .attr("text-anchor", "middle")
            .text(Y1Array[1]);
          maxGroup
            .transition()
            .duration(500)
            .attr("opacity", "1")
            .attr("transform", `translate(${maxTranslateX},4)`)
            .delay(200 + delay * (Y1IndexArray[1] + 2));
        }, 1);
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
@import "./index.less";
</style>
