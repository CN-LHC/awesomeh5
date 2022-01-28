<template>
  <div :id="id" :class="customClass"></div>
</template>

<script>
import * as d3 from "d3";
import $ from "jquery";
import { sleep, randomNum } from "@/utils/utils.js";
export default {
  props: [ "id","customClass"],
  data() {
    return {
      svg: null,
      dountRadius: 0,
    };
  },
  methods: {
    async playOut() {
      const arcEnd = d3.arc().innerRadius(this.dountRadius);
      this.svg
        .selectAll(`.donut_path`)
        .attr("opacity", 1)
        .transition()
        .duration(400)
        .delay(function (d, i) {
          return i * 20;
        })
        .ease(d3.easeCubicIn)
        .attrTween("d", (d) => {
          let _d = Object.assign(
            { ...d },
            {
              outerRadius: this.dountRadius,
              startAngle: Math.PI * 2,
              endAngle: Math.PI * 2,
            }
          );
          console.log(_d.outerRadius, d.outerRadius);
          const i = d3.interpolate(d, _d);
          return (t) => arcEnd(i(t));
        });

      this.svg.selectAll(`.donut_txt1`).attr("opacity", 1);
      this.svg
        .selectAll(`.donut_txt1`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeLinear)
        .attr("opacity", 0);
      this.svg.selectAll(`.donut_txt2`).attr("opacity", 1);
      this.svg
        .selectAll(`.donut_txt2`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeLinear)
        .attr("opacity", 0);
      this.svg.selectAll(`.top3`).attr("opacity", 1);
      this.svg
        .selectAll(`.top3`)
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
        width = 340, // outer width, in pixels
        height = 340, // outer height, in pixels
        outerRadius = height / 2, // outer radius of pie, in pixels
        donutRatioRange = [0.2, 0.5, 0.8],
        labelOffset = 30,
        top3Offset = 30,
        names, // array of names (the domain of the color scale)
        colors, // array of colors for names
        duration = 800, //持续时长
        delay = 40, //间隔时长
        ease = "easeCubicInOut", //默认ease加速减速
        valueType = "relative", //相对百分比，还是绝对值
        valueSuffix = "", //数字后缀
        isSort = false, //是否排序
        isSameAngle = false, // 是否均分角度
        isRotateLabel = true, //是否旋转文字
      } = {}
    ) {
      //得到最小半径和最大半径
      const dountRadius = outerRadius * donutRatioRange[0];
      const minRadius = outerRadius * donutRatioRange[1];
      const maxRadius = outerRadius * donutRatioRange[2];

      //为playout做记录铺垫
      this.dountRadius = dountRadius;

      //保留原始数据
      let unSortedData = data.concat([]);
      let sortedData = data.concat([]).sort((a, b) => d3.descending(a.value, b.value));
      data = isSort ? sortedData : unSortedData;

      //得到在不排序时，原始数据从大到小的索引值
      let desIndexArr = [];
      unSortedData.map((item) => {
        sortedData.map((cell, index) => {
          if (item.name == cell.name) {
            desIndexArr.push(index);
          }
        });
      });

      //N 是name数组
      const N = d3.map(data, name);
      //V 是value数组
      const V = d3.map(data, value);
      //I 是index数组，代表有效数字的V的索引，无效值被过滤了
      const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

      let sameV = [];
      I.map((item) => {
        sameV.push(10);
      });

      const finalV = isSameAngle ? sameV : V;

      //根据数据长度，得到对应数量的半径数组
      const sortedRadiusArr = d3.quantize(d3.interpolate(maxRadius, minRadius), N.length);
      let unSortedRadiusArr = [];
      desIndexArr.map((item) => {
        unSortedRadiusArr.push(sortedRadiusArr[item]);
      });
      const radiusArr = isSort ? sortedRadiusArr : unSortedRadiusArr;

      // Unique the names.
      if (names === undefined) names = N;
      names = new d3.InternSet(names);

      // Chose a default color scheme based on cardinality.
      if (colors === undefined) colors = d3.schemeSpectral[names.size];
      const color = d3.scaleOrdinal(names, colors);

      //arcs数据
      const arcs = d3
        .pie()
        .padAngle(0)
        .sort(null)
        .value((i) => finalV[i])(I);

      //pie用到的arc
      const arcPieBegin = d3.arc().innerRadius(dountRadius).outerRadius(dountRadius);
      const arcPieEnd = d3.arc().innerRadius(dountRadius);

      //label的arc
      const arcLabel = (i) =>
        d3
          .arc()
          .innerRadius(radiusArr[i] + labelOffset)
          .outerRadius(radiusArr[i] + labelOffset);

      //top3 的arc
      const arcTop3 = (i) =>
        d3
          .arc()
          .innerRadius(radiusArr[i] - top3Offset)
          .outerRadius(radiusArr[i] - top3Offset);

      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      this.svg = svg;

      //=====pie=====
      const donutPath = svg
        .append("g")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("class", "donut_path")
        .attr("fill", (d) => color(N[d.data]))
        .attr("id", function (d, i) {
          return "monthArc_" + i;
        })
        .attr("d", (d, i) => {
          const ops = arcPieBegin(d, i);
          return "M0,0" + ops.replace("M", "L");
        });

      donutPath
        .transition()
        .duration(duration)
        .ease(d3[ease])
        .delay((d, i) => {
          return i * delay;
        })
        .attrTween("d", (d, i) => {
          d.outerRadius = radiusArr[i]; //终止半径
          const interpolateI = d3.interpolate(
            { startAngle: d.startAngle, endAngle: d.startAngle, outerRadius: dountRadius },
            d
          ); //起始半径，起始角度
          return (t) => {
            const ops = arcPieEnd(interpolateI(t));
            return "M0,0" + ops.replace("M", "L");
          };
        });

      //=====文字=====
      // const testG = svg.append("g").attr("text-anchor", "middle");
      // let test;
      // test = testG
      //   .selectAll("text")
      //   .data(arcs)
      //   .join("text")
      //   .attr("class", "test")
      //   .append("textPath")
      //   .attr("text-anchor", "middle")
      //   .attr("startOffset", function (d, i) {
      //     return "50%";
      //   })
      //   .attr("xlink:href", function (d, i) {
      //     return "#monthArc_" + i;
      //   })
      //   .text(function (d) {
      //     return "通信工程";
      //   });

      const donutTextG = svg.append("g").attr("text-anchor", "middle");
      let donutText;
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
            return `translate(${arcLabel(i).centroid(d)}) rotate(${rotation})`;
          } else {
            return `translate(${arcLabel(i).centroid(d)})`;
          }
        })
        .attr("opacity", 0);

      donutText
        .selectAll("tspan")
        .data((d, i) => {
          const name = N[i];
          const value = V[i] + valueSuffix;
          const percent = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
          const percentTxt = percent.toFixed(1) + "%";
          if (percent < 5.5) {
            return ["", ""];
          } else {
            return valueType == "absolute" ? [name, value] : [name, percentTxt];
          }
        })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => {
          if (i == 0) {
            return "-0.35em";
          } else {
            return "0.95em";
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

      const donutTop3G = svg.append("g").attr("text-anchor", "middle");
      const donutTop3 = donutTop3G
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("fill", "#fff")
        .attr("class", "top3")
        .attr("transform", (d, i) => {
          const toInside = ((d.startAngle / 2 + d.endAngle / 2) * 180) / Math.PI;
          const toOutside = ((d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180) / Math.PI;
          const labelAngle = (d.endAngle + d.startAngle) / 2;
          var rotation = labelAngle < Math.PI * 0.5 || labelAngle > (Math.PI * 3) / 2 ? toInside : toOutside;
          if (isRotateLabel) {
            return `translate(${arcTop3(i).centroid(d)}) rotate(${rotation})`;
          } else {
            return `translate(${arcTop3(i).centroid(d)})`;
          }
        })
        .text((d, i) => {
          return i < 3 ? "NO." + (i + 1) : "";
        })
        .attr("opacity", 0);

      donutTop3
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
