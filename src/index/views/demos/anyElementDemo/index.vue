<template>
  <div class="holder">
    <h2>duration</h2>
    <p>默认为1200ms。单个元素的动画持续时长，单位为ms，每个元素的动画时长是一样的</p>

    <h2>delay</h2>
    <p>默认为40ms。元素做动画之间的间隔时间。</p>

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

    <h2>isSplitTxt</h2>
    <p>如果动画对象是文字，则需要isSplitTxt为true，实现分拆文字的目的。</p>

    <h2>toFixed</h2>
    <p>保留小数点后几位。只在numVaryIn时生效，默认为1</p>

    <h2>inEffect</h2>
    <p>
      fadeIn,leftIn,rightIn,topIn,bottomIn,obliqueIn,runIn,perspectiveRightIn1,perspectiveRightIn2,perspectiveRightIn3,perspectiveScaleIn1,perspectiveScaleIn2,rotateIn1,rotateIn2,rotateIn3
    </p>

    <h2>outEffect</h2>
    <p>出场动画类型：fadeOut,topOut,bottomOut,leftOut,rightOut</p>

    <h1>
      inEffect, outEffect
      <span class="in" @click="playIn('typeIn', 'fadeOut')">typeIn,fadeOut</span>
      <span class="in" @click="playIn('fadeIn', 'fadeOut')">fadeIn,fadeOut</span>
      <span class="in" @click="playIn('revealIn', 'fadeOut')">revealIn,fadeOut</span>
      <span class="in" @click="playIn('leftIn', 'leftOut')">leftIn,leftOut</span>
      <span class="in" @click="playIn('rightIn', 'rightOut')">rightIn,rightOut</span>
      <span class="in" @click="playIn('bottomIn', 'topOut')">bottomIn,topOut</span>
      <span class="in" @click="playIn('topIn', 'bottomOut')">topIn,bottomOut</span>
      <span class="in" @click="playIn('obliqueIn', 'fadeOut')">obliqueIn,fadeOut</span>
      <span class="in" @click="playIn('runIn', 'fadeOut')">runIn,fadeOut</span>
      <span class="in" @click="playIn('perspectiveRightIn1', 'fadeOut')">perspectiveRightIn1,fadeOut</span>
      <span class="in" @click="playIn('perspectiveRightIn2', 'fadeOut')">perspectiveRightIn2,fadeOut</span>
      <span class="in" @click="playIn('perspectiveRightIn3', 'fadeOut')">perspectiveRightIn3,fadeOut</span>
      <span class="in" @click="playIn('perspectiveScaleIn1', 'fadeOut')">perspectiveScaleIn1,fadeOut</span>
      <span class="in" @click="playIn('perspectiveScaleIn2', 'fadeOut')">perspectiveScaleIn2,fadeOut</span>
      <span class="in" @click="playIn('rotateIn1', 'fadeOut')">rotateIn1,fadeOut</span>
      <span class="in" @click="playIn('rotateIn2', 'fadeOut')">rotateIn2,fadeOut</span>
      <span class="in" @click="playIn('rotateIn3', 'fadeOut')">rotateIn3,fadeOut</span>
      <span class="out" @click="playOut">出场</span>
    </h1>

    <div class="boxes_holder" id="boxesGroup1">
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
    </div>
    <div class="welcome" id="welcome1">
      成为每一个股民的指路灯塔<br>
      成为每一个股民的指路灯塔<br>
      成为每一个股民的指路灯塔<br>
      成为每一个股民的指路灯塔
    </div>

    <br />
    <br />
    <br />

    <h1>
      numVaryIn 效果，此时会忽略delay参数和isSplitTxt参数
      <span class="in" @click="playNumVaryIn">numVaryIn,fadeOut</span>
      <span class="out" @click="playNumVaryOut">出场</span>
    </h1>
    <div class="number" id="number">26.35</div>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import { anyElement } from "@/components/anyElement.js";
export default {
  data: function () {
    return {
      boxes1: null,
    };
  },
  components: {},
  methods: {
    playIn(inEffect, outEffect) {
      const _outEffect = outEffect == undefined ? "fadeOut" : outEffect;
      this.box = null;
      this.box = anyElement({
        targets: document.querySelectorAll(`#boxesGroup1 .box`),
        duration: 1200,
        delay: 40,
        easing: "easeOutQuint",
        inEffect: inEffect,
        outEffect: _outEffect,
      });
      this.txt = null;
      this.txt = anyElement({
        targets: document.querySelector("#welcome1"),
        isSplitTxt: true,
        duration: 1000,
        delay: 60,
        easing: "easeOutQuint",
        inEffect: inEffect,
        outEffect: _outEffect,
      });

      this.box.goIn.restart();
      this.txt.goIn.restart();
    },
    playOut() {
      this.box.goOut.restart();
      this.txt.goOut.restart();
    },
    playNumVaryIn() {
      this.number = anyElement({
        targets: document.querySelector("#number"),
        duration: 1200,
        toFixed: 2,
        easing: "easeOutQuint",
        inEffect: "numVaryIn",
        outEffect: "fadeOut",
      });
      this.number.goIn.restart();
    },
    playNumVaryOut() {
      this.number.goOut.restart();
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
    display: inline-block;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    background: #999;
    color: #fff;
    user-select: none;
    margin: 0 3px 4px;
  }
  span.in {
    background: #447746;
  }
  span.out {
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

.boxes_holder {
  display: flex;
  flex-direction: row;
  .box {
    width: 40px;
    height: 40px;
    margin: 5px;
    opacity: 0;
  }
  .box1 {
    background: #888;
  }
  .box2 {
    background: #ccc;
  }
  .box3 {
    background: #f0a;
  }
}
@font-face {
  font-family: "harmony-bold"; /* Project id  */
  src: url("../../../../assets/fonts/HarmonyOS_Sans_SC_Bold.ttf?t=1638171342335") format("truetype");
}
.hidden {
  opacity: 0;
}
.welcome {
  font-size: 30px;
  font-family: "harmony-bold";
  overflow: hidden;
  /deep/ .letter {
    display: inline-block;
  }
  /deep/ .red {
    color: #f00;
  }
  /deep/ .blue:nth-of-type(2n+1){
    color: #07a588;
  }
  /deep/ .blue:nth-of-type(2n){
    color: #035546;
  }
}
.number {
  font-size: 30px;
  font-family: "harmony-bold";
}
</style>
