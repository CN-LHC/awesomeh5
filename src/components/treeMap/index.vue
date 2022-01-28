<template>
  <div :id="id" :class="customClass"></div>
</template>

<script>
import * as d3 from "d3";
import $ from "jquery";
import { sleep, randomNum } from "@/utils/utils.js";
export default {
  props: ["id","customClass"],
  data() {
    return {
      svg:null,
    };
  },
  methods: {
    async playOut() {
      this.svg.selectAll(`.rect`)
        .transition()
        .duration(400)
        .delay(function (d, i) {
          return i * 20;
        })
        .ease(d3.easeCubicIn)
        .attr("width", "0");

      this.svg.selectAll(`.txt1`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeCubicIn)
        .attr("opacity", 0);

      this.svg.selectAll(`.txt2`)
        .transition()
        .duration(200)
        .delay(function (d, i) {
          return i * 10;
        })
        .ease(d3.easeCubicIn)
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
    async TreeMap(
      data,
      {
        path = (d) => d.name.replace(/\./g, "/"), // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
        id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
        parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
        children, // if hierarchical data, given a d in data, returns its children
        value = (d) => d?.size, // given a node d, returns a quantitative value (for area encoding; null for count)
        rangeValue = (d) => d?.rangeValue, // given a node d, returns a quantitative value (for area encoding; null for count)
        label = (d, n) => {
          return [
            ...d.name
              .split(".")
              .pop()
              .split(/(?=[A-Z][a-z])/g),
            n.data.domainValue,
          ].join("\n");
        }, // given a leaf node d, returns the name to display on the rectangle
        group = (d) => d.name.split(".")[1], // given a leaf node d, returns a categorical value (for color encoding)
        link, // given a leaf node d, its link (if any)
        linkTarget = "_blank", // the target attribute for links (if any)
        tile = d3.treemapBinary, // treemap strategy
        width = 350, // outer width, in pixels
        height = 500, // outer height, in pixels
        padding = 2, // shorthand for inner and outer padding
        round = true, // whether to round to exact pixels
        colors = d3.schemeTableau10, // array of colors
        duration = 1000, //持续时长
        delay = 40, //间隔时长
        rectRadius = 0,
        valueSuffix = "", //数字后缀
        ease = "easeCubicInOut", //默认ease加速减速
      } = {}
    ) {
      //将value映射到200到1000的空间中，保证文字有足够的空间显示，但比例关系变得不那么严格
      const valueArr = d3.map(data, value);
      const valueScale = d3.scaleLinear([d3.min(valueArr), d3.max(valueArr)], [200, 1000]);
      const fontSizeScale = d3.scaleLinear([d3.min(valueArr), d3.max(valueArr)], [14, 18]);
      data.map((item) => {
        if (value(item) != null) {
          item.rangeValue = valueScale(value(item));
          item.domainValue = value(item);
        }
        return item;
      });

      // 数据默认是排序的
      data = data.sort((a, b) => {
        return d3.descending(value(a), value(b));
      });

      const D = d3.map(data, (d) => d);
      const I = d3.map(data, path).map((d) => ((d = `${d}`).startsWith("/") ? d : `/${d}`));
      const paths = new Set(I);
      for (const path of paths) {
        const parts = path.split("/");
        while ((parts.pop(), parts.length)) {
          const path = parts.join("/") || "/";
          if (paths.has(path)) continue;
          paths.add(path), I.push(path), D.push(null);
        }
      }
      id = (_, i) => I[i];
      parentId = (_, i) => (I[i] === "/" ? "" : I[i].slice(0, I[i].lastIndexOf("/")) || "/");
      data = D;

      const root =
        id == null && parentId == null ? d3.hierarchy(data, children) : d3.stratify().id(id).parentId(parentId)(data);

      value == null ? root.count() : root.sum(rangeValue);

      const leaves = root.leaves();
      const G = group == null ? null : leaves.map((d) => group(d.data, d));
      const color = group == null ? null : d3.scaleOrdinal(G, colors);

      const L = label == null ? null : leaves.map((d) => label(d.data, d));

      // Compute the treemap layout.
      d3.treemap().tile(tile).size([width, height]).paddingInner(padding).round(round)(root);

      const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]).attr("width", width).attr("height", height);
      this.svg=svg

      const node = svg
        .selectAll("a")
        .data(leaves)
        .join("a")
        .attr("xlink:href", link == null ? null : (d, i) => link(d.data, d))
        .attr("target", link == null ? null : linkTarget)
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      const rects = node
        .append("rect")
        .attr("fill", color ? (d, i) => color(G[i]) : fill)
        .attr("class", "rect")
        .attr("width", 0)
        .attr("height", (d) => randomNum(2, 13))
        .attr("rx", rectRadius)
        .attr("ry", rectRadius);

      const rectsTransition = rects
        .transition()
        .duration(duration)
        .delay((d, i) => {
          return i * delay;
        })
        .ease(d3[ease])
        .attr("width", (d) => d.x1 - d.x0)
        .transition()
        .delay((d, i) => {
          return i * delay;
        })
        .ease(d3[ease])
        .attr("height", (d) => d.y1 - d.y0);

      rectsTransition.on("start", (e) => {
        textGoesIn();
      });

      const texts = node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${(d.x1 - d.x0) / 2},${(d.y1 - d.y0) / 2})`)
        .selectAll("tspan")
        .data((d, i) => `${L[i]}`.split(/\n/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", (d, i) => {
          return "txt" + (i + 1);
        })
        .attr("dy", (d, i) => {
          return i == 0 ? "-0.15em" : "1.15em";
        })
        .attr("font-size", (d, i) => {
          if (i == 0) {
            return "";
          } else {
            return fontSizeScale(d) + "px";
          }
        })
        .attr("opacity", 0)
        .text((d, i) => {
          if (i == 0) {
            return d;
          } else {
            return d + valueSuffix;
          }
        });

      function textGoesIn() {
        svg
          .selectAll(".txt1")
          .transition()
          .duration(600)
          .delay((d, i) => {
            return i * delay + 300;
          })
          .ease(d3.easeCubicOut)
          .attr("opacity", 1);
        svg
          .selectAll(".txt2")
          .transition()
          .duration(600)
          .delay((d, i) => {
            return i * delay + 300;
          })
          .ease(d3.easeCubicOut)
          .attr("opacity", 1);
      }

      const finalNodes = Object.assign(svg.node(), { scales: { color } });
      $("#" + this.id).html(finalNodes);
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
