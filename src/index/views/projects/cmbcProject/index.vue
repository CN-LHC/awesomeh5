<template>
  <div class="pages">
    <div class="audio_holder">
      <audio
        src="http://idtcdn.oss-cn-hangzhou.aliyuncs.com/external/yinhe/yinhe/RaisingMeHigher2.mp3"
        ref="bgAudio"
      ></audio>
    </div>

    <ul class="bokeh" id="bokeh" v-if="isLoadingVisible">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="page page1 none" id="page1">
      <div class="page_title hidden">
        <div class="page_title_inside1"></div>
        <div class="page_title_inside2"></div>
        <div class="page_title_inside3"><strong>每日收盘回顾</strong><i></i><span>2021.11.25</span></div>
      </div>
      <div class="titles">
        <div id="title1" class="title1">警报拉响！<br />热点板块多股冲高回落。</div>
        <div id="title2" class="title2">沪指痛失3600！</div>
      </div>
      <div class="gap"></div>
      <div class="btn_start hidden" @click="startPlay"><span>开始解读</span></div>
      <div class="logo_cmbc hidden"><span> </span></div>
    </div>

    <div class="page page2 none" id="page2">
      <div class="page_title hidden">
        <div class="page_title_inside1"></div>
        <div class="page_title_inside2"></div>
        <div class="page_title_inside3"><strong>每日收盘回顾</strong><i></i><span>大盘表现</span></div>
      </div>
      <div class="page_box hidden">
        <div class="top_desc" id="page2Desc">
          沪指涨0.18%， 深成指涨0.04% ，有<span class="letter">1625</span>股下跌
        </div>
        <div class="arise_boxes">
          <arise-box ref="refArise1" />
          <arise-box ref="refArise2" />
          <arise-box ref="refArise3" />
        </div>
        <div class="desc_title">盘面上：</div>
        <div class="desc">
          受特斯拉股价创新高刺激，锂电池表现活跃，消费电子 午后异动拉升，储能、电力、半导体等表现活跃，但游
          戏、国产软件、房地产、券商等纷纷走低。
        </div>
        <div class="desc_title">资金方面：</div>
        <div class="desc">北向资金今天净流入39.9亿元，今日主力资金净流入 9.8亿元。</div>
      </div>
    </div>
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
import ariseBox from "./ariseBox";
import { sleep, setRem } from "@/utils/utils.js";
import $ from "jquery";
import ApiServe from "@/api/api.js";
import FontFaceObserver from "fontfaceobserver";
export default {
  data: function () {
    return {
      currentPage: 1, //当前page
      isLoadingVisible: true,
    };
  },
  components: { ariseBox },
  methods: {
    async startPlay() {
      // this.playBgAudio();
      this.page1Out();
    },
    async playBgAudio() {
      this.$refs.bgAudio.play(); //背景音乐播放
      // await sleep(500);
      // this.$refs.bgAudio.volume = 0.1; //背景音乐音量调节（1为最大）
    },
    playPage1(isDebugStop) {
      return new Promise(async (resolve, reject) => {
        this.currentPage = 1;
        // this.$refs.audio1.play();
        // await this.moniteAudioEnd();

        if (isDebugStop) {
          return;
        }
        resolve();
      });
    },
    async page1In() {
      $("#page1").removeClass("none");
      this.page1PageTitle = anyElement({
        targets: document.querySelector("#page1 .page_title"),
        duration: 1000 * 2,
        delay: 0,
        easing: "easeOutExpo",
        inEffect: "leftIn",
        outEffect: "leftOut",
      });
      this.page1Title1 = anyElement({
        targets: document.querySelector("#page1 #title1"),
        isSplitTxt: true,
        duration: 20,
        delay: 40,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page1Title2 = anyElement({
        targets: document.querySelector("#page1 #title2"),
        isSplitTxt: true,
        duration: 10,
        delay: 60,
        easing: "easeOutExpo",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.page1BtnStart = anyElement({
        targets: document.querySelector(`#page1 .btn_start`),
        duration: 2400,
        delay: 150,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1LogoCmbc = anyElement({
        targets: document.querySelector(`#page1 .logo_cmbc`),
        duration: 2400,
        delay: 0,
        easing: "easeOutExpo",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });

      this.page1PageTitle.goIn.restart();
      await sleep(800);
      this.page1Title1.goIn.restart();
      await sleep(800);
      this.page1Title2.goIn.restart();
      await sleep(800);
      this.page1BtnStart.goIn.restart();
      await sleep(500);
      this.page1LogoCmbc.goIn.restart();

      // await sleep(2000);
      // this.page1Out();
    },
    async page1Out() {
      this.page1PageTitle.goOut.restart();
      await sleep(160);
      this.page1Title1.goOut.restart();
      await sleep(160);
      this.page1Title2.goOut.restart();
      await sleep(160);
      this.page1BtnStart.goOut.restart();
      await sleep(160);
      this.page1LogoCmbc.goOut.restart();

      await sleep(1800);
      this.stopRecord();
    },

    async page2In() {
      $("#page2").removeClass("none");
      this.page2PageTitle = anyElement({
        targets: document.querySelector("#page2 .page_title"),
        duration: 1000 * 2,
        delay: 0,
        easing: "easeOutExpo",
        inEffect: "leftIn",
        outEffect: "leftOut",
      });
      this.page2PageBox = anyElement({
        targets: document.querySelector("#page2 .page_box"),
        duration: 1000 * 1,
        delay: 0,
        easing: "easeOutExpo",
        inEffect: "leftIn",
        outEffect: "leftOut",
      });

      this.page2PageTitle.goIn.restart();
      await sleep(1200);
      this.page2PageBox.goIn.restart();
      await sleep(1200);
      this.$refs.refArise1.playIn({
        title: "沪指",
        point: 3625.36,
        wave: 0.0081,
      });
      await sleep(1200);
      this.$refs.refArise2.playIn({
        title: "深成指",
        point: 3625.36,
        wave: -0.021,
      });
      await sleep(1200);
      this.$refs.refArise3.playIn({
        title: "创业板指",
        point: 2653.18,
        wave: 0.042,
      });
    },
    getParams() {
      this.id = this.$route.query.id;
      this.model_id = this.$route.query.model_id;
      this.params = {
        ip: this.$route.query.ip,
        port: this.$route.query.port,
        offset_x: this.$route.query.offset_x,
        offset_y: this.$route.query.offset_y,
        width: this.$route.query.width,
        height: this.$route.query.height,
      };
      this.newIpPort =
        this.$route.query.source == "ali" ? "https://recordvideoali.wedengta.com" : "https://recordvideo.wedengta.com";
    },
    startRecord() {
      ApiServe.recordStart(this.newIpPort, this.params)
        .then(({ code }) => {})
        .catch((err) => {
          ApiServe.recordRelease(this.newIpPort, this.params);
        });
    },
    async stopRecord() {
      await ApiServe.recordStop(this.newIpPort, this.params);

      await ApiServe.combineAudiosWithBgm(this.newIpPort, {
        ip: this.params.ip,
        port: this.params.port,
        id: this.id,
        model_id: this.model_id,
        videoTotalTime: 5,
        videmBgm: "https://idtcdn.oss-cn-hangzhou.aliyuncs.com/Cube/VideoBgm/bg.mp3",
        audiosOrderList: [],
      });

      ApiServe.recordRelease(this.newIpPort, this.params);
    },
  },
  async mounted() {
    //每个项目都可以独立设置
    setRem(400);

    const harmonyMidium = new FontFaceObserver("harmonyMidium");
    const harmonyBold = new FontFaceObserver("harmonyBold");
    await Promise.all([harmonyMidium.load(null, 10 * 1000), harmonyBold.load(null, 10 * 1000)]);

    this.isLoadingVisible = false;
    await sleep(300);

    this.getParams();
    this.startRecord();

    await sleep(1500);

    this.page1In();

    // alert(document.body.clientWidth);
    // alert(document.body.clientHeight);
  },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
