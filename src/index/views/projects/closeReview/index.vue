<template>
  <div class="pages">
    <div id="particles-js"></div>

    <div class="page page1" id="page1">
      <div class="poster">
        <img
          src="https://idtcdn.oss-cn-hangzhou.aliyuncs.com/img/close_poster.png"
          alt=""
        />
      </div>
      <div class="page_title_inside1 page_title">
        <div class="subtitle1">
          <strong>收盘回顾</strong
          ><span class="in" id="title1">{{ title1 }}</span>
        </div>
      </div>
      <div class="page_title_inside2" id="page_title_inside2">
        <!-- 沪指涨0.18%， 深成指涨0.04% ，有1625股下跌 -->
        沪指{{ extra_param_1[0] }}{{ extra_param_1[1] }}%， 深成指{{
          extra_param_1[2]
        }}{{ extra_param_1[3] }}%，有{{ extra_param_1[4] }}股下跌
      </div>
      <ul class="index" v-if="indexData.length > 0">
        <li
          class="s_index"
          v-for="item in indexData"
          :key="item.id"
          :id="'li' + item.id"
        >
          <div class="left">
            <div class="index_name">{{ item.name }}</div>
            <div :class="['index_value', item.class]" :id="'number' + item.id">
              {{ item.value }}
            </div>
          </div>
          <div class="right">
            <img
              src="./images/rise.png"
              :class="'img' + item.id"
              v-if="item.class == 'rise'"
              alt=""
            />
            <img
              src="./images/drop.png"
              :class="'img' + item.id"
              v-else-if="item.class == 'drop'"
              alt=""
            />
            <div :class="['num', item.class]">
              <span :id="'change' + item.id">{{ item.change }}</span
              ><span>%</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="page page2 none" id="page2">
      <div class="page2_title_inside1 page_title">
        <div class="subtitle2">
          <strong>收盘回顾</strong
          ><span class="in" id="title2">{{ title2 }}</span>
        </div>
      </div>
      <div v-if="flareData1.length == 0">
        <div class="no_data">
          <div class="in_icon">
            <img src="./images/in_icon.png" alt="" />
          </div>
          <div class="in_tips">
            <p>今日主力都跑了</p>
            <p>资金流入板块为0</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="treeMap" ref="tree_map_container">
          <tree-map
            ref="refTreeMap1"
            id="refTreeMap1"
            customClass="c_tree_map1"
          />
        </div>
      </div>
    </div>

    <div class="page page3 none" id="page3">
      <div class="page3_title_inside1 page_title">
        <div class="subtitle3">
          <strong>收盘回顾</strong
          ><span class="out" id="title3">{{ title3 }}</span>
        </div>
      </div>
      <div v-if="flareData2.length == 0" class="no_data">
        <div class="out_icon">
          <img src="./images/out_icon.png" alt="" />
        </div>
        <div class="out_tips">
          <p>今日行情太火爆</p>
          <p>资金流出板块为0</p>
        </div>
      </div>
      <div v-else>
        <div class="treeMap" ref="tree_map_container2">
          <tree-map
            ref="refTreeMap2"
            id="refTreeMap2"
            customClass="c_tree_map2"
          />
        </div>
      </div>
    </div>

    <div class="page page4 none" id="page4">
      <div class="page4_title_inside1 page_title">
        <div class="subtitle4">
          <strong>收盘回顾</strong
          ><span class="in" id="title4">{{ title4 }}</span>
        </div>
      </div>

      <div class="barChart" ref="bar_chart_container">
        <bar-chart-horizen
          ref="refBarChart3"
          id="refBarChart3"
          customClass="c_bar1"
        >
        </bar-chart-horizen>
        <svg width="300" height="300" class="svg_gradient">
          <defs>
            <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="0">
              <stop offset="0%" stop-color="#E04911" />
              <stop offset="100%" stop-color="#EF802E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="page page5 none" id="page5">
      <div class="page5_title_inside1 page_title">
        <div class="subtitle5">
          <strong>收盘回顾</strong
          ><span class="out" id="title5">{{ title5 }}</span>
        </div>
      </div>

      <div class="barChart" ref="bar_chart_container2">
        <bar-chart-horizen
          ref="refBarChart4"
          id="refBarChart4"
          customClass="c_bar2"
        >
        </bar-chart-horizen>
        <svg width="300" height="300" class="svg_gradient">
          <defs>
            <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="0">
              <stop offset="0%" stop-color="#1AA525" />
              <stop offset="100%" stop-color="#1CB916" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="page page6 none" id="page6">
      <div class="page6_title_inside1 page_title">
        <div class="subtitle6">
          <strong>收盘回顾</strong
          ><span class="in" id="title6">{{ title6 }}</span>
        </div>
      </div>
      <div class="roseChart" ref="rose_chart_container">
        <rose-chart
          ref="refRoseChart1"
          id="refRoseChart1"
          customClass="c_rose1"
        >
        </rose-chart>
      </div>
    </div>

    <div class="page page7 none" id="page7">
      <div class="page7_title_inside1 page_title">
        <div class="subtitle7">
          <strong>收盘回顾</strong
          ><span class="in" id="title7">{{ title7 }}</span>
        </div>
      </div>
      <div class="force_chart" ref="force_chart_container">
        <force-chart
          ref="refForceChart1"
          id="refForceChart1"
          customClass="c_force1"
        >
        </force-chart>
        <svg width="300" height="300" class="svg_gradient">
          <defs>
            <radialGradient
              id="radial1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stop-color="#EF802E" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#E04911" stop-opacity="0.9" />
            </radialGradient>
          </defs>
        </svg>
        <svg width="300" height="300" class="svg_gradient">
          <defs>
            <radialGradient
              id="radial2"
              fx="50%"
              fy="50%"
              cx="50%"
              cy="50%"
              r="50%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stop-color="#4FA728" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#1F5A05" stop-opacity="0.9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="page page8 none" id="page8">
      <div class="page8_title_inside1 page_title">
        <div class="subtitle8">
          <strong>收盘回顾</strong
          ><span class="in" id="title8">{{ title8 }}</span>
        </div>
      </div>
      <div class="summary_container">
        <div v-html="summary" class="summary_txt" id="summary_txt"></div>
      </div>
      <div class="footer">
        <div class="icon_container">
          <div class="logo_tzw">
            <img src="./images/logo_tzw.png" alt="" />
          </div>
          <div class="logo_dy">
            <img src="./images/logo_dy.png" alt="" />
          </div>
        </div>
        <div class="tips">
          <p>所有展示信息仅供参考，不构成任何投资建议。</p>
          <p>投资者据此操作，风险自担。投资有风险，入市需谨慎。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
import { sleep, setRem, getUrlParams } from "@/utils/utils.js";
import treeMap from "@/components/treeMap/index.vue";
import barChartHorizen from "@/components/barChartHorizen/index.vue";
import roseChart from "@/components/roseChart/index.vue";
import forceChart from "@/components/forceChart/index.vue";
import $ from "jquery";
import FontFaceObserver from "fontfaceobserver";
import ApiServe from "@/api/api";

import "swiper/css/swiper.min.css";
import Swiper from "swiper";

export default {
  data: function () {
    return {
      model_id: null,
      model_name: "",
      ip: "",
      port: "",
      currentPage: 1, //当前page
      isLoadingVisible: true,
      isAnimating: false,
      // videoTotalTime: 0,
      audioData: [],
      audioLengthList: [],
      finalVideo: "",
      extra_param_1: [],
      finalVideoIndex: 1,
      indexData: [],
      flareData1: [],
      flareData2: [],
      market1: [],
      market2: [],
      population: [],
      forceData: [],
      summary: "",
      url_extra_params: "",
      pageLastTime: [7, 3, 3, 6, 6, 3, 3, 4], //每一页动画持续时间 由开发规定
      animationOutTime: [1, 1, 1, 1, 1, 1, 1, 0], //每一页动画消失需要时间
      //pageTime: [],
      title1: "",
      title2: "",
      title3: "",
      title4: "",
      title5: "",
      title6: "",
      title7: "",
      title8: "",
      height1: 0,
      height2: 0,
    };
  },
  watch: {
    allReady(val) {
      if (val.audioData.length > 0) {
        if (!this.ip && !this.port) {
          console.log("没获取到ip,port");
          this.page1In();
        } else {
          const params = {
            ip: this.ip,
            port: this.port,
            offset_x: this.offset_x,
            offset_y: this.offset_y,
            width: this.width,
            height: this.height,
          };
          ApiServe.recordStart(this.newIpPort, params)
            .then(({ code }) => {
              this.page1In();
            })
            .catch((err) => {
              ApiServe.recordRelease(this.newIpPort, {
                ip: this.ip,
                port: this.port,
              });
            });
        }
      }
    },
  },
  computed: {
    allReady() {
      const { dataTime, audioData } = this;
      return {
        dataTime,
        audioData,
      };
    },
    newIpPort() {
      if (this.source == "ali") {
        return "https://recordvideoali.wedengta.com";
      } else {
        return "https://recordvideo.wedengta.com";
      }
    },
    pageTime() {
      // //每一页所需要的的动画时间 消失时间 需要判断在每一页时音频时长和持续时长 取较大的那个值
      // //页面持续时长  消失动画时间; 若页面持续时长大于音频时间则直接进pageOut不需要等待
      return this.pageLastTime.map((e, i) => {
        let n = i == 0 ? 1 : i == this.pageLastTime.length - 1 ? 1 : 0; //语音只能在视频的第一秒插入所以page1时长加一秒,最后一页多留一秒
        return (
          (e > this.audioLengthList[i]
            ? e + n + 1 //1为动画出场后展示1s在出场
            : this.audioLengthList[i]) +
          this.animationOutTime[i] +
          n
        );
      });
    },
    videoTotalTime() {
      return this.pageTime.reduce(function (prev, curr, idx, arr) {
        return prev + curr;
      }, 0);
    },
  },
  components: { treeMap, barChartHorizen, roseChart, forceChart },
  methods: {
    async awaitTimeLength(a, i) {
      let t = i == this.pageTime.length - 1 ? 0 : 1;
      await sleep((this.pageTime[i] - a - t) * 1000); //1为动画出场的1s
    },

    async page1In() {
      console.log("page1 ", new Date());
      this.currentPage = 1;
      this.isAnimating = true;
      const that = this;

      // $("#page1").removeClass("none");

      this.page1Welcome = anyElement({
        targets: document.querySelector(".page_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page1TitleTxt = anyElement({
        targets: document.querySelector(".subtitle1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "fadeOut",
      });
      this.page1Rows = anyElement({
        targets: document.querySelector(".page_title_inside2"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "perspectiveScaleIn2",
        outEffect: "fadeOut",
      });

      this.page1Li1 = anyElement({
        targets: document.querySelector("#li1"),
        isSplitTxt: false,
        duration: 1000,
        delay: 200,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1Li2 = anyElement({
        targets: document.querySelector("#li2"),
        isSplitTxt: false,
        duration: 1000,
        delay: 200,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1Li3 = anyElement({
        targets: document.querySelector("#li3"),
        isSplitTxt: false,
        duration: 1000,
        delay: 200,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1Index1 = anyElement({
        targets: document.querySelector(".img1"),
        isSplitTxt: false,
        duration: 1000,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: that.indexData[0]?.class == "rise" ? "topIn" : "bottomIn",
        outEffect: "bottomOut",
      });
      this.page1Index2 = anyElement({
        targets: document.querySelector(".img2"),
        isSplitTxt: false,
        duration: 1000,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: that.indexData[1]?.class == "rise" ? "topIn" : "bottomIn",
        outEffect: "bottomOut",
      });
      this.page1Index3 = anyElement({
        targets: document.querySelector(".img3"),
        isSplitTxt: false,
        duration: 1000,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: that.indexData[2]?.class == "rise" ? "topIn" : "bottomIn",
        outEffect: "bottomOut",
      });

      await sleep(500);
      $(".poster").css({ opacity: "0", transition: "all 0.5s" });
      await sleep(500);
      this.page1Welcome.goIn.restart();
      await sleep(500);
      this.page1TitleTxt.goIn.restart();
      await sleep(500);
      this.page1Rows.goIn.restart();
      await sleep(2000);
      this.page1Li1.goIn.restart();
      this.page1Index1.goIn.restart();
      this.playNumVaryIn("#number1");
      this.playNumVaryIn("#change1");
      await sleep(500);
      this.page1Li2.goIn.restart();
      this.page1Index2.goIn.restart();
      this.playNumVaryIn("#change2");
      this.playNumVaryIn("#number2");
      await sleep(500);
      this.page1Li3.goIn.restart();
      this.page1Index3.goIn.restart();
      this.playNumVaryIn("#change3");
      this.playNumVaryIn("#number3");
      await sleep(2000); //2s后page1全部加载完成 累计需要500+500+2000+500+500+2000=6000ms

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page1Out();
    },

    async page1Out() {
      this.page1Welcome.goOut.restart();
      this.page1Rows.goOut.restart();
      this.page1List = anyElement({
        targets: document.querySelector(".index"),
        isSplitTxt: false,
        duration: 1000,
        delay: 200,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1List.goOut.restart();
      this.page1Index1.goOut.restart();
      this.page1Index2.goOut.restart();
      this.page1Index3.goOut.restart();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000); //此处为消失动画时间
      console.log("page1 ", new Date());
      $("#page1").addClass("none");
      this.page2In();
    },

    async page2In() {
      console.log("page2 ", new Date());
      this.currentPage = 2;
      $("#page2").removeClass("none");
      this.page2Title = anyElement({
        targets: document.querySelector(".page2_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page2TitleTxt = anyElement({
        targets: document.querySelector(".subtitle2 span"),
        isSplitTxt: true,
        duration: 50,
        delay: 50,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      if (this.flareData1.length == 0) {
        this.noData1 = anyElement({
          targets: document.querySelector(".page2 .no_data"),
          isSplitTxt: false,
          duration: 1000 * 2,
          delay: 1000,
          easing: "easeOutExpo",
          inEffect: "fadeIn",
          outEffect: "fadeOut",
        });
      }
      this.page2Title.goIn.restart();
      await sleep(500);
      this.page2TitleTxt.goIn.restart();
      await sleep(500);
      this.flareData1.sort(function (a, b) {
        return b.size - a.size;
      });
      this.playIn1("refTreeMap1");
      await sleep(2000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page2Out();
    },

    async page2Out() {
      this.page2Title.goOut.restart();
      if (this.flareData1.length == 0) {
        this.noData1.goOut.restart();
      } else {
        this.$refs["refTreeMap1"].playOut();
      }

      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page2 ", new Date());
      $("#page2").addClass("none");
      this.page3In();
    },

    async page3In() {
      console.log("page3 ", new Date());
      this.currentPage = 3;
      $("#page3").removeClass("none");
      this.page3Title = anyElement({
        targets: document.querySelector(".page3_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page3TitleTxt = anyElement({
        targets: document.querySelector(".subtitle3 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      if (this.flareData2.length == 0) {
        this.noData2 = anyElement({
          targets: document.querySelector(".page3 .no_data"),
          isSplitTxt: false,
          duration: 1000 * 2,
          delay: 1000,
          easing: "easeOutExpo",
          inEffect: "fadeIn",
          outEffect: "fadeOut",
        });
      }
      this.page3Title.goIn.restart();
      await sleep(500);
      this.page3TitleTxt.goIn.restart();
      await sleep(500);
      this.flareData1.sort(function (a, b) {
        return b.size - a.size;
      });
      this.playIn2("refTreeMap2");
      await sleep(2000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page3Out();
    },

    async page3Out() {
      this.page3Title.goOut.restart();
      if (this.flareData2.length == 0) {
        this.noData2.goOut.restart();
      } else {
        this.$refs["refTreeMap2"].playOut();
      }

      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page3 ", new Date());
      $("#page3").addClass("none");
      this.page4In();
    },

    async page4In() {
      console.log("page4 ", new Date());
      this.currentPage = 4;
      $("#page4").removeClass("none");
      this.page4Title = anyElement({
        targets: document.querySelector(".page4_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page4TitleTxt = anyElement({
        targets: document.querySelector(".subtitle4 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page4Title.goIn.restart();
      await sleep(500);
      this.page4TitleTxt.goIn.restart();
      await sleep(500);
      this.playIn3("refBarChart3");
      await sleep(5000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page4Out();
    },

    async page4Out() {
      this.page4Title.goOut.restart();
      this.$refs["refBarChart3"].playOut();

      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page4 ", new Date());
      $("#page4").addClass("none");
      this.page5In();
    },

    async page5In() {
      console.log("page2 ", new Date());
      this.currentPage = 5;
      $("#page5").removeClass("none");
      this.page5Title = anyElement({
        targets: document.querySelector(".page5_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page5TitleTxt = anyElement({
        targets: document.querySelector(".subtitle5 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });

      this.page5Title.goIn.restart();
      await sleep(500);
      this.page5TitleTxt.goIn.restart();
      await sleep(500);
      this.playIn4("refBarChart4");
      await sleep(5000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page5Out();
    },

    async page5Out() {
      this.page5Title.goOut.restart();
      this.$refs["refBarChart4"].playOut();

      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page5 ", new Date());
      $("#page5").addClass("none");
      this.page6In();
    },

    async page6In() {
      console.log("page6 ", new Date());
      this.currentPage = 6;
      $("#page6").removeClass("none");
      this.page6Title = anyElement({
        targets: document.querySelector(".page6_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page6TitleTxt = anyElement({
        targets: document.querySelector(".subtitle6 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page6Title.goIn.restart();
      await sleep(500);
      this.page6TitleTxt.goIn.restart();
      await sleep(500);
      this.playIn5("refRoseChart1");
      await sleep(2000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page6Out();
    },

    async page6Out() {
      this.page6Title.goOut.restart();
      this.$refs["refRoseChart1"].playOut();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page6 ", new Date());
      $("#page6").addClass("none");
      this.page7In();
    },

    async page7In() {
      this.currentPage = 7;
      console.log("page7 ", new Date());
      $("#page7").removeClass("none");
      this.page7Title = anyElement({
        targets: document.querySelector(".page7_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page7TitleTxt = anyElement({
        targets: document.querySelector(".subtitle7 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.page7Title.goIn.restart();
      await sleep(500);
      this.page7TitleTxt.goIn.restart();
      await sleep(500);
      this.playIn6("refForceChart1");
      await sleep(2000);

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      this.page7Out();
      // this.endRecord();
    },

    async page7Out() {
      this.page7Title.goOut.restart();
      this.$refs["refForceChart1"].playOut();
      await sleep(this.animationOutTime[this.currentPage - 1] * 1000);
      console.log("page7 ", new Date());
      $("#page7").addClass("none");
      this.page8In();
    },

    async page8In() {
      console.log("page8 ", new Date());
      const that = this;
      this.currentPage = 8;
      $("#page8").removeClass("none");
      this.page8Title = anyElement({
        targets: document.querySelector(".page8_title_inside1"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page8TitleTxt = anyElement({
        targets: document.querySelector(".subtitle8 span"),
        isSplitTxt: true,
        duration: 30,
        delay: 30,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "fadeOut",
      });
      this.summaryBox = anyElement({
        targets: document.querySelector(".summary_container"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });

      this.$nextTick(() => {
        that.summaryTxt = anyElement({
          targets: document.querySelector(".summary_txt"),
          isSplitTxt: true,
          duration: 10,
          delay: 10,
          easing: "easeOutExpo",
          inEffect: "fadeIn",
          outEffect: "bottomOut",
        });
      });

      this.footerBox = anyElement({
        targets: document.querySelector(".footer"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 1500,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });

      this.page8Title.goIn.restart();
      await sleep(500);
      this.page8TitleTxt.goIn.restart();
      await sleep(500);
      this.summaryBox.goIn.restart();

      this.summaryTxt.goIn.restart();
      await sleep(3000);
      this.footerBox.goIn.restart();

      await this.awaitTimeLength(
        this.pageLastTime[this.currentPage - 1],
        this.currentPage - 1
      );
      // console.log(new Date());
      this.endRecord();
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

    playIn1(refName) {
      if (this.flareData1.length == 0) {
        this.noData1.goIn.restart();
      } else {
        let width = this.$refs.tree_map_container.clientWidth;
        this.$refs[refName].TreeMap(this.flareData1, {
          value: (d) => d?.size,
          width: width,
          height: document.body.clientHeight * 0.75,
          valueSuffix: "亿",
          padding: 8,
          rectRadius: 4,
          duration: 400,
          delay: 20,
          colors: [
            "#fc6832",
            "#f06231",
            "#e45d2f",
            "#d8572e",
            "#cc522c",
            "#c04c2a",
            "#b44729",
            "#a84227",
            "#9c3d25",
            "#913822",
            "#853420",
            "#7a2f1e",
          ],
          ease: "easeCircleInOut",
        });
      }
    },

    playIn2(refName) {
      if (this.flareData1.length == 0) {
        this.noData2.goIn.restart();
      } else {
        let width = this.$refs.tree_map_container2.clientWidth;
        this.$refs[refName].TreeMap(this.flareData2, {
          value: (d) => d?.size,
          width: width,
          height: document.body.clientHeight * 0.75,
          valueSuffix: "亿",
          padding: 8,
          rectRadius: 4,
          duration: 400,
          delay: 20,
          colors: [
            "#4fa728",
            "#499c26",
            "#439023",
            "#3d8521",
            "#377a1e",
            "#31701c",
            "#2c6519",
            "#275b16",
            "#225014",
            "#1d4611",
            "#183d0e",
            "#14330b",
          ],
          ease: "easeCircleInOut",
        });
      }
    },

    playIn3(refName) {
      let width = this.$refs.bar_chart_container.clientWidth;
      this.$refs[refName].BarChart(this.market1, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: width,
        height: this.height1,
        marginLeft: 80,
        marginRight: 80,
        duration: 300,
        delay: 300,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "%",
        numberPosition: "outside",
        labelPosition: "top",
      });
    },

    playIn4(refName) {
      let width = this.$refs.bar_chart_container2.clientWidth;
      this.$refs[refName].BarChart(this.market2, {
        x: (d) => d.value,
        y: (d) => d.label,
        width: width,
        height: this.height2,
        marginLeft: 80,
        marginRight: 100,
        duration: 300,
        delay: 300,
        yPadding: 0.5,
        ease: "easeExp",
        numberSuffix: "%",
        numberPosition: "outside",
        labelPosition: "top",
        isNegativeSameDirection: true,
      });
    },

    playIn5(refName) {
      let width = this.$refs.rose_chart_container.clientWidth;
      console.log(width);
      this.$refs[refName].DonutChart(this.population, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: width,
        height: width,
        donutRatioRange: [0.1, 0.3, 0.75], //空心内圈的半径占比，最小半径占比和最大半径占比
        colors: ["#FF8735", "#FF6700", "#8E5E4E", "#FFB130", "#C3A178"],
        duration: 240,
        delay: 40,
        labelOffset: 50,
        ease: "easeBackOut",
        valueType: "absolute",
        valueSuffix: "家",
        isSort: true,
        isSameAngle: true,
      });
    },

    playIn6(refName) {
      let width = this.$refs.force_chart_container.clientWidth;
      console.log(width);
      let delta = width / 720;
      this.$refs[refName].ForceChart(this.forceData, {
        radius: (d) => d.value,
        width: width,
        height: document.body.clientHeight * 0.7,
        duration: 500,
        delay: 149,
        ease: "easeBack",
        radiusRange: [90 * delta, 110 * delta],
        circleGap: 1,
      });
    },

    initParticle() {
      particlesJS("particles-js", {
        particles: {
          number: { value: 120, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "bubble" },
            onclick: { enable: false, mode: "repulse" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3,
            },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    },

    // 获取页面数据
    async getData() {
      const that = this;
      let params = {
        model_id: this.model_id,
      };
      if (this.url_extra_params) {
        params = {
          model_id: this.model_id,
          url_extra_params: this.url_extra_params,
        };
      }
      await ApiServe.getData({ model_id: this.model_id })
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data;
            console.log(data);
            //page1
            that.chart_data_1 = data.chart_data_1;
            that.title1 = data.chart_data_1[0].model_chart_name;
            that.extra_param_1 = data.extra_param_1;
            let len = that.chart_data_1[0].data.secuabbr.length;
            for (let i = 0; i < len; i++) {
              let obj = {
                id: i + 1,
                name: that.chart_data_1[0].data.secuabbr[i],
                value: that.chart_data_1[0].data.x[i],
                change: that.chart_data_1[0].data.y[i],
                class: that.chart_data_1[0].data.y[i] > 0 ? "rise" : "drop",
              };
              that.indexData[i] = obj;
            }
            // console.log("page1");

            //page2
            that.chart_data_2 = data.chart_data_2;
            that.title2 = data.chart_data_2[0].model_chart_name;
            for (
              let i = 0;
              i < that.chart_data_2[0].data.industry_name?.length;
              i++
            ) {
              let obj = {
                name: "flare." + that.chart_data_2[0].data.industry_name[i],
                size: that.chart_data_2[0].data.superin[i] * 1,
              };
              // console.log(obj);
              that.flareData1[i] = obj;
            }
            // console.log("page2");

            //page3
            that.chart_data_3 = data.chart_data_3;
            that.title3 = data.chart_data_3[0].model_chart_name;
            for (
              let i = 0;
              i < that.chart_data_3[0].data.industry_name?.length;
              i++
            ) {
              let obj = {
                name: "flare." + that.chart_data_3[0].data.industry_name[i],
                size: that.chart_data_3[0].data.superin[i] * 1,
              };
              // console.log(obj);
              that.flareData2[i] = obj;
            }
            // console.log("page3");

            // page4
            that.chart_data_4 = data.chart_data_4;
            that.title4 = data.chart_data_4[0].model_chart_name;
            for (
              let i = 0;
              i < that.chart_data_4[0].data.ssecname?.length;
              i++
            ) {
              let obj = {
                label: that.chart_data_4[0].data.ssecname[i],
                value: that.chart_data_4[0].data.chg[i] * 1,
              };
              if (i < 5) {
                that.market1[i] = obj;
              }
            }
            this.height1 = that.market1.length * 151;
            // console.log("page4");

            //page5
            that.chart_data_5 = data.chart_data_5;
            that.title5 = data.chart_data_5[0].model_chart_name;
            for (
              let i = 0;
              i < that.chart_data_5[0].data.ssecname?.length;
              i++
            ) {
              let obj = {
                label: that.chart_data_5[0].data.ssecname[i],
                value: that.chart_data_5[0].data.chg[i] * 1,
              };
              if (i < 5 && that.chart_data_5[0].data.chg[i] < 0) {
                that.market2[i] = obj;
              }
            }
            this.height2 = that.market2.length * 151;
            // console.log("page5");

            // page6;
            that.chart_data_6 = data.chart_data_6;
            that.title6 = data.chart_data_6[0].model_chart_name;
            let arr = Object.entries(that.chart_data_6[0].data);
            for (const [key, value] of arr) {
              let obj = {};
              switch (key) {
                case "pz_num":
                  obj = { name: "上涨家数", value: value[0] };
                  break;
                case "pp_num":
                  obj = { name: "平盘家数", value: value[0] };
                  break;
                case "pd_num":
                  obj = { name: "下跌家数", value: value[0] };
                  break;
                case "ps_num":
                  obj = { name: "涨停家数", value: value[0] };
                  break;
                case "pdd_num":
                  obj = { name: "跌停家数", value: value[0] };
                  break;
                default:
                  obj = {};
                  break;
              }
              if (key != "trade_date") {
                that.population.push(obj);
              }
            }
            // console.log("page6");

            //page7
            that.chart_data_7 = data.chart_data_7;
            that.title7 = data.chart_data_7[0].model_chart_name;
            let max = 34,
              min = 26; //半径的最大值和最小值
            for (
              let i = 0;
              i < that.chart_data_7[0].data.stock_name.length;
              i++
            ) {
              let item = that.chart_data_7[0].data;
              let obj = {
                value: item.superin[i] * 1,
                title: item.stock_name[i],
                subTitle: item.superin[i] + "亿",
                class: item.superin[i] > 0 ? "in" : "out",
              };
              that.forceData[i] = obj;
            }
            // console.log("page7");

            //page8
            that.chart_data_8 = data.chart_data_8;
            that.title8 = data.chart_data_8[0].model_chart_name;
            this.summary = that.chart_data_8[0].data.hqhg[0].replaceAll("\n","</br>");
            if (this.ip) {
              ApiServe.releasePcPort({ ip: this.ip, port: this.port });
            }
          }
        })
        .catch((err) => {
          if (this.ip) {
            ApiServe.releasePcPort({ ip: this.ip, port: this.port });
          }
        });
    },

    //获取音频
    async getAudio() {
      let params = {
        model_id: this.model_id,
      };
      if (this.url_extra_params) {
        params = {
          model_id: this.model_id,
          url_extra_params: this.url_extra_params,
        };
      }
      await ApiServe.getVideoData(params)
        .then(({ data: { data, code } }) => {
          console.log(data, code);
          if (code == 200) {
            this.audioData = data;
            this.audioLengthList = this.audioData.map(
              (item) => item.scene_duration
            );
            if (this.ip && this.audioData.length == 0) {
              ApiServe.recordRelease({ ip: this.ip, port: this.port });
            }
          }
        })
        .catch((err) => {
          if (this.ip) {
            ApiServe.releasePcPort({ ip: this.ip, port: this.port });
          }
        });
    },

    endRecord() {
      let arr = [];
      for (let i = 0; i < this.pageTime.length; i++) {
        if (i == 0) {
          arr[i] = 1;
        } else {
          arr[i] = this.pageTime[i - 1] + arr[i - 1];
        }
      }
      let audiosOrderList = this.audioData.map((item, index) => {
        return {
          audioLink: item.audio_link,
          timeIndex: arr[index],
          audioLen: item.audio_length,
        };
      });
      const data = {
        id: this.id,
        model_id: this.model_id,
        videoTotalTime: this.videoTotalTime,
        videmBgm:
          "https://idtcdn.oss-cn-hangzhou.aliyuncs.com/Cube/VideoBgm/bg.mp3",
        audiosOrderList: audiosOrderList,
      };
      console.log("arr", arr);
      console.log("audiosOrderList", audiosOrderList);
      console.log("pageTime", this.pageTime);
      console.log("pageLastTime", this.pageLastTime);
      console.log("audioLengthList", this.audioLengthList);
      console.log("videoTotalTime", this.videoTotalTime);
      ApiServe.recordStop(this.newIpPort, {
        ip: this.ip,
        port: this.port,
      })
        .then(() => {
          console.log("page8 ", new Date());
          ApiServe.combineAudiosWithBgm(
            this.newIpPort,
            this.ip,
            this.port,
            data
          )
            .then(() => {
              ApiServe.recordRelease(this.newIpPort, {
                ip: this.ip,
                port: this.port,
              });
            })
            .catch(() => {
              ApiServe.recordRelease(this.newIpPort, {
                ip: this.ip,
                port: this.port,
              });
            });
        })
        .catch(() => {
          ApiServe.recordRelease(this.newIpPort, {
            ip: this.ip,
            port: this.port,
          });
        });
    },
  },

  async mounted() {
    this.model_id = 61;
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

    this.initParticle();

    //字体加载比较慢，等它加载完
    await this.fontLoad();

    await this.getData();

    await this.getAudio();

    // this.page1In();
  },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
