<template>
  <div class="holder">
    <h2>duration</h2>
    <p>默认为1200ms。单个元素入场动画的持续时长，单位为ms，每个元素的动画时长是一样的</p>

    <h2>staggerSpeed   (stagger的意思是错开)</h2>
    <p>默认为normal。内部众元素错开出场的连贯性：verySlow,slow,normal,fast,veryFast。</p>

    <h2>easing 直观体验easing加速减速 <a href="https://easings.co" target="_blank">https://easings.co</a></h2>
    <p>默认为easeOutExpo</p>
    <p>linear 线性;</p>
    <p>
      in类
      加速运动：easeInQuad,easeInCubic,easeInQuart,easeInQuint,easeInSine,easeInExpo,easeInCirc,easeInBack,easeInBounce
    </p>
    <p>
      out类
      减速运动：easeOutQuad,easeOutCubic,easeOutQuart,easeOutQuint,easeOutSine,easeOutExpo,easeOutCirc,easeOutBack,easeOutBounce
    </p>
    <p>
      inOut类
      先加速再减速：easeInOutQuad,easeInOutCubic,easeInOutQuart,easeInOutQuint,easeInOutSine,easeInOutExpo,easeInOutCirc,easeInOutBack,easeInOutBounce
    </p>
    <p>
      outIn类
      先减速再加速：easeOutInQuad,easeOutInCubic,easeOutInQuart,easeOutInQuint,easeOutInSine,easeOutInExpo,easeOutInCirc,easeOutInBack,easeOutInBounce
    </p>

    <h2>inEffect</h2>
    <p>
      入场动画类型：typeIn,fadeIn,leftIn,rightIn,topIn,bottomIn,obliqueIn,runIn,perspectiveRightIn1,perspectiveRightIn2,perspectiveRightIn3,perspectiveScaleIn1,perspectiveScaleIn2,rotateIn1,rotateIn2,rotateIn3
    </p>

    <h2>outEffect</h2>
    <p>出场动画类型：fadeOut,topOut,bottomOut,leftOut,rightOut,zoomOut</p>

    <h2>
      customLetterClass
      自定义文字的class名，如果传入，则会寻找内部的class名，依次做动画，那么动画对象就不限于纯文本，可以是任意元素
    </h2>
    <p></p>

    <h2>inEffect</h2>
    <h1>
      numVaryIn **出场动画只支持fadeOut** <span @click="playIn('refAnimeTxt0')">入场</span>
      <span @click="playOut('refAnimeTxt0')">出场</span>
    </h1>
    <p>numVaryIn 必须指定toFixed ，0是整数，1是小数点后1位，以此类推</p>
    <anime-txt
      ref="refAnimeTxt0"
      id="refAnimeTxt0"
      class="anime_txt"
      duration="2400"
      txt="56"
      easing="easeOutQuart"
      staggerSpeed="normal"
      inEffect="numVaryIn"
      toFixed="1"
      outEffect="fadeOut"
    />

    <h1>typeIn <span @click="playIn('refAnimeTxt1')">入场</span> <span @click="playOut('refAnimeTxt1')">出场</span></h1>
<p>typeIn效果时，忽略duration参数，打字速度由staggerSpeed调节</p>
    <anime-txt
      ref="refAnimeTxt1"
      id="refAnimeTxt1"
      class="anime_txt"
      txt="今日行情速递"
      duration="20"
      easing="easeOutQuart"
      staggerSpeed="normal"
      inEffect="typeIn"
      outEffect="fadeOut"
    />
    <h1>
      fadeIn <span @click="playIn('refAnimeTxt1-2')">入场</span> <span @click="playOut('refAnimeTxt1-2')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt1-2"
      id="refAnimeTxt1-2"
      class="anime_txt"
      txt="今日行情速递"
      duration="1600"
      easing="easeOutQuart"
      staggerSpeed="fast"
      inEffect="fadeIn"
      outEffect="fadeOut"
    />

    <h1>leftIn <span @click="playIn('refAnimeTxt2')">入场</span> <span @click="playOut('refAnimeTxt2')">出场</span></h1>
    <anime-txt
      ref="refAnimeTxt2"
      id="refAnimeTxt2"
      class="anime_txt"
      txt="今日行情速递"
      duration="400"
      easing="easeInOutExpo"
      staggerSpeed="fast"
      inEffect="leftIn"
      outEffect="fadeOut"
    />

    <h1>
      rightIn <span @click="playIn('refAnimeTxt3')">入场</span> <span @click="playOut('refAnimeTxt3')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt3"
      id="refAnimeTxt3"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeInOutExpo"
      staggerSpeed="normal"
      inEffect="rightIn"
      outEffect="fadeOut"
    />

    <h1>topIn <span @click="playIn('refAnimeTxt4')">入场</span> <span @click="playOut('refAnimeTxt4')">出场</span></h1>
    <anime-txt
      ref="refAnimeTxt4"
      id="refAnimeTxt4"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="topIn"
      outEffect="fadeOut"
    />

    <h1>
      bottomIn <span @click="playIn('refAnimeTxt5')">入场</span> <span @click="playOut('refAnimeTxt5')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt5"
      id="refAnimeTxt5"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="bottomIn"
      outEffect="fadeOut"
    />

    <h1>
      obliqueIn <span @click="playIn('refAnimeTxt6')">入场</span> <span @click="playOut('refAnimeTxt6')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt6"
      id="refAnimeTxt6"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="obliqueIn"
      outEffect="fadeOut"
    />

    <h1>runIn <span @click="playIn('refAnimeTxt7')">入场</span> <span @click="playOut('refAnimeTxt7')">出场</span></h1>
    <anime-txt
      ref="refAnimeTxt7"
      id="refAnimeTxt7"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="runIn"
      outEffect="fadeOut"
    />

    <h1>
      perspectiveRightIn1 <span @click="playIn('refAnimeTxt8')">入场</span>
      <span @click="playOut('refAnimeTxt8')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt8"
      id="refAnimeTxt8"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="perspectiveRightIn1"
      outEffect="fadeOut"
    />

    <h1>
      perspectiveRightIn2 <span @click="playIn('refAnimeTxt9')">入场</span>
      <span @click="playOut('refAnimeTxt9')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt9"
      id="refAnimeTxt9"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="perspectiveRightIn2"
      outEffect="fadeOut"
    />

    <h1>
      perspectiveRightIn3 <span @click="playIn('refAnimeTxt10')">入场</span>
      <span @click="playOut('refAnimeTxt10')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt10"
      id="refAnimeTxt10"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="perspectiveRightIn3"
      outEffect="fadeOut"
    />

    <h1>
      perspectiveScaleIn1 <span @click="playIn('refAnimeTxt11')">入场</span>
      <span @click="playOut('refAnimeTxt11')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt11"
      id="refAnimeTxt11"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="perspectiveScaleIn1"
      outEffect="fadeOut"
    />

    <h1>
      perspectiveScaleIn2 <span @click="playIn('refAnimeTxt12')">入场</span>
      <span @click="playOut('refAnimeTxt12')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt12"
      id="refAnimeTxt12"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="normal"
      inEffect="perspectiveScaleIn2"
      outEffect="fadeOut"
    />

    <h1>
      rotateIn1 <span @click="playIn('refAnimeTxt13')">入场</span> <span @click="playOut('refAnimeTxt13')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt13"
      id="refAnimeTxt13"
      class="anime_txt anime_overflow"
      txt="今日行情速递今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="rotateIn1"
      outEffect="fadeOut"
    />

    <h1>
      rotateIn2 <span @click="playIn('refAnimeTxt14')">入场</span> <span @click="playOut('refAnimeTxt14')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt14"
      id="refAnimeTxt14"
      class="anime_txt anime_overflow"
      txt="今日行情速递今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="rotateIn2"
      outEffect="fadeOut"
    />

    <h1>
      rotateIn3 <span @click="playIn('refAnimeTxt15')">入场</span> <span @click="playOut('refAnimeTxt15')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt15"
      id="refAnimeTxt15"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="normal"
      inEffect="rotateIn3"
      outEffect="fadeOut"
    />

    <h2>outEffect</h2>
    <h1>
      fadeOut <span @click="playIn('refAnimeTxt16')">入场</span> <span @click="playOut('refAnimeTxt16')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt16"
      id="refAnimeTxt16"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="typeIn"
      outEffect="fadeOut"
    />

    <h1>
      topOut <span @click="playIn('refAnimeTxt17')">入场</span> <span @click="playOut('refAnimeTxt17')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt17"
      id="refAnimeTxt17"
      class="anime_txt"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="bottomIn"
      outEffect="topOut"
    />
    <h1>
      bottomOut <span @click="playIn('refAnimeTxt18')">入场</span> <span @click="playOut('refAnimeTxt18')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt18"
      id="refAnimeTxt18"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="topIn"
      outEffect="bottomOut"
    />

    <h1>
      leftOut <span @click="playIn('refAnimeTxt19')">入场</span> <span @click="playOut('refAnimeTxt19')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt19"
      id="refAnimeTxt19"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="rightIn"
      outEffect="leftOut"
    />

    <h1>
      rightOut <span @click="playIn('refAnimeTxt20')">入场</span> <span @click="playOut('refAnimeTxt20')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt20"
      id="refAnimeTxt20"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="leftIn"
      outEffect="rightOut"
    />

    <h1>
      zoomOut <span @click="playIn('refAnimeTxt21')">入场</span> <span @click="playOut('refAnimeTxt21')">出场</span>
    </h1>
    <anime-txt
      ref="refAnimeTxt21"
      id="refAnimeTxt21"
      class="anime_txt anime_overflow"
      txt="今日行情速递"
      duration="1000"
      easing="easeOutExpo"
      staggerSpeed="fast"
      inEffect="leftIn"
      outEffect="zoomOut"
    />

    <h1>
      isCustomLetter，是否为个性化letter，需要保证单个元素的class名为letter。可以是图片等任何元素
      <span @click="playIn('refAnimeTxt22')">入场</span> <span @click="playOut('refAnimeTxt22')">出场</span>
    </h1>
    <div class="welcome_holder">
      <anime-txt
        ref="refAnimeTxt22"
        id="refAnimeTxt22"
        class="anime_txt"
        duration="1000"
        txt="今日行情速递"
        easing="easeOutExpo"
        staggerSpeed="fast"
        inEffect="perspectiveScaleIn2"
        outEffect="leftOut"
        :isCustomLetter="true"
      >
        <div class="welcome_txt">
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
          <span class="letter"> </span>
        </div>
      </anime-txt>
    </div>
  </div>
</template>
<script>
import animeTxt from "@/components/animeTxt/index.vue";
export default {
  data: function () {
    return {};
  },
  components: {
    animeTxt,
  },
  methods: {
    playIn(refName) {
      this.$refs[refName].playIn();
    },
    playOut(refName) {
      this.$refs[refName].playOut();
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.holder {
  padding: 20px;
}
h1 {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: normal;
  color: #333;
  span {
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    background: #999;
    color: #fff;
    user-select: none;
    margin: 0 3px;
  }
  span:nth-of-type(1) {
    background: #447746;
  }
  span:nth-of-type(2) {
    background: #953e23;
  }
}
h2 {
  font-size: 15px;
  color: #000;
  margin-bottom: 10px;
  font-weight: bold;
}
p {
  margin-bottom: 20px;
}

.anime_txt {
  font-size: 28px;
  pointer-events: none;
}
.anime_overflow {
  overflow: hidden;
  display: inline-block;
}

.welcome_holder {
  background: #333;
  padding: 50px;
}
.welcome_txt {
  display: inline-block;
  .letter {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin: 0 3px;
  }
  .letter:nth-child(1) {
    background: url(../../../../assets/images/welcome/welcome1.png);
    background-size: 100% auto;
  }
  .letter:nth-child(2) {
    background: url(../../../../assets/images/welcome/welcome2.png);
    background-size: 100% auto;
  }
  .letter:nth-child(3) {
    background: url(../../../../assets/images/welcome/welcome3.png);
    background-size: 100% auto;
  }
  .letter:nth-child(4) {
    background: url(../../../../assets/images/welcome/welcome4.png);
    background-size: 100% auto;
  }
  .letter:nth-child(5) {
    background: url(../../../../assets/images/welcome/welcome5.png);
    background-size: 100% auto;
  }
  .letter:nth-child(6) {
    background: url(../../../../assets/images/welcome/welcome6.png);
    background-size: 100% auto;
  }
  .letter:nth-child(7) {
    background: url(../../../../assets/images/welcome/welcome7.png);
    background-size: 100% auto;
  }
  .letter:nth-child(8) {
    background: url(../../../../assets/images/welcome/welcome8.png);
    background-size: 100% auto;
  }
}
</style>
