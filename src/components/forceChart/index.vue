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
    };
  },
  methods: {
    async playOut() {
      this.svg.selectAll(`.circle`).attr("opacity", "1");
      this.svg
        .selectAll(`.circle`)
        .transition()
        .duration(400)
        .delay((d, i) => i * 10)
        .ease(d3.easeBackIn)
        .attr("r", (d) => d.r * randomNum(1, 8) * 0.2)
        .attr("opacity", "0")
        .attr("transform", (d) => `translate(0,-${randomNum(10, 200)})`);

      this.svg.selectAll(`.title`).attr("opacity", "1");
      this.svg
        .selectAll(`.title`)
        .transition()
        .duration(200)
        .delay((d, i) => i * 10)
        .ease(d3.easeBackIn)
        .attr("opacity", 0);

      this.svg.selectAll(`.sub_title`).attr("opacity", "1");
      this.svg
        .selectAll(`.sub_title`)
        .transition()
        .duration(200)
        .delay((d, i) => i * 10)
        .ease(d3.easeBackIn)
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
    async ForceChart(
      data,
      {
        radius = (d) => d, //横向的是数值
        radiusRange = [20, 40],
        width = 640, // the outer width of the chart, in pixels
        height = 400, // the outer height of the chart, in pixels
        duration = 400, //动画持续时长
        delay = 40, //元素之间间隔时长
        ease = "easeBack", //元素之间间隔时长
        circleGap = 1,
      } = {}
    ) {
      // 自己随便造的数据
      // const n = 30;
      // const color = d3.scaleSequential(d3.interpolateTurbo).domain([0, n]);
      // const nodes = Array.from({ length: n }, (_, i) => ({
      //   r: randomNum(30, 50),
      //   color: color(i),
      // }));

      //如果delay为数组，则重新整理一下数组，把相对间隔值变成绝对值
      if (typeof delay == "object") {
        let tempDelayArr = [];
        delay.map((item, index) => {
          tempDelayArr.push(delay.getNumArrayTotal(index + 1));
        });
        delay = tempDelayArr.concat([]);
      }

      const valueArray = d3.map(data, radius);
      const dataDomain = [d3.min(valueArray), d3.max(valueArray)];
      const dataScale = d3.scaleLinear(dataDomain, radiusRange);
      const nodes = data.map((item) => {
        item.r = dataScale(item.value);
        return item;
      });
      console.log("nodes", nodes);

      // const titleArray = d3.map(data, (d) => d.title);

      // the default phyllotaxis arrangement is centered on <0,0> with a distance between nodes of ~10 pixels
      // we will scale & translate it to fit the canvas
      const scale = 1.7;
      const center = [width / 2, height / 2];
      const rescale = isNaN(nodes[0].x);

      const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
      this.svg = svg;

      //node为一个组
      const node = svg.append("g").selectAll("circle").data(nodes).join("g");

      //组里新建圆圈
      node
        .append("circle")
        .attr("class", "circle")
        .attr("r", 0)
        .attr("cy", randomNum(80, 180));

      //组里新建text
      const titles = node
        .append("text")
        .attr("class", "title")
        .attr("style", "user-select:none")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .text((d) => d.title);
      if (nodes[0].subTitle) {
        titles.attr("dy", "-0.35em");
        node
          .append("text")
          .attr("class", "sub_title")
          .attr("style", "user-select:none")
          .attr("dy", "1.1em")
          .attr("text-anchor", "middle")
          .attr("opacity", 0)
          .text((d) => d.subTitle);
      }

      const simulation = d3
        .forceSimulation(nodes)
        .on("tick", () => {
          node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
        })
        .force(
          "collide",
          d3.forceCollide().radius((d) => circleGap + d.r)
        )
        .force("y", d3.forceY(center[1]).strength(0.001))
        .force("x", d3.forceX(center[0]).strength(0.001))
        .stop();

      // once the arrangement is initialized, scale and translate it
      if (rescale) {
        for (const node of nodes) {
          node.x = node.x * scale + center[0];
          node.y = node.y * scale + center[1];
        }
      }

      $("#" + this.id).html(svg.node());

      //出场动画，需要等待前边的事情全部做完才能开始
      simulation.restart();
      svg
        .selectAll(`.circle`)
        .transition()
        .duration(duration)
        .delay((d, i) => (typeof delay == "object" ? delay[i] : i * delay))
        .ease(d3[ease + "Out"])
        .attr("r", (d) => d.r)
        .attr("cy", 0)
        .attr("class", (d) => (!d.class ? "circle" : d.class + " circle"));

      await sleep(duration * 0.5);

      svg
        .selectAll(`.title`)
        .transition()
        .duration(duration)
        .delay((d, i) => (typeof delay == "object" ? delay[i] : i * delay))
        .ease(d3[ease + "Out"])
        .attr("opacity", 1);

      svg
        .selectAll(`.sub_title`)
        .transition()
        .duration(duration + 500)
        .delay((d, i) => (typeof delay == "object" ? delay[i] : i * delay))
        .ease(d3[ease + "Out"])
        .attr("opacity", 1);
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
