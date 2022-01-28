<template>
  <div class="pages">
    <div class="cover" id="cover" v-if="isLoadingVisible"></div>
    <video :src="videoSrc" id="theVideo"></video>

    <div class="model_macheal hidden" id="modelMacheal">
      <Macheal ref="refMacheal" :width="480" :height="600" :scale="5" />
    </div>
    <div class="model_david hidden" id="modelDavid">
      <David ref="refDavid" :width="480" :height="600" :scale="5" />
    </div>
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
import { sleep, setRem, getUrlParams, randomNum } from "@/utils/utils.js";
import $ from "jquery";
import axios from "axios";
import ApiServe from "@/api/api.js";
import anime from "animejs/lib/anime.es.js";
import Macheal from "@/components/models/Macheal/index.vue";
import David from "@/components/models/David/index.vue";
export default {
  data: function () {
    return {
      isLoadingVisible: true,
      videoSrc: require("@/index/views/projects/bossFestival/images/festival.mp4"),
      bgAudioSrc: "https://idtcdn.oss-cn-hangzhou.aliyuncs.com/dengying/bgm/bg1.mp3",
      // bgAudioVolume: 0.2, //1为最大   背景音量
      // sideVoice1: undefined, //旁白声音1
      // widthRatio: 1, //宽度比例，当前宽度除以设计稿宽度
      audiosOrderList: [], //录屏接口需要的旁白声音数组
      videoTotalTime: 12, //录屏接口需要的视频总时长
    };
  },
  components: { Macheal, David },
  methods: {
    async page1In() {
      const machealAnime = anime({
        targets: "#modelMacheal",
        translateX: ["-200%", "-100%"],
        autoplay: false,
        easing: "linear",
        duratin: 4000,
        delay: 500,
      });
      const davidAnime = anime({
        targets: "#modelDavid",
        translateX: ["100%", "0"],
        autoplay: false,
        easing: "linear",
        duratin: 4000,
        delay: 500,
      });

      $("#modelMacheal").removeClass("hidden");
      $("#modelDavid").removeClass("hidden");
      machealAnime.play();
      davidAnime.play();
      this.$refs.refMacheal.playAction("RunFromLeft");
      this.$refs.refDavid.playAction("RunFromRight");
      await sleep(3000);
      this.$refs.refMacheal.playAction("Idle");
      this.$refs.refDavid.playAction("Idle");
      await sleep(1000);
      this.$refs.refMacheal.playAction("WavingAround");
      this.$refs.refDavid.playAction("WavingAround");
      await sleep(4000);
      this.$refs.refMacheal.playAction("Idle");
      this.$refs.refDavid.playAction("Idle");
      await sleep(400);
      this.isInActionLoop = true;
      this.machealActionLoop();
      this.davidActionLoop();
    },
    async machealActionLoop() {
      const machealActions = ["Run", "Walk", "Idle", "Point", "Talk", "Wave"];
      this.$refs.refMacheal.playAction(machealActions[randomNum(0, 5)]);
      await sleep(randomNum(3, 5) * 1000);
      this.machealActionLoop();
    },
    async davidActionLoop() {
      const davidActions = ["Run", "Walk", "Idle", "Point", "Talk", "Wave"];
      this.$refs.refDavid.playAction(davidActions[randomNum(0, 5)]);
      await sleep(randomNum(3, 5) * 1000);
      this.davidActionLoop();
    },
    getParams() {
      const urlParams = getUrlParams();
      // console.log(urlParams);
      this.id = urlParams.id;
      this.model_id = urlParams.model_id;
      this.params = {
        ip: urlParams.ip,
        port: urlParams.port,
        offset_x: urlParams.offset_x,
        offset_y: urlParams.offset_y,
        width: urlParams.width,
        height: urlParams.height,
      };
      this.newIpPort =
        urlParams.source == "ali" ? "https://recordvideoali.wedengta.com" : "https://recordvideo.wedengta.com";
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
      await ApiServe.combineAudiosWithBgm(this.newIpPort, this.params.ip, this.params.port, {
        id: this.id,
        model_id: this.model_id,
        videoTotalTime: this.videoTotalTime,
        videmBgm: this.bgAudioSrc,
        audiosOrderList: this.audiosOrderList,
      });
      ApiServe.recordRelease(this.newIpPort, this.params);
    },
  },
  async mounted() {
    //每个项目都可以独立设置
    setRem(720);

    //从url上读取录屏所需参数
    this.getParams();

    //获得此页面的宽度比例，图表在设置px值的时候都需要乘以这个系数，以得到正确的比例宽度
    this.widthRatio = document.body.clientWidth / 720;

    await sleep(3000);

    //开始录屏
    this.startRecord();

    //开始计时
    console.time("sideVoice1");
    console.time("endAll");

    //短暂持续后，封面隐藏
    await sleep(100);
    this.isLoadingVisible = false;
    await sleep(1000);

    $("#theVideo")[0].play();
    this.page1In();

    $("#theVideo")[0].addEventListener("ended", () => {
      console.log("ended");
      this.stopRecord();
    });
  },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
