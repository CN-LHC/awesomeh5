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
      svg:null,
      innerRadius: 40,
      outerRadius: 400,
    };
  },
  methods: {
    async playOut() {
      const arcEnd = d3.arc().outerRadius(this.outerRadius);
      this.svg.selectAll(`.donut_path`)
        .attr("opacity", 1)
        .transition()
        .duration(400)
        .delay(function (d, i) {
          return i * 50;
        })
        .ease(d3.easeBackIn)
        .attrTween("d", (d) => {
          d.innerRadius = this.outerRadius;
          const i = d3.interpolate({ innerRadius: this.innerRadius }, d);
          return (t) => arcEnd(i(t));
        })
        .attr("opacity", 0);

      this.svg.selectAll(`.donut_txt1`).attr("opacity", 1);
      this.svg.selectAll(`.donut_txt1`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeLinear)
        .attr("opacity", 0);

      this.svg.selectAll(`.donut_txt2`).attr("opacity", 1);
      this.svg.selectAll(`.donut_txt2`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeLinear)
        .attr("opacity", 0);

      this.svg.selectAll(`.poly_lines`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeLinear)
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
    async DonutChart(
      data,
      {
        name = ([x]) => x, // given d in data, returns the (ordinal) label
        value = ([, y]) => y, // given d in data, returns the (quantitative) value
        title, // given d in data, returns the title text
        width = 340, // outer width, in pixels
        height = 340, // outer height, in pixels
        donutRatio = 0.5,
        outerRadius = height / 2, // outer radius of pie, in pixels
        innerRadius = outerRadius * donutRatio, // inner radius of pie, in pixels (non-zero for donut)
        labelRatio = 0.6,
        cornerRadius = 0, // outer radius of pie, in pixels
        labelRadius = (innerRadius + outerRadius) / 2, // center radius of labels
        format = "", // a format specifier for values (in the label)
        names, // array of names (the domain of the color scale)
        colors, // array of colors for names
        padAngle = 1, // angular separation between wedges
        duration = 800, //持续时长
        delay = 40, //间隔时长
        ease = "easeCubicInOut", //默认ease加速减速
        labelPosition = "inside",
        valueType = "relative", //相对百分比，还是绝对值
        valueSuffix = "", //数字后缀
        isRotateLabel = true, //是否旋转文字
        labelOffset=30
      } = {}
    ) {
      //当inside的时候，label的外半径就是圆的外半径
      let labelOuterRadius;
      if (labelPosition == "inside") {
        labelOuterRadius = outerRadius;
      } else if (labelPosition == "outsideWithOutLine") {
        outerRadius = (height / 2) * labelRatio * 0.88;
        labelOuterRadius = (height / 2) * labelRatio;
      } else if (labelPosition == "outsideWithLine") {
        outerRadius = (height / 2) * labelRatio * 0.9;
        labelOuterRadius = (height / 2) * labelRatio;
      }

      //为playout做记录铺垫
      this.innerRadius = innerRadius;
      this.outerRadius = outerRadius;

      //数据进来首先排序
      data = data.sort((a, b) => d3.descending(a.value, b.value));

      //N 是name数组
      const N = d3.map(data, name);
      //V 是value数组
      const V = d3.map(data, value);
      //I 是index数组，代表有效数字的V的索引，无效值被过滤了
      const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

      // Unique the names.
      if (names === undefined) names = N;
      names = new d3.InternSet(names);

      // Chose a default color scheme based on cardinality.
      if (colors === undefined) colors = d3.schemeSpectral[names.size];
      if (colors === undefined) colors = d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
      const color = d3.scaleOrdinal(names, colors);

      //arcs数据
      const arcs = d3
        .pie()
        .padAngle(padAngle / outerRadius)
        .sort(null)
        .value((i) => V[i])(I);

      //pie用到的arc
      const arcBegin = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius).cornerRadius(cornerRadius);
      const arcEnd = d3.arc().outerRadius(outerRadius).cornerRadius(cornerRadius);

      //内圆和外圆的中点
      const polyArcA = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      //折点
      const polyArcB = d3
        .arc()
        .innerRadius(labelOuterRadius * 0.99)
        .outerRadius(labelOuterRadius);
      
      //outside时候label的点
      const polyArcLabel = d3
        .arc()
        .innerRadius(outerRadius+labelOffset)
        .outerRadius(outerRadius+labelOffset);

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      this.svg=svg;

      //=====pie=====
      const donutPath = svg
        .append("g")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("class", "donut_path")
        .attr("fill", (d) => color(N[d.data]))
        .attr("d", arcBegin);
      donutPath
        .transition()
        .duration(duration)
        .ease(d3[ease])
        .delay((d, i) => {
          return i * delay;
        })
        .attrTween("d", (d) => {
          d.innerRadius = innerRadius; //终止半径
          const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle, innerRadius: outerRadius }, d); //起始半径，起始角度
          return (t) => {
            return arcEnd(i(t));
          };
        });

      //=====曲线=====
      if (labelPosition == "outsideWithLine") {
        const polyLine = svg
          .selectAll("allPolylines")
          .data(arcs)
          .enter()
          .append("polyline")
          .attr("class", "poly_lines")
          .attr("fill", "none")
          // .attr("stroke", '#000')
          .attr("stroke", (d) => color(N[d.data]))
          .attr("stroke-width", 1)
          .attr("opacity", 0)
          .attr("points", function (d) {
            var posA = polyArcA.centroid(d); // line insertion in the slice
            var posB = polyArcB.centroid(d); // line break: we use the other arc generator that has been built only for that
            var posC = polyArcB.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = labelOuterRadius * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC];
          });
        polyLine
          .transition()
          .duration(duration * 0.7)
          .ease(d3["easeCubicIn"])
          .delay((d, i) => {
            return duration * 0.5 + i * delay * 0.8;
          })
          .attr("opacity", 1);
      }

      //=====文字=====
      const donutTextG = svg.append("g").attr("text-anchor", "middle");
      let donutText;
      if (labelPosition == "inside") {
        donutText = donutTextG
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("fill", (d) => color(N[d.data]))
          .attr("transform", (d, i) => {
            const toInside = ((d.startAngle / 2 + d.endAngle / 2) * 180) / Math.PI;
            const toOutside = ((d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180) / Math.PI;
            const labelAngle = (d.endAngle + d.startAngle) / 2;
            var rotation = labelAngle < Math.PI * 0.5 || labelAngle > (Math.PI * 3) / 2 ? toInside : toOutside;
            if (isRotateLabel) {
              return `translate(${polyArcA.centroid(d)}) rotate(${rotation})`;
            } else {
              return `translate(${polyArcA.centroid(d)})`;
            }
          })
          .attr("opacity", 0);
      } else if (labelPosition == "outsideWithLine") {
        donutText = donutTextG
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("fill", (d) => color(N[d.data]))
          .attr("transform", (d) => {
            var pos = polyArcB.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = labelOuterRadius * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          })
          .attr("opacity", 0);
      } else if (labelPosition == "outsideWithOutLine") {
        donutText = donutTextG
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("fill", (d) => color(N[d.data]))
          .attr("transform", (d, i) => {
            const toInside = ((d.startAngle / 2 + d.endAngle / 2) * 180) / Math.PI;
            const toOutside = ((d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180) / Math.PI;
            const labelAngle = (d.endAngle + d.startAngle) / 2;
            var rotation = labelAngle < Math.PI * 0.5 || labelAngle > (Math.PI * 3) / 2 ? toInside : toOutside;
            if (isRotateLabel) {
              return `translate(${polyArcLabel.centroid(d)}) rotate(${rotation})`;
            } else {
              return `translate(${polyArcLabel.centroid(d)})`;
            }
          })
          .style("text-anchor", (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            if (isRotateLabel) {
              return "middle";
            } else {
              return midangle < Math.PI ? "start" : "end";
            }
          })
          .attr("opacity", 0);
      }

      donutText
        .selectAll("tspan")
        .data((d, i) => {
          const name = N[i];
          const value = V[i] + valueSuffix;
          const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
          const percentTxt = percent.toFixed(1) + "%";
          if (percent < 0) {
            return ["", ""];
          } else {
            return valueType == "absolute" ? [name, value] : [name, percentTxt];
          }
        })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => {
          if (i == 0) {
            return "0.15em";
          } else {
            return "1.45em";
          }
        })
        .attr("class", (_, i) => `donut_txt${i + 1}`)
        .text((d) => d);
      donutText
        .transition()
        .duration(duration)
        .ease(d3["easeCubicIn"])
        .delay((d, i) => {
          return i * delay;
        })
        .attr("opacity", 1);

      const result = Object.assign(svg.node(), { scales: { color } });
      $("#" + this.id).html(result);
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
