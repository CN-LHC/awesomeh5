<template>
  <div class="pages">
    <div id="particles-js"></div>

    <div class="model_macheal hidden" id="modelMacheal">
      <load-model
        ref="refMacheal"
        :width="480"
        :height="600"
        :scale="5.3"
        modelName="juese1"
        :directionalLight="0xffffff"
        :originPositionY="Math.PI / 2"
      />
    </div>
    <div class="model_david hidden" id="modelDavid">
      <load-model
        ref="refDavid"
        :width="480"
        :height="600"
        :scale="5.3"
        modelName="juese2"
        :directionalLight="0x888888"
        :originPositionY="(Math.PI / 2) * -1"
      />
    </div>

    <div class="model_macheal2 hidden" id="modelMacheal2">
      <load-model
        ref="refMacheal2"
        :width="480"
        :height="600"
        :scale="5.3"
        modelName="juese1"
        :directionalLight="0xffffff"
        :originPositionY="0"
      />
    </div>

    <div class="model_david2 hidden" id="modelDavid2">
      <load-model
        ref="refDavid2"
        :width="480"
        :height="600"
        :scale="5.3"
        modelName="juese2"
        :directionalLight="0x888888"
        :originPositionY="0"
      />
    </div>

    <div class="marquee market_marquee hidden" id="marketMarquee">
      <div class="marquee-inner">
        <div class="marquee-content">
          <div
            :class="`single_market ${item.className}`"
            v-for="(item, index) in marketList"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <b>{{ item.fNow }}</b>
            <b>{{ item.sRate }}</b>
          </div>
        </div>
      </div>
    </div>

    <div class="page page1 hidden" id="page1">
      <div :class="`welcome size_${welcomeSize}`" id="welcome">{{ welcomeTitle }}</div>
      <div class="footer">
        <div class="f_row f_row1">灯塔财经</div>
        <div class="f_row f_row2">中国·武汉</div>
      </div>
    </div>

    <div class="page page2 hidden" id="page2">
      <div class="title" id="page2Title">灯塔财经发展历程</div>

      <div class="swiper-container history_swiper hidden">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide0">
            <div class="year_title" id="year_title0">2015</div>
            <ul class="year_events">
              <li class="hidden">2015.07灯塔财经注册成立</li>
              <li class="hidden">2015.11股票灯塔APP上线</li>
            </ul>
          </div>
          <div class="swiper-slide slide1">
            <div class="year_title" id="year_title1">2016</div>
            <ul class="year_events">
              <li class="hidden">APP用户突破100w</li>
              <li class="hidden">灯塔表哥上线</li>
              <li class="hidden">TV版上线</li>
              <li class="hidden">Windows版上线</li>
            </ul>
          </div>
          <div class="swiper-slide slide2">
            <div class="year_title" id="year_title2">2017</div>
            <ul class="year_events">
              <li class="hidden">用户突破300w</li>
              <li class="hidden">获得A轮融资5500w</li>
              <li class="hidden">与各大券商开展功能合作</li>
            </ul>
          </div>
          <div class="swiper-slide slide3">
            <div class="year_title" id="year_title3">2018</div>
            <ul class="year_events">
              <li class="hidden">用户突破400w</li>
              <li class="hidden">智能工具超过20个</li>
              <li class="hidden">合作机构超过30家</li>
              <li class="hidden">董蜜业务上线</li>
            </ul>
          </div>
          <div class="swiper-slide slide4">
            <div class="year_title" id="year_title4">2019</div>
            <ul class="year_events">
              <li class="hidden">智能工具达到30+</li>
              <li class="hidden">合作机构超过50+</li>
            </ul>
          </div>
          <div class="swiper-slide slide5 slide_macheal">
            <div class="year_title" id="year_title5">2020</div>
            <ul class="year_events">
              <li class="hidden">新冠疫情冲击Machele带头支援一线 积极复工</li>
              <li class="hidden">降本增效开发弹指文和企微牛运营工具</li>
            </ul>
          </div>
          <div class="swiper-slide slide6">
            <div class="year_title" id="year_title6">2021</div>
            <ul class="year_events">
              <li class="hidden">智能工具</li>
              <li class="hidden">一键分发</li>
              <li class="hidden">爆文推广</li>
              <li class="hidden">视频模版</li>
              <li class="hidden">灯影互动</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="page page3 hidden" id="page3">
      <div class="title" id="page3Title">灯塔财经产品展示介绍</div>

      <div class="swiper-container product_swiper hidden">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide0">
            <div class="product_box"><span></span></div>
            <div class="product_name">2015-2021</div>
          </div>
          <div class="swiper-slide slide0">
            <div class="product_box"><span></span></div>
            <div class="product_name">2020-2021</div>
          </div>
          <div class="swiper-slide slide0">
            <div class="product_box"><span></span></div>
            <div class="product_name">2020-2021</div>
          </div>
          <div class="swiper-slide slide0">
            <div class="product_box"><span></span></div>
            <div class="product_name">2021</div>
          </div>
          <div class="swiper-slide slide0">
            <div class="product_box"><span></span></div>
            <div class="product_name">2018-2021</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page page4 hidden" id="page4">
      <div class="title">
        <strong id="page4Title">合作伙伴</strong>
        <span id="page4SubTitle">涵盖了证券、银行、媒体、旅游、医疗等行业超过100家</span>
      </div>

      <div class="marquee hidden" id="myMarquee1">
        <div class="marquee-inner">
          <div class="marquee-content">
            <span class="logo_box box1"></span>
            <span class="logo_box box2"></span>
            <span class="logo_box box3"></span>
            <span class="logo_box box4"></span>
            <span class="logo_box box5"></span>
            <span class="logo_box box6"></span>
            <span class="logo_box box7"></span>
          </div>
        </div>
      </div>

      <div class="marquee hidden" id="myMarquee2">
        <div class="marquee-inner">
          <div class="marquee-content">
            <span class="logo_box box8"></span>
            <span class="logo_box box9"></span>
            <span class="logo_box box10"></span>
            <span class="logo_box box11"></span>
            <span class="logo_box box12"></span>
            <span class="logo_box box13"></span>
            <span class="logo_box box14"></span>
            <span class="logo_box box15"></span>
            <span class="logo_box box16"></span>
            <span class="logo_box box17"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="page page5 hidden" id="page5">
      <div class="end_content">
        <div class="end_title" id="endTitle">感谢您的观看</div>
        <div class="end_sub_title" id="endSubTitle">By Dengying <br />2022</div>
        <div class="end_logo" id="endLogo"></div>
      </div>
    </div>

    <div class="video_holder hidden" id="videoHolder">
      <div class="v_col1" v-if="productSwiperHandle.activeIndex == 0">
        <div class="v_title">股票灯塔</div>
        <div class="v_desc">2015-2021</div>
      </div>
      <div class="v_col1" v-if="productSwiperHandle.activeIndex == 1">
        <div class="v_title">弹指文</div>
        <div class="v_desc">2020-2021</div>
      </div>
      <div class="v_col1" v-if="productSwiperHandle.activeIndex == 2">
        <div class="v_title">企微牛</div>
        <div class="v_desc">2020-2021</div>
      </div>
      <div class="v_col1" v-if="productSwiperHandle.activeIndex == 3">
        <div class="v_title">灯影</div>
        <div class="v_desc">2021</div>
      </div>
      <div class="v_col1" v-if="productSwiperHandle.activeIndex == 4">
        <div class="v_title">董蜜</div>
        <div class="v_desc">2018-2021</div>
      </div>
      <div class="v_col2">
        <video :src="finalVideo" controls autoplay id="videoPlayer"></video>
      </div>
    </div>
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
import LoadModel from "@/components/models/loadModel.vue";
import axios from "axios";
import { sleep, setRem, randomNum, getRateByData } from "@/utils/utils.js";
import anime from "animejs/lib/anime.es.js";
import $ from "jquery";
import FontFaceObserver from "fontfaceobserver";
import InfiniteMarquee from "infinite-marquee";

import "swiper/css/swiper.min.css";
import Swiper from "swiper";

export default {
  data: function () {
    return {
      welcomeTitle: "欢迎银河证券各位领导莅临指导",
      welcomeSize: "xl", // s,m,l,xl
      currentPage: 1, //当前page
      marketList: [], //当前市场行情
      isLoadingVisible: true,
      isAnimating: false,
      finalVideo: "",
      isVideoPlaying: false,
      finalConfig: undefined,
      productSwiperHandle: {
        activeIndex: 0,
      },
      loopMachealInited:false,
      loopDavidInited:false,
      loopMacheal2Inited:false,
      loopDavid2Inited:false,
      videoArrIndex: 0, //每组视频播放索引
      //视频放在 oss://idtcdn/beacon/dengtaIntro/
      videoArr0: [
        //股票灯塔
        "https://res.idtcdn.com/beacon/dengtaIntro/dengta_mini.mp4",
      ],
      videoArr1: [
        // 弹指文
        "https://res.idtcdn.com/beacon/dengtaIntro/tanzhiwen.mp4",
      ],
      videoArr2: [
        //企微牛
        "https://res.idtcdn.com/beacon/dengtaIntro/qiweiniu_mini.mp4",
      ],
      videoArr3: [
        //灯影
        "https://res.idtcdn.com/beacon/dengtaIntro/closeReview_mini.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-kOyYiA0FIafCr9dFoutput.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-3wU4ZjQsnAHIMYTQoutput.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-gTPpCadEVyqooIvzoutput.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-wAr8QShwu0bHyRRpoutput.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-0GERE6NV8fd2CUXqoutput.mp4",
        "https://res.idtcdn.com/Cube/DynamicAudioCaches/video-VPnSKOYKsFi7s4vsoutput.mp4",
      ],
      videoArr4: [
        //董蜜
        "https://res.idtcdn.com/beacon/dengtaIntro/dongmi_mini.mp4",
      ],
    };
  },
  components: { LoadModel },
  methods: {
    async page1In() {
      this.currentPage = 1;
      this.isAnimating = true;
      $("#page1").removeClass("hidden");
      this.page1Welcome = anyElement({
        targets: document.querySelector("#page1 .welcome"),
        isSplitTxt: true,
        duration: 1000 * 2.5,
        delay: 50,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1Rows = anyElement({
        targets: document.querySelectorAll(".f_row"),
        isSplitTxt: false,
        duration: 1000 * 2,
        delay: 400,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });

      this.page1Welcome.goIn.restart();
      await sleep(1400);
      this.page1Rows.goIn.restart();
      await sleep(1200);

      this.machealIn();
      this.davidIn();

      await sleep(3000);
      this.isAnimating = false;
    },
    async machealIn() {
      if (!$("#modelMacheal").hasClass("hidden")) {
        anime({
          targets: "#modelMacheal",
          opacity: [0, 1],
          autoplay: true,
          easing: "linear",
          duratin: 1000,
          delay: 0,
        });
        return;
      }
      $("#modelMacheal").removeClass("hidden");
      anime({
        targets: "#modelMacheal",
        translateX: ["-200%", "-100%"],
        autoplay: true,
        easing: "linear",
        duratin: randomNum(2000, 3100),
        delay: 0,
      });
      this.$refs.refMacheal.playAction("RunFromLeft");
      await sleep(randomNum(1500, 2700));
      this.$refs.refMacheal.playAction("Idle");
      await sleep(randomNum(1000, 2100));
      this.$refs.refMacheal.playAction("WavingAround");
      await sleep(randomNum(2000, 4100));
      this.$refs.refMacheal.playAction("Idle");
      await sleep(400);
      if (!this.loopMachealInited) {
        this.loopMachealInited = true;
        this.actionLoop("refMacheal", ["Wave", "Walk"]);
      }
    },
    async davidIn() {
      if (!$("#modelDavid").hasClass("hidden")) {
        anime({
          targets: "#modelDavid",
          opacity: [0, 1],
          autoplay: true,
          easing: "linear",
          duratin: 1000,
          delay: 0,
        });
        return;
      }
      $("#modelDavid").removeClass("hidden");
      anime({
        targets: "#modelDavid",
        translateX: ["100%", "0%"],
        autoplay: true,
        easing: "linear",
        duratin: randomNum(2000, 3100),
        delay: 0,
      });
      this.$refs.refDavid.playAction("RunFromRight");
      await sleep(randomNum(1500, 2700));
      this.$refs.refDavid.playAction("Idle");
      await sleep(randomNum(1000, 2100));
      this.$refs.refDavid.playAction("WavingAround");
      await sleep(randomNum(2000, 4100));
      this.$refs.refDavid.playAction("Idle");
      await sleep(400);
      if (!this.loopDavidInited) {
        this.loopDavidInited = true;
        this.actionLoop("refDavid", ["Wave", "Walk"]);
      }
    },
    async actionLoop(refName, actions) {
      this.$refs[refName].playAction(actions[randomNum(0, actions.length - 1)]);
      await sleep(randomNum(3, 4) * 1000);
      this.$refs[refName].playAction("Idle");
      await sleep(randomNum(3, 6) * 1000);
      this.actionLoop(refName, actions);
    },
    async page1Out() {
      this.isAnimating = true;
      this.page1Welcome.goOut.restart();
      this.page1Rows.goOut.restart();
      anime({
        targets: "#modelMacheal",
        opacity: [1, 0],
        autoplay: true,
        easing: "linear",
        duratin: 500,
        delay: 0,
      });
      anime({
        targets: "#modelDavid",
        opacity: [1, 0],
        autoplay: true,
        easing: "linear",
        duratin: 500,
        delay: 0,
      });
      this.isInLoopAction = false;
      await sleep(1000);
      $("#page1").addClass("hidden");
    },
    async page2In() {
      this.currentPage = 2;
      this.isAnimating = true;
      $("#page2").removeClass("hidden");
      this.page2Title = anyElement({
        targets: document.querySelector("#page2Title"),
        isSplitTxt: true,
        duration: 1000 * 2,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "rightIn",
        outEffect: "leftOut",
      });
      this.page2Title.goIn.restart();
      await sleep(1400);
      $("#modelMacheal2").removeClass("hidden");
      if ($("#modelMacheal2").css("opacity") == 0) {
        anime({
          targets: "#modelMacheal2",
          opacity: [0, 1],
          autoplay: true,
          easing: "linear",
          duratin: 500,
          delay: 0,
        });
      }
      if (!this.loopMacheal2Inited) {
        this.loopMacheal2Inited = true;
        this.actionLoop("refMacheal2", ["Walk", "Point"]);
      }
      $(".history_swiper").removeClass("hidden");
      this.initHistorySwiper();
      this.isAnimating = false;
    },
    async page2Out() {
      this.page2Title.goOut.restart();
      $(".history_swiper").addClass("hidden");
      await sleep(1000);
      $("#page2").addClass("hidden");
    },
    async page3In() {
      this.currentPage = 3;
      this.isAnimating = true;
      $("#page3").removeClass("hidden");
      this.page3Title = anyElement({
        targets: document.querySelector("#page3Title"),
        isSplitTxt: true,
        duration: 1000 * 2,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "rightIn",
        outEffect: "leftOut",
      });
      this.page3Title.goIn.restart();
      if ($("#modelMacheal2").css("opacity") == 0) {
        anime({
          targets: "#modelMacheal2",
          opacity: [0, 1],
          autoplay: true,
          easing: "linear",
          duratin: 500,
          delay: 0,
        });
      }
      await sleep(1000);
      this.initProductSwiper();
      await sleep(500);
      $(".product_swiper").removeClass("hidden");
      this.isAnimating = false;
    },
    async page3Out() {
      this.page3Title.goOut.restart();
      $(".product_swiper").addClass("hidden");
      await sleep(1000);
      $("#page3").addClass("hidden");
    },
    async page4In() {
      this.currentPage = 4;
      this.isAnimating = true;
      $("#page4").removeClass("hidden");
      this.page4Title = anyElement({
        targets: document.querySelector("#page4Title"),
        isSplitTxt: true,
        duration: 1000 * 2,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "rightIn",
        outEffect: "leftOut",
      });
      this.page4SubTitle = anyElement({
        targets: document.querySelector("#page4SubTitle"),
        isSplitTxt: true,
        duration: 1000 * 1.3,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "rightIn",
        outEffect: "leftOut",
      });
      this.page4Title.goIn.restart();
      await sleep(400);
      this.page4SubTitle.goIn.restart();
      await sleep(500);

      this.david2In();

      new InfiniteMarquee({
        el: document.querySelector("#myMarquee1"),
        direction: "right",
        duration: 130,
        css: true,
      });
      new InfiniteMarquee({
        el: document.querySelector("#myMarquee2"),
        direction: "left",
        duration: 100,
        css: true,
      });
      await sleep(1000);
      $("#myMarquee1, #myMarquee2").removeClass("hidden");
      this.isAnimating = false;
    },
    async david2In() {
      if (!$("#modelDavid2").hasClass("hidden")) {
        anime({
          targets: "#modelDavid2",
          opacity: [0, 1],
          autoplay: true,
          easing: "linear",
          duratin: randomNum(2000, 3100),
          delay: 0,
        });
        return;
      }
      $("#modelDavid2").removeClass("hidden");
      anime({
        targets: "#modelDavid2",
        opacity: [0, 1],
        autoplay: true,
        easing: "linear",
        duratin: randomNum(2000, 3100),
        delay: 0,
      });
      await sleep(300);
      if (!this.loopDavid2Inited) {
        this.loopDavid2Inited = true;
        this.actionLoop("refDavid2", ["Wave", "Walk", "Point"]);
      }
    },
    async page4Out() {
      this.page4Title.goOut.restart();
      this.page4SubTitle.goOut.restart();
      anime({
        targets: "#modelDavid2",
        opacity: [1, 0],
        autoplay: true,
        easing: "linear",
        duratin: randomNum(2000, 3100),
        delay: 0,
      });
      $("#myMarquee1, #myMarquee2").addClass("hidden");
      await sleep(1000);
      $("#page4").addClass("hidden");
    },
    async page5In() {
      this.currentPage = 5;
      this.isAnimating = true;
      $("#page5").removeClass("hidden");
      this.page5EndTitle = anyElement({
        targets: document.querySelector("#endTitle"),
        isSplitTxt: true,
        duration: 1000 * 2,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page5EndSubTitle = anyElement({
        targets: document.querySelector("#endSubTitle"),
        isSplitTxt: true,
        duration: 1000 * 1.5,
        delay: 40,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "leftOut",
      });
      this.page5EndLogo = anyElement({
        targets: document.querySelector("#endLogo"),
        isSplitTxt: false,
        duration: 1000 * 1.5,
        delay: 40,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "leftOut",
      });
      this.page5EndTitle.goIn.restart();
      await sleep(500);
      this.page5EndSubTitle.goIn.restart();
      await sleep(1000);
      this.page5EndLogo.goIn.restart();
      await sleep(1000);
      this.isAnimating = false;
    },
    async page5Out() {
      this.page5EndTitle.goOut.restart();
      await sleep(300);
      this.page5EndSubTitle.goOut.restart();
      await sleep(300);
      this.page5EndLogo.goOut.restart();
      $("#page5").addClass("hidden");
    },
    async slideIn(slideIndex) {
      if (this["year" + slideIndex] != undefined) {
        return;
      }
      this["year" + slideIndex] = anyElement({
        targets: document.querySelector(`.slide${slideIndex} .year_title`),
        isSplitTxt: true,
        duration: 1000 * 2,
        delay: 80,
        easing: "easeOutExpo",
        inEffect: "perspectiveRightIn2",
        outEffect: "fadeOut",
      });
      this["events" + slideIndex] = anyElement({
        targets: document.querySelectorAll(`.slide${slideIndex} li`),
        isSplitTxt: false,
        duration: 1000 * 0.9,
        delay: 200,
        easing: "easeOutExpo",
        inEffect: "perspectiveRightIn1",
        outEffect: "fadeOut",
      });

      this["year" + slideIndex].goIn.restart();
      await sleep(600);
      this["events" + slideIndex].goIn.restart();
    },
    initHistorySwiper() {
      if (this.historySwiperHandle != undefined) {
        return;
      }
      const that = this;
      this.historySwiperHandle = new Swiper(".history_swiper", {
        loop: false,
        lazyLoading: false,
        slidesPerView: 3,
        centeredSlides: true,
        on: {
          init() {
            that.slideIn(this.activeIndex);
          },
          slideChangeTransitionStart() {
            that.slideIn(this.activeIndex);
          },
        },
      });
    },
    initProductSwiper() {
      if (this.productSwiperHandle.a11y != undefined) {
        return;
      }
      this.productSwiperHandle = new Swiper(".product_swiper", {
        loop: false,
        lazyLoading: false,
        slidesPerView: 5,
        slidesPerGroup: 1,
        centeredSlides: true,
        on: {
          init() {},
          slideChangeTransitionStart() {},
        },
      });
    },
    async fontLoad() {
      const FZZhengHei = new FontFaceObserver("FZZhengHei");
      const PingFangRegular = new FontFaceObserver("PingFangRegular");
      await Promise.all([FZZhengHei.load(null, 30 * 1000), PingFangRegular.load(null, 30 * 1000)]);
    },
    bindKeyEvents() {
      document.addEventListener("keydown", this.handleKeyDown);
    },
    /*
      单击PageUp stepForward 或者选择上，
      单击PageDown stepBackward 或选择下；
      双击PageUp goBack；
      双击PageDown goHome
      单击MediaPlayPause 确定
    */
    handleKeyDown(e) {
      if (["F5", "F11", "F12"].indexOf(e.key) == -1) {
        e.preventDefault(); //取消浏览器原有的操作
      }
      if (e.key == "PageUp") {
        if (this.lastKey == "PageUp") {
          clearTimeout(this.listener);
          this.lastKey = "";
          this.goBack();
          return;
        }
        this.lastKey = "PageUp";
        clearTimeout(this.listener);
        this.listener = setTimeout(() => {
          this.stepBackward();
          this.lastKey = "";
        }, 400);
      }

      if (e.key == "Tab" || e.key == "Enter") {
        this.confirm();
      }

      if (e.key == "Escape") {
        this.goBack();
      }

      if (e.key == "PageDown") {
        if (this.lastKey == "PageDown") {
          clearTimeout(this.listener);
          this.lastKey = "";
          this.goHome();
          return;
        }
        this.lastKey = "PageDown";
        clearTimeout(this.listener);
        this.listener = setTimeout(() => {
          this.stepForward();
          this.lastKey = "";
        }, 300);
      }
    },
    async stepForward() {
      if (this.isAnimating || this.finalVideo) {
        return;
      }
      if (this.currentPage == 1) {
        this.page1Out();
        this.page2In();
        await sleep(1000);
      } else if (this.currentPage == 2) {
        if (this.historySwiperHandle.isEnd) {
          this.page2Out();
          await sleep(500);
          this.page3In();
        } else {
          this.historySwiperHandle.slideNext(400);
        }
      } else if (this.currentPage == 3) {
        if (this.productSwiperHandle.isEnd) {
          this.page3Out();
          anime({
            targets: "#modelMacheal2",
            opacity: [1, 0],
            autoplay: true,
            easing: "linear",
            duratin: 500,
            delay: 0,
          });
          await sleep(500);
          this.page4In();
        } else {
          this.productSwiperHandle.slideNext(400);
        }
      } else if (this.currentPage == 4) {
        this.page4Out();
        await sleep(500);
        this.page5In();
      }
    },
    async stepBackward() {
      if (this.isAnimating || this.finalVideo) {
        return;
      }
      if (this.currentPage == 1) {
        this.page1In();
      } else if (this.currentPage == 2) {
        if (this.historySwiperHandle.isBeginning) {
          this.page2Out();
          anime({
            targets: "#modelMacheal2",
            opacity: [1, 0],
            autoplay: true,
            easing: "linear",
            duratin: 500,
            delay: 0,
          });
          await sleep(500);
          this.page1In();
        } else {
          this.historySwiperHandle.slidePrev(400);
        }
      } else if (this.currentPage == 3) {
        if (this.productSwiperHandle.isBeginning) {
          this.page3Out();
          await sleep(500);
          this.page2In();
        } else {
          this.productSwiperHandle.slidePrev(400);
        }
      } else if (this.currentPage == 4) {
        this.page4Out();
        await sleep(500);
        this.page3In();
      } else if (this.currentPage == 5) {
        this.page5Out();
        await sleep(500);
        this.page4In();
      }
    },
    goBack() {
      if (this.currentPage == 3) {
        this.endVideo();
      }
    },
    confirm() {
      if (this.currentPage == 3) {
        if (this.finalVideo == "") {
          //每次确认的时候都把每组的播放索引置为0
          this.videoArrIndex = 0;
          this.playVideo();
        } else {
          this.toggleVideoPlay();
        }
      }
    },
    toggleVideoPlay() {
      if (this.isVideoPlaying) {
        $("#videoPlayer")[0].pause();
        this.isVideoPlaying = false;
      } else {
        $("#videoPlayer")[0].play();
        this.isVideoPlaying = true;
      }
    },
    async goHome() {
      if (this.currentPage == 5) {
        this.page5Out();
        await sleep(500);
        this.page1In();
      }
    },
    playVideo() {
      $("#videoHolder").removeClass("hidden");
      this.finalVideo = this["videoArr" + this.productSwiperHandle.activeIndex][this.videoArrIndex];
      this.isVideoPlaying = true;
    },
    playNextVideo() {
      const videoArrLength = this["videoArr" + this.productSwiperHandle.activeIndex].length;
      if (this.videoArrIndex == videoArrLength - 1) {
        this.videoArrIndex = 0;
      } else {
        this.videoArrIndex += 1;
      }
      this.finalVideo = this["videoArr" + this.productSwiperHandle.activeIndex][this.videoArrIndex];
      this.isVideoPlaying = true;
    },
    endVideo() {
      $("#videoHolder").addClass("hidden");
      this.finalVideo = "";
      this.isVideoPlaying = false;
    },
    async initParticle() {
      const randomConfig = randomNum(1, 5);
      let particleConfig = await axios.get(`/particlesConfigs/config${randomConfig}.json`);
      particlesJS("particles-js", particleConfig.data);
    },
    //获取视频列表
    getVideos() {
      return new Promise(async (resolve, reject) => {
        const params = { userId: "DYING_USER_ADMIN" };
        const videoData = await axios.post(
          `http://tanzhiw.com/master_material/multiMedia/dyingVideoList`,
          params
        );
        console.log("videoData", videoData);
        resolve();
      });
    },
    async getMarket() {
      const params = JSON.stringify({
        vDtSecCode: [
          "0105000001", //上证
          "0005399001", //深证成指
          "0005399006", //创业板指
          "2005888001", //灯塔指数
          "0005399005", //中小板指
          "0005399300", //沪深300
          "0105000016", //上证50
          "0105000905", //中证500
          "0105000010", //上证180
          "0105000009", //上证380
          "0005399106", //深证综指
          "0005399004", //深证100R
          "0105000003", //B股指数
          "0005399003", //成分B指
          "0105000011", //基金指数
        ],
      });
      const path = process.env.NODE_ENV === "production" ? "/" : "/comm";
      let marketData = await axios.post(
        path + "?s=quote&f=getSimpleQuote&req=QuoteReq&rsp=QuoteSimpleRsp&encode=1",
        params
      );
      marketData.data.vSecSimpleQuote.map((item) => {
        const tempObj = getRateByData(item);
        this.marketList.push({
          name: item.sSecName,
          fNow: item.fNow,
          sRate: tempObj.sRate,
          className: tempObj.className,
        });
      });
      this.$nextTick(() => {
        this.initMarketMarquee();
      });
    },
    initMarketMarquee() {
      new InfiniteMarquee({
        el: document.querySelector("#marketMarquee"),
        direction: "left",
        duration: 400,
        css: true,
      });
    },
    getWelcomeSize() {
      if (this.welcomeTitle.length <= 7) {
        this.welcomeSize = "xl";
      } else if (this.welcomeTitle.length > 7 && this.welcomeTitle.length <= 10) {
        this.welcomeSize = "l";
      } else if (this.welcomeTitle.length > 10 && this.welcomeTitle.length <= 15) {
        this.welcomeSize = "m";
      } else if (this.welcomeTitle.length > 15) {
        this.welcomeSize = "s";
      }
    },
  },
  async mounted() {
    //每个项目都可以独立设置
    setRem(1920);

    this.welcomeTitle = this.$route.query.welcomeTitle || "灯塔欢迎您";
    this.getWelcomeSize();

    //获取实时上证数据
    // this.getMarket();

    //获取视频列表
    // await this.getVideos();

    this.initParticle();

    //字体加载比较慢，等它加载完
    await this.fontLoad();

    //绑定按键
    this.bindKeyEvents();

    //等待模型加载完毕才开始做动画，保证流畅度
    await this.$refs.refMacheal.init();
    await this.$refs.refDavid.init();
    await this.$refs.refMacheal2.init();
    await this.$refs.refDavid2.init();

    this.page1In();

    document.getElementById("videoPlayer").addEventListener(
      "ended",
      () => {
        this.playNextVideo();
      },
      false
    );
  },
};
</script>
<style lang="less" scoped>
@import "index.less";
@import "infinite-marquee/assets/css/infinite-marquee";
</style>
<style lang="less">
body {
  width: 100%;
  overflow: hidden;
}
</style>
