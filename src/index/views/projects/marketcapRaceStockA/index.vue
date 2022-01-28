<template>
  <div class="pages">
    <div id="particles-js"></div>
    <canvas id="canvas-basic"></canvas>

    <div class="audio_holder">
      <audio :src="bgAudioSrc" ref="bgAudio"></audio>
      <audio :src="sideVoice1" ref="sideVoice1"></audio>
      <audio :src="sideVoice2" ref="sideVoice2"></audio>
    </div>

    <svg width="300" height="300" class="svg_gradient">
      <defs>
        <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E04911" />
          <stop offset="100%" stop-color="#EF802E" />
        </linearGradient>
      </defs>
    </svg>

    <div :class="`cover ${raceType}`" id="cover" v-if="isLoadingVisible"></div>

    <div class="page page1" id="page1">
      <div class="title_holder">
        <div class="title moving hidden" id="page1Title">{{ year }}</div>
        <div class="sub_title hidden" id="page1SubTitle">{{ projectTitle }}排行榜<b>TOP20</b></div>
        <div class="sub_title2 hidden" id="page1SubTitle2">TOP 20</div>
        <div class="sub_title3 hidden" id="page1SubTitle3">
          {{isHaveUpTo? `数据截止日${endDate}`:'' }}
        </div>
      </div>

      <div class="duty_free">
        <div class="logos">
          <i class="ico_stock_writing duty_element hidden"></i
          ><i class="ico_deng_ying duty_element hidden"></i>
        </div>
        <div class="txt duty_element hidden">
          所有展示信息仅供参考，不构成任何投资建议。
          <br />投资者据此操作，风险自担。投资有风险，入市需谨慎。
        </div>
      </div>
    </div>

    <div class="page page2" id="page2">
      <bar-history-chart ref="marketRace" id="marketRace" customClass="c_bar1" />
    </div>

    <div class="page page3" id="page3">
      <div class="most_block">
        <div class="m_title hidden" id="mTitle1">{{ year }}</div>
        <div class="m_sub_title hidden" id="mSubTitle1">{{projectTitle}}增长最多的公司</div>
        <div class="m_name hidden" id="mName1">{{ increaseObj1.name }}</div>
        <div class="m_desc hidden" id="mDesc1">市值增长{{ increaseObj1.value }}亿</div>
      </div>

      <div class="most_block">
        <div class="m_title hidden" id="mTitle2">{{ year }}</div>
        <div class="m_sub_title hidden" id="mSubTitle2">{{projectTitle}}增长最快的公司</div>
        <div class="m_name hidden" id="mName2">{{ increaseObj2.name }}</div>
        <div class="m_desc hidden" id="mDesc2">市值增长{{ increaseObj2.value }}%</div>
      </div>
    </div>

    <div class="page page4" id="page4">
      <div class="logo_by hidden"></div>
      <div class="txt_by hidden" id="txtBy">更多内容尽在灯影</div>

      <div class="notify hidden">
        所有展示信息仅供参考，不构成任何投资建议。
        <br />投资者据此操作，风险自担。投资有风险，入市需谨慎。
      </div>
    </div>
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
import { sleep, setRem, getUrlParams } from "@/utils/utils.js";
import $ from "jquery";
import axios from "axios";
import ApiServe from "@/api/api.js";
import FontFaceObserver from "fontfaceobserver";
import BarHistoryChart from "@/components/barHistoryChart/index.vue";
import ScrambleText from "@/utils/ScrambleText.js";
export default {
  data: function () {
    return {
      raceType:'',
      modelId: 62,
      projectTitle: "A股年度市值",
      year: "2021年",
      isHaveUpTo: false,
      currentPage: 1, //当前page
      isLoadingVisible: true,
      raceData: [], //跑马数据
      bgAudioSrc: "https://idtcdn.oss-cn-hangzhou.aliyuncs.com/dengying/bgm/bg1.mp3",
      bgAudioVolume: 0.2, //1为最大   背景音量
      sideVoice1: undefined, //旁白声音1
      sideVoice2: undefined, //旁白声音2
      widthRatio: 1, //宽度比例，当前宽度除以设计稿宽度
      audiosOrderList: [], //录屏接口需要的旁白声音数组
      videoTotalTime: 40, //录屏接口需要的视频总时长
      endDate: "",
      increaseObj1: {
        name: "",
        value: 0,
      }, //增长最多
      increaseObj2: {
        name: "",
        value: 0,
      }, //增长最快
    };
  },
  components: { BarHistoryChart },
  methods: {
    async initParticle() {
      let particleConfig = await axios.get(`/particlesConfigs/config1.json`);
      particlesJS("particles-js", particleConfig.data);
    },
    playBgAudio() {
      this.$refs.bgAudio.play(); //背景音乐播放
      this.$refs.bgAudio.volume = this.bgAudioVolume; //背景音乐音量调节（1为最大）
    },
    fadeOutBgAudio() {
      const fadeHandle = setInterval(() => {
        if (this.bgAudioVolume <= 0.1) {
          clearInterval(fadeHandle);
        }
        this.bgAudioVolume -= 0.05;
        this.$refs.bgAudio.volume = this.bgAudioVolume;
      }, 200);
    },

    async page1In() {
      $("#page1Title").removeClass("hidden");
      $("#page1Title").addClass("fade_top_in");

      await sleep(400);

      this.page1SubTitle = anyElement({
        targets: document.querySelector("#page1SubTitle"),
        isSplitTxt: true,
        duration: 1400,
        delay: 30,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "topOut",
      });
      this.page1SubTitle.runIn();

      await sleep(500);

      this.page1SubTitle2 = anyElement({
        targets: document.querySelector("#page1SubTitle2"),
        isSplitTxt: true,
        duration: 1000,
        delay: 50,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "fadeOut",
      });
      this.page1SubTitle2.runIn();

      await sleep(300);

      this.page1SubTitle3 = anyElement({
        targets: document.querySelector("#page1SubTitle3"),
        isSplitTxt: true,
        duration: 400,
        delay: 50,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "fadeOut",
      });
      this.page1SubTitle3.runIn();

      await sleep(300);

      this.page1DutyElements = anyElement({
        targets: document.querySelectorAll("#page1 .duty_element"),
        isSplitTxt: false,
        duration: 1000,
        delay: 200,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page1DutyElements.runIn();

      await sleep(1400);
      this.page1Out();
    },
    async page1Out() {
      this.page1SubTitle2.runOut();
      this.page1SubTitle3.runOut();
      await sleep(300);
      this.page1DutyElements.runOut();
      await sleep(100);
      $(".title_holder").addClass("title_at_corner");
      await sleep(500);
      $(".title_holder b").addClass("display");
      await sleep(100);
      $(".title_holder b").addClass("show");
      await sleep(200);
      this.page2In();
    },
    async page2In() {
      const chartWidth = document.body.clientWidth;
      const chartHeight = document.body.clientHeight - this.widthRatio * 200;
      console.log("this.raceData", this.raceData);
      this.$refs.marketRace.BarHistoryChart(this.raceData, {
        width: chartWidth,
        height: chartHeight,
        margin: {
          top: 0,
          left: this.widthRatio * 100,
          bottom: this.widthRatio * 5,
          right: this.widthRatio * 120,
        },
        inDuration: 300,
        delay: 30,
        playDuration: 2500,
        yPadding: 0.2,
        count: 20,
        ease: "easeBackOut",
        suffix: "亿",
      });
      this.$refs.sideVoice1.play(); //背景音乐播放
      await sleep(this.page2Duration * 1000);
      this.page2Out();
    },
    async page2Out() {
      $("#page1Title").addClass("hidden");
      $(".title_holder b").removeClass("show");
      this.page1SubTitle.goOut.restart();
      this.$refs.marketRace.playOut();
      await sleep(900);
      this.page3In();
    },
    async page3In() {
      this.mTitle1 = anyElement({
        targets: document.querySelector("#page3 #mTitle1"),
        isSplitTxt: true,
        duration: 2400,
        delay: 60,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mTitle1.runIn();

      await sleep(300);

      this.mSubTitle1 = anyElement({
        targets: document.querySelector("#page3 #mSubTitle1"),
        isSplitTxt: true,
        duration: 1400,
        delay: 30,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mSubTitle1.runIn();

      await sleep(900);

      $("#page3 #mName1").removeClass("hidden");
      this.runScramble("mName1");

      await sleep(400);

      this.$refs.sideVoice2.play(); //背景音乐播放

      await sleep(300);

      this.mDesc1 = anyElement({
        targets: document.querySelector("#page3 #mDesc1"),
        isSplitTxt: true,
        duration: 1400,
        delay: 30,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mDesc1.runIn();

      await sleep(1500);

      this.mTitle2 = anyElement({
        targets: document.querySelector("#page3 #mTitle2"),
        isSplitTxt: true,
        duration: 2400,
        delay: 60,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mTitle2.runIn();

      await sleep(300);

      this.mSubTitle2 = anyElement({
        targets: document.querySelector("#page3 #mSubTitle2"),
        isSplitTxt: true,
        duration: 1400,
        delay: 30,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mSubTitle2.runIn();

      await sleep(900);

      $("#page3 #mName2").removeClass("hidden");
      this.runScramble("mName2");

      await sleep(2400);

      this.mDesc2 = anyElement({
        targets: document.querySelector("#page3 #mDesc2"),
        isSplitTxt: true,
        duration: 1400,
        delay: 30,
        easing: "easeOutQuint",
        inEffect: "fadeIn",
        outEffect: "bottomOut",
      });
      this.mDesc2.runIn();

      await sleep(1400);

      this.page3Out();
    },
    async runScramble(id) {
      let tempObj = {};
      let tempName = "temp" + new Date().getTime();
      console.log("tempName: ", tempName);
      tempObj[tempName] = new ScrambleText(document.getElementById(id), {
        timeOffset: 200,
      });
      tempObj[tempName].play();
      await sleep(600);
      tempObj[tempName].start();
    },
    async page3Out() {
      this.mTitle1.runOut();
      await sleep(100);
      this.mSubTitle1.runOut();
      await sleep(100);
      $(".m_name").addClass("hidden");
      this.mDesc1.runOut();
      await sleep(100);
      this.mTitle2.runOut();
      await sleep(100);
      this.mSubTitle2.runOut();
      await sleep(100);
      this.mDesc2.runOut();
      await sleep(400);
      this.page4In();
    },
    async page4In() {
      this.page4Logo = anyElement({
        targets: document.querySelector("#page4 .logo_by"),
        isSplitTxt: false,
        duration: 1400,
        delay: 40,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page4Logo.runIn();

      await sleep(300);

      this.page4TxtBy = anyElement({
        targets: document.querySelector("#txtBy"),
        isSplitTxt: true,
        duration: 1400,
        delay: 40,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page4TxtBy.runIn();

      this.fadeOutBgAudio();

      await sleep(500);

      this.page4Notify = anyElement({
        targets: document.querySelector("#page4 .notify"),
        isSplitTxt: false,
        duration: 800,
        delay: 40,
        easing: "easeOutQuint",
        inEffect: "topIn",
        outEffect: "bottomOut",
      });
      this.page4Notify.runIn();

      await sleep(1000);

      //停止录屏
      this.stopRecord();
    },
    getParams() {
      const urlParams = getUrlParams();
      this.id = urlParams.id;
      this.model_id = urlParams.model_id;
      this.params = {
        id: urlParams.id,
        ip: urlParams.ip,
        port: urlParams.port,
        offset_x: urlParams.offset_x,
        offset_y: urlParams.offset_y,
        width: urlParams.width,
        height: urlParams.height,
      };
      //如果发现指定封面时间参数，就增加此参数
      const url_extra_parmas=JSON.parse(decodeURIComponent(urlParams.url_extra_parmas));
      if(url_extra_parmas.coverFrameSeconds){
        this.params.coverFrameSeconds=url_extra_parmas.coverFrameSeconds
      }
      this.newIpPort =
        urlParams.source == "ali"
          ? "https://recordvideoali.wedengta.com"
          : "https://recordvideo.wedengta.com";
    },
    getRaceType() {
      const urlParams = getUrlParams();
      const url_extra_parmas=JSON.parse(decodeURIComponent(urlParams.url_extra_parmas));
      const raceType = url_extra_parmas.raceType;
      console.log('raceType: ', raceType);
      this.raceType=raceType
      const raceTypeObj = {
        year: {
          modelId: 62,
          projectTitle: "A股年度市值",
          year: "2021年",
          isHaveUpTo: false, //是否有截至日期
        },
        season1: {
          modelId: 69,
          projectTitle: "A股一季度市值",
          year: "2021年",
          isHaveUpTo: false, //是否有截至日期
        },
        season2: {
          modelId: 64,
          projectTitle: "A股二季度市值",
          year: "2021年",
          isHaveUpTo: false, //是否有截至日期
        },
        season3: {
          modelId: 65,
          projectTitle: "A股三季度市值",
          year: "2021年",
          isHaveUpTo: false, //是否有截至日期
        },
        season4: {
          modelId: 66,
          projectTitle: "A股四季度市值",
          year: "2021年",
          isHaveUpTo: false, //是否有截至日期
        },
        recentYear: {
          modelId: 68,
          projectTitle: "A股市值",
          year: "近一年",
          isHaveUpTo: true, //是否有截至日期
        },
        recentHalfYear: {
          modelId: 67,
          projectTitle: "A股市值",
          year: "近半年",
          isHaveUpTo: true, //是否有截至日期
        },
      };
      // console.log(raceTypeObj[raceType])
      this.modelId = raceTypeObj[raceType].modelId;
      this.projectTitle = raceTypeObj[raceType].projectTitle;
      this.year = raceTypeObj[raceType].year;
      this.isHaveUpTo = raceTypeObj[raceType].isHaveUpTo;
      this.endDate = this.$moment().format("YYYY-MM-DD");
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
    //拉数据
    getRaceChartData() {
      return new Promise(async (resolve, reject) => {
        //获得原始数据
        const result = await ApiServe.getData({ model_id: this.modelId });
        const dataOrigin = result.data.data.chart_data_1[0].data;

        //名字和日期去重
        const nameSet = new Set(dataOrigin.sec_name);
        const monthSet = new Set(dataOrigin.yeary);

        this.frameLength = new Set(dataOrigin.yeary).size;

        //通过名字和日期定为到值，组合成新row
        let tempRow = [];
        for (let nameKey of nameSet.keys()) {
          tempRow = [];
          tempRow.push(nameKey);
          for (let monthKey of monthSet.keys()) {
            const nameHitArr = this.getHitArr(dataOrigin.sec_name, nameKey);
            const monthHitArr = this.getHitArr(dataOrigin.yeary, monthKey);
            const acrossIndex = this.getAcrossItem(nameHitArr, monthHitArr);
            // console.log('acrossIndex',acrossIndex);
            tempRow.push(acrossIndex == undefined ? 0 : dataOrigin.totalmv[acrossIndex]);
          }
          this.raceData.push(tempRow);
        }
        //获取表头
        const headArr = this.getHeadArr(monthSet);
        this.raceData.unshift(headArr);

        //增长最快的数据
        const increaseData1 = result.data.data.chart_data_2[0].data;
        this.increaseObj1 = {
          name: increaseData1.secuabbr[0],
          value: increaseData1.totalmvcc[0],
        };
        const increaseData2 = result.data.data.chart_data_2[1].data;
        this.increaseObj2 = {
          name: increaseData2.secuabbr[0],
          value: increaseData2.totalmvcc[0],
        };
        resolve();
      });
    },
    //拉旁白
    getSideVoice() {
      return new Promise(async (resolve, reject) => {
        //获得原始数据
        const { data } = await ApiServe.getVideoData({ model_id: this.modelId });
        const voiceArr = data.data;
        this.sideVoice1 = voiceArr[0].audio_link;
        this.sideVoice2 = voiceArr[1].audio_link;
        //录屏所需的音频参数--第一个旁白
        this.audiosOrderList.push({
          audioLink: voiceArr[0].audio_link, //mp3链接
          timeIndex: 4, //开始播放的时间点
          audioLen: voiceArr[0].audio_length, //音频时长
        });

        //获得第二页的时长，图表和声音以长的为准
        const chartDuration = 2.5 * (this.frameLength + 1);
        const voiceDuration = voiceArr[0].audio_length;
        this.page2Duration = chartDuration > voiceDuration ? chartDuration : voiceDuration;
        console.log('this.page2Duration',this.page2Duration,chartDuration,voiceDuration);

        //第二个旁白
        this.audiosOrderList.push({
          audioLink: voiceArr[1].audio_link, //mp3链接
          timeIndex: 4 + this.page2Duration, //开始播放的时间点
          audioLen: voiceArr[1].audio_length, //音频时长
        });
        resolve();
      });
    },
    //获取表头
    getHeadArr(monthSet) {
      let resultArr = ["市值排行"];
      for (let monthKey of monthSet.keys()) {
        resultArr.push(monthKey);
      }
      return resultArr;
    },
    //输入数组和寻找项，得到命中索引数组
    getHitArr(arr, searchItem) {
      let resultArr = [];
      arr.map((item, index) => {
        if (item == searchItem) {
          resultArr.push(index);
        }
      });
      return resultArr;
    },
    //输入两组数组，得到第一个相交值
    getAcrossItem(arr1, arr2) {
      let result;
      arr1.map((item) => {
        arr2.map((cell) => {
          if (item == cell) {
            result = item;
          }
        });
      });
      return result;
    },
  },
  async mounted() {
    //每个项目都可以独立设置
    setRem(720);

    //从url上读取录屏所需参数
    this.getParams();

    //从url上读取跑马图类型
    this.getRaceType();

    //获得此页面的宽度比例，图表在设置px值的时候都需要乘以这个系数，以得到正确的比例宽度
    this.widthRatio = document.body.clientWidth / 720;

    //初始化粒子背景
    this.initParticle();

    //等待字体，和所需的各种数据，音频的加载全部完成，才能开始播放
    const harmonyMidium = new FontFaceObserver("harmonyRegular");
    const harmonyBold = new FontFaceObserver("harmonyBold");
    await Promise.all([
      harmonyMidium.load(null, 30 * 1000),
      harmonyBold.load(null, 30 * 1000),
      this.getRaceChartData(),
    ]);

    //得到race数据才知道有多少帧，才能和旁白时长对比
    await this.getSideVoice(),

    //开始录屏
    this.startRecord();

    //短暂持续后，封面隐藏
    await sleep(1000);
    this.isLoadingVisible = false;

    // return;

    this.playBgAudio();
    this.page1In();
  },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
