<template>
  <div class="pages">
    <div class="page page1" id="page1">
      <div class="title">北上资金</div>
      <div class="time">{{ date }}</div>
      <div class="float_point float_point1">
        <img src="./imgs/point1.png" alt="" />
      </div>
      <div class="float_point float_point2">
        <img src="./imgs/point2.png" alt="" />
      </div>
      <div class="float_point float_point3">
        <img src="./imgs/point3.png" alt="" />
      </div>
      <div class="footer">
        <div class="icon_container">
          <div class="logo_tzw">
            <img src="./imgs/logo_tzw.png" alt="" />
          </div>
          <div class="logo_dy">
            <img src="./imgs/logo_dy.png" alt="" />
          </div>
        </div>
        <div class="tips">
          <p>所有展示信息仅供参考，不构成任何投资建议。</p>
          <p>投资者据此操作，风险自担。投资有风险，入市需谨慎。</p>
        </div>
      </div>
    </div>

    <div class="page page2 none" id="page2">
      <div class="page_title page2_title" id="page2_title">北向资金</div>
      <div class="chart_box">
        <div class="chart_tab">
          <div>成交净买卖额</div>
          <div>今日</div>
        </div>
        <div class="chart_line">
          <div class="sgt"><span>深股通</span></div>
          <div class="hgt"><span>沪股通</span></div>
        </div>
        <div class="line_chart_container" ref="line_chart_container">
          <line-chart
            ref="refLineChart"
            id="refLineChart"
            customClass="c_line1"
          />
        </div>
      </div>
    </div>

    <div class="page page3 none" id="page3">
      <div class="page_title page3_title" id="page3_title">北向资金</div>
      <div class="chart_box">
        <div class="chart_tab">
          <div>成交净买卖额</div>
          <div>近20日</div>
        </div>
        <div class="chart_line">
          <div class="sgt"><span>深股通</span></div>
          <div class="hgt"><span>沪股通</span></div>
        </div>
        <div class="bar_double_chart_contain" ref="bar_double_chart_container">
          <bar-double-chart
            ref="refBarDoubleChart"
            id="refBarDoubleChart"
            customClass="c_bar1"
          />
        </div>
      </div>
      <ul class="funds_in">
        <li>
          <p class="funds_in_title">20日净流入</p>
          <p class="funds_in_num"><span id="num1">3.25</span> 亿</p>
        </li>
        <li>
          <p class="funds_in_title">5日净流入</p>
          <p class="funds_in_num"><span id="num2">-3.25</span>亿</p>
        </li>
        <li>
          <p class="funds_in_title">3日净流入</p>
          <p class="funds_in_num"><span id="num3">3.25</span>亿</p>
        </li>
      </ul>
    </div>

    <div class="page page4 none" id="page4">
      <div class="page_title page4_title">
        北向资金 <span id="page4_subtitle">十大活跃榜</span>
      </div>
      <div class="chart_box chart_box1">
        <div class="chart_tab">
          <div>沪股通</div>
          <div>净流入额</div>
        </div>
        <div class="bar_chart1_contain" ref="bar_chart1_container">
          <bar-chart-horizen
            ref="refBarChart1Extra"
            id="refBarChart1Extra"
            customClass="c_bar2"
          ></bar-chart-horizen>
          <svg width="300" height="300" class="svg_gradient">
            <defs>
              <linearGradient
                id="color1"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stop-color="#FF5517" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#FF8B17" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
          <svg width="300" height="300" class="svg_gradient">
            <defs>
              <linearGradient
                id="color2"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stop-color="#55E017" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#3E9B14" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>

    <div class="page page5 none" id="page5">
      <div class="page_title page5_title">
        北向资金 <span id="page5_subtitle">十大活跃榜</span>
      </div>
      <div class="chart_box chart_box2">
        <div class="chart_tab">
          <div>深股通</div>
          <div>净流入额</div>
        </div>
        <div class="bar_chart2_contain" ref="bar_chart2_container">
          <bar-chart-horizen
            ref="refBarChart2Extra"
            id="refBarChart2Extra"
            customClass="c_bar3"
          ></bar-chart-horizen>
          <svg width="300" height="300" class="svg_gradient">
            <defs>
              <linearGradient
                id="color3"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stop-color="#FF5517" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#FF8B17" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
          <svg width="300" height="300" class="svg_gradient">
            <defs>
              <linearGradient
                id="color4"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stop-color="#55E017" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#3E9B14" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { anyElement } from "@/components/anyElement.js";
import { anyElementV1 } from "@/components/anyElement_1.js";
import { sleep, setRem, getUrlParams } from "@/utils/utils.js";
import lineChart from "@/components/lineChart/index.vue";
import barDoubleChart from "@/components/barDoubleChart/index.vue";
import barChartHorizen from "@/components/barChartHorizen/index_v1.0.vue";
import $ from "jquery";
import FontFaceObserver from "fontfaceobserver";
import ApiServe from "@/api/api";
export default {
  data() {
    return {
      date: null,
      currentPage: 1,
      lineData: [
        { label: "09:30", value1: 8.17, value2: 2.17 },
        { label: "2021.12.02", value1: 6.17, value2: 3.17 },
        { label: "2021.12.03", value1: 13.17, value2: 4.17 },
        { label: "2021.12.04", value1: 12.17, value2: 6.17 },
        { label: "2021.12.05", value1: 5.17, value2: 5.17 },
        { label: "2021.12.06", value1: 6.47, value2: 4.17 },
        { label: "2021.12.07", value1: 9.17, value2: 2.17 },
        { label: "2021.12.08", value1: 7.17, value2: 3.17 },
        { label: "2021.12.09", value1: 8.17, value2: 5.17 },
        { label: "2021.12.10", value1: 34.7, value2: 6.17 },
        { label: "2021.12.11", value1: 8.7, value2: 4.17 },
        { label: "2021.12.12", value1: 6.7, value2: 8.17 },
        { label: "2021.12.13", value1: 14.7, value2: 5.17 },
        { label: "2021.12.14", value1: 9.7, value2: 6.17 },
        { label: "15:00", value1: 10.9, value2: 7.2 },
      ],
      data3: [
        { label: "1", value1: -5, value2: 22, suffix: "%" },
        { label: "2", value1: 10, value2: 26, suffix: "万" },
        { label: "3", value1: -23, value2: 38, suffix: "吨" },
        { label: "4", value1: 17, value2: 26, suffix: "斤" },
        { label: "5", value1: 10, value2: 26 },
        { label: "6", value1: 15, value2: 23 },
        { label: "7", value1: -17, value2: 26, suffix: "斤" },
        { label: "8", value1: 10, value2: 26 },
        { label: "9", value1: 15, value2: 23 },
        { label: "10", value1: 17, value2: 26, suffix: "斤" },
        { label: "11", value1: 10, value2: 26 },
        { label: "12", value1: -15, value2: 23 },
        { label: "13", value1: -10, value2: 26 },
        { label: "14", value1: 15, value2: 23 },
        { label: "15", value1: -17, value2: 26, suffix: "斤" },
        { label: "16", value1: 10, value2: 26 },
        { label: "17", value1: 15, value2: 23 },
        { label: "18", value1: 17, value2: 26, suffix: "斤" },
        { label: "19", value1: -10, value2: 26 },
        { label: "20", value1: 15, value2: 23 },
      ],
      market3: [
        { label: "电器设备", value: 6 },
        { label: "采掘", value: -5.56 },
        { label: "化工", value: 4.26 },
        { label: "有色金属", value: 3.26 },
        { label: "共用事业", value: -3.19 },
        { label: "通信", value: 3.06 },
        { label: "休闲服务", value: 2.6 },
        { label: "医药生物", value: -2.26 },
        { label: "视频饮料", value: 1.26 },
        { label: "纺织服装", value: -10.16 },
      ],
      animationOutTime: [1, 1, 1, 1, 0],
    };
  },
  components: { lineChart, barDoubleChart, barChartHorizen },
  methods: {
    getTime() {
      const date = new Date();
      const y = date.getFullYear();
      const m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.date = y + "." + m + "." + d;
    },
    async fontLoad() {
      console.log("加载字体");
      const harmonyMidium = new FontFaceObserver("harmonyMidium");
      const harmonyBold = new FontFaceObserver("harmonyBold");
      await Promise.all([
        harmonyMidium.load(null, 30 * 1000),
        harmonyBold.load(null, 30 * 1000),
      ]);
    },
    playIn1(refName) {
      let width = this.$refs.line_chart_container.clientWidth;
      this.$refs[refName].LineChart(this.lineData, {
        label: (d) => d.label,
        width: width,
        height: 420,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: 40,
        marginRight: 90,
        duration: 2000,
        delay: 40,
        ease: "easeCubicInOut",
        curveName: "curveLinear",
        xTickNumber: 5,
        yTickNumber: 6,
        lineColors: ["#3966FF", "#FFAF39"],
        lineWidth: [3, 3],
        isShowYAxis: false,
        numberSuffix: ["亿", "亿"],
      });
    },
    playIn2(refName) {
      let width = this.$refs.bar_double_chart_container.clientWidth;
      this.$refs[refName].BarChart(this.data3, {
        x: (d) => d.label,
        width: width,
        height: 500,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40,
        zPadding: 0.05,
        duration: 400,
        delay: 100,
        yPadding: 0.95,
        ease: "easeBack",
        xTickNumber: 6,
        yTickNumber: 10,
        colors: ["#3966FF", "#FFAF39"],
        isShowText: false,
      });
    },
    playIn3(refName) {
      let width = this.$refs.bar_chart1_container.clientWidth;
      this.$refs[refName].BarChart(this.market3, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: width,
        height: 830,
        marginLeft: 120,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "亿",
        numberPosition: "outside",
        labelPosition: "top",
        isShowRadius: true,
        barRadius: 4,
      });
    },
    playIn4(refName) {
      let width = this.$refs.bar_chart2_container.clientWidth;
      this.$refs[refName].BarChart(this.market3, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: width,
        height: 830,
        marginLeft: 120,
        marginRight: 80,
        duration: 400,
        delay: 400,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "亿",
        numberPosition: "outside",
        labelPosition: "top",
        isShowRadius: true,
        barRadius: 4,
      });
    },
    playNumVaryIn(id) {
      this.number = anyElement({
        targets: document.querySelector(id),
        duration: 1200,
        toFixed: 2,
        easing: "easeOutQuint",
        inEffect: "numVaryIn",
        outEffect: "fadeOut",
      });
      this.number.goIn.restart();
    },
    async page1Out() {
      this.page1Title = anyElementV1({
        targets: document.querySelector(".page1 .title"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "leftOut",
      });
      this.page1Time = anyElementV1({
        targets: document.querySelector(".page1 .time"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "rightOut",
      });
      this.page1Point = anyElementV1({
        targets: document.querySelectorAll(".page1 .float_point"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page1Footer = anyElementV1({
        targets: document.querySelector(".page1 .footer"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      await sleep(1000);
      this.page1Title.runOut();
      this.page1Time.runOut();
      this.page1Point.runOut();
      this.page1Footer.runOut();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000); //此处为消失动画时间
      $("#page1").addClass("none");
      this.page2In();
    },
    async page2In() {
      $("#page2").removeClass("none");
      this.currentPage = 2;
      const that = this;
      this.page2Title = anyElement({
        targets: document.querySelector(".page2_title"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page2Chart1 = anyElement({
        targets: document.querySelector(".page2 .chart_tab"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page2Chart2 = anyElement({
        targets: document.querySelector(".page2 .chart_line"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page2Title.goIn.restart();
      await sleep(500);
      this.page2Chart1.goIn.restart();
      this.page2Chart2.goIn.restart();
      await sleep(500);
      this.playIn1("refLineChart");
      await sleep(5000);

      this.page2Out();
    },
    async page2Out() {
      this.page2Title.goOut.restart();
      this.page2Chart1.goOut.restart();
      this.page2Chart2.goOut.restart();
      this.$refs["refLineChart"].playOut();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      $("#page2").addClass("none");
      this.page3In();
    },
    async page3In() {
      $("#page3").removeClass("none");
      this.currentPage = 3;
      const that = this;
      this.page3Title = anyElement({
        targets: document.querySelector(".page3_title"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page3Chart1 = anyElement({
        targets: document.querySelector(".page3 .chart_tab"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page3Chart2 = anyElement({
        targets: document.querySelector(".page3 .chart_line"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page3Funds = anyElement({
        targets: document.querySelector(".page3 .funds_in"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page3Title.goIn.restart();
      await sleep(500);
      this.page3Chart1.goIn.restart();
      this.page3Chart2.goIn.restart();
      await sleep(500);
      this.playIn2("refBarDoubleChart");
      await sleep(5000);
      this.page3Funds.goIn.restart();
      this.playNumVaryIn("#num1");
      this.playNumVaryIn("#num2");
      this.playNumVaryIn("#num3");
      await sleep(2000);
      this.page3Out();
    },
    async page3Out() {
      this.page3Title.goOut.restart();
      this.page3Chart1.goOut.restart();
      this.page3Chart2.goOut.restart();
      this.$refs["refBarDoubleChart"].playOut();
      this.page3Funds.goOut.restart();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      $("#page3").addClass("none");
      this.page4In();
    },
    async page4In() {
      $("#page4").removeClass("none");
      this.currentPage = 4;
      const that = this;
      this.page4Title = anyElement({
        targets: document.querySelector(".page4_title"),
        isSplitTxt: false,
        duration: 400,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page4Subtitle = anyElement({
        targets: document.querySelector(".page4_title span"),
        isSplitTxt: true,
        duration: 20,
        delay: 20,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page4Chart1 = anyElement({
        targets: document.querySelector(".page4 .chart_tab"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "fadeOut",
      });

      this.page4Title.goIn.restart();
      await sleep(400);
      this.page4Subtitle.goIn.restart();
      await sleep(100);
      this.page4Chart1.goIn.restart();
      await sleep(500);
      this.playIn3("refBarChart1Extra");
      await sleep(5000);

      this.page4Out();
    },
    async page4Out() {
      this.page4Title.goOut.restart();
      this.page4Subtitle.goOut.restart();
      this.page4Chart1.goOut.restart();
      this.$refs["refBarChart1Extra"].playOut();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      $("#page4").addClass("none");
      this.page5In();
    },
    async page5In() {
      $("#page5").removeClass("none");
      this.currentPage = 5;
      const that = this;
      this.page5Title = anyElement({
        targets: document.querySelector(".page5_title"),
        isSplitTxt: false,
        duration: 400,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page5Subtitle = anyElement({
        targets: document.querySelector(".page5_title span"),
        isSplitTxt: true,
        duration: 20,
        delay: 20,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page5Chart1 = anyElement({
        targets: document.querySelector(".page5 .chart_tab"),
        isSplitTxt: false,
        duration: 1000,
        delay: 1000,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "fadeOut",
      });

      this.page5Title.goIn.restart();
      await sleep(400);
      this.page5Subtitle.goIn.restart();
      await sleep(100);
      this.page5Chart1.goIn.restart();
      await sleep(500);
      this.playIn4("refBarChart2Extra");
      await sleep(5000);
    },
  },
  async mounted() {
    this.model_id = 62;
    this.id = getUrlParams().id || null;
    this.model_name = getUrlParams().model_name || null;
    this.model_category = getUrlParams().model_category || null;
    this.url_extra_params = getUrlParams().url_extra_params || null;
    this.ip = getUrlParams().ip || null;
    this.port = getUrlParams().port || null;
    this.offset_x = getUrlParams().offset_x || null;
    this.offset_y = getUrlParams().offset_y || null;
    this.width = getUrlParams().width || null;
    this.height = getUrlParams().height || null;
    this.source = getUrlParams().source || null;
    //每个项目都可以独立设置
    setRem(720);

    this.getTime();

    //字体加载比较慢，等它加载完
    await this.fontLoad();
    
    this.page1Out();
  },
};
</script>

<style lang="less" scoped>
@import "index.less";
</style>