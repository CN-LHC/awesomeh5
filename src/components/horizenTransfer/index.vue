<template>
  <div :id="id">
    <div :class="`mask_holder ${direction}`">
      <slot name="frontImage"></slot>
    </div>
    <div :class="`bars ${effect} ${direction}`">
      <div class="bar1" :style="`background:${color1}`"></div>
      <div class="bar2" :style="`background:${color2}`"></div>
      <div class="bar3" :style="`background:${color3}`"></div>
    </div>
    <slot name="backImage"></slot>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { sleep } from "@/utils/utils.js";
export default {
  props: ["id", "duration", "direction", "effect", "colors"],
  data() {
    return {
      isPlaying: false,
      isMaskAnimeRuned: false, //遮罩层是否开始跑了
      maskAnime: null, //遮罩层动画
      barsAnime: null, //bars动画
      color1: "transparent",
      color2: "transparent",
      color3: "transparent",

      //不同的effect对应一下参数都会不一样
      durationRatio: 0.7, //遮罩层会后出现，所以duration需要有一个系数
      triggerProgress: 40, //bars先动，动到某个百分比的时候，遮罩层开始动
      easing: "", //加速减速
    };
  },
  methods: {
    async play() {
      if (this.isPlaying) {
        return;
      }
      this.reset();
      this.isPlaying = true;
      this.barsAnime.restart();
    },
    async reset() {
      if (this.isPlaying) {
        return;
      }
      this.isMaskAnimeRuned = false;
      document.querySelector(`#${this.id} .mask_holder`).removeAttribute("style");
      document.querySelector(`#${this.id} .bars`).removeAttribute("style");
    },
    async init() {
      await this.getEffect();
      console.log("this.direction", this.direction);
      if (this.direction == "left2right") {
        this.initLeft2Right();
      } else if (this.direction == "right2left") {
        this.initRight2Left();
      }
    },
    getEffect() {
      return new Promise((resolve, reject) => {
        if (this.effect == "filter1") {
          this.durationRatio = 0.7;
          this.triggerProgress = 40;
          this.easing = "easeOutQuad";
        } else if (this.effect == "filter2") {
          this.durationRatio = 0.5;
          this.triggerProgress = 21;
          this.easing = "easeOutCubic";
        } else if (this.effect == "colors") {
          this.durationRatio = 0.84;
          this.triggerProgress = 9;
          this.easing = "easeOutQuint";
          this.color1 = this.colors[0];
          this.color2 = this.colors[1];
          this.color3 = this.colors[2];
        }
        this.$nextTick(() => {
          resolve();
        });
      });
    },
    initLeft2Right() {
      this.maskAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .mask_holder`),
        duration: this.duration * this.durationRatio,
        width: [0, "100%"],
        easing: this.easing,
        autoplay: false,
      });
      this.barsAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bars`),
        duration: this.duration,
        left: [0, "100%"],
        translateX: ["-100%", "0"],
        easing: this.easing,
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
        update: (anim) => {
          if (anim.progress > this.triggerProgress && !this.isMaskAnimeRuned) {
            this.isMaskAnimeRuned = true;
            this.maskAnime.restart();
          }
        },
      });
    },
    initRight2Left() {
      this.maskAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .mask_holder`),
        duration: this.duration * this.durationRatio,
        width: [0, "100%"],
        easing: this.easing,
        autoplay: false,
      });
      this.barsAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bars`),
        duration: this.duration,
        right: [0, "100%"],
        translateX: ["100%", "0"],
        easing: this.easing,
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
        update: (anim) => {
          if (anim.progress > this.triggerProgress && !this.isMaskAnimeRuned) {
            this.isMaskAnimeRuned = true;
            this.maskAnime.restart();
          }
        },
      });
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
