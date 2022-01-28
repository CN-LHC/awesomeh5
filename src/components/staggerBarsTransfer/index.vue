<template>
  <div :id="id">
    <div :class="`bars ${direction}`">
      <!-- {{colors}} -->
      <div class="bar" v-for="(item, index) in colors" :key="index" :style="`flex:${finalFlex[index]}`">
        <span class="bar_inside1">
          <span class="bar_inside2" :style="`background:${colors[index]}`"></span>
        </span>
      </div>
    </div>
    <slot name="frontImage"></slot>
    <slot name="backImage"></slot>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { sleep, randomNum } from "@/utils/utils.js";
export default {
  props: ["id", "duration", "from", "direction", "effect", "colors", "flex"],
  data() {
    return {
      isPlaying: false,
      finalFlex: [],
      barsInAnime: null, //遮罩层动画
      barsOutAnime: null, //bars动画

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
      this.barsInAnime.restart();
    },
    async reset() {
      if (this.isPlaying) {
        return;
      }
      this.colors.map((item, index) => {
        document.querySelectorAll(`#${this.id} .bar_inside1`)[index].removeAttribute("style");
        document.querySelectorAll(`#${this.id} .bar_inside1`)[index].style.backgroundColor = this.color1;
      });
      document.querySelector(`#${this.id} .front_image`).removeAttribute("style");
      document.querySelector(`#${this.id} .back_image`).removeAttribute("style");
    },
    async init() {
      await this.getSettings();
      if (this.direction == "left2right") {
        this.initLeft2Right();
      } else if (this.direction == "right2left") {
        this.initRight2Left();
      } else if (this.direction == "bottom2top") {
        this.initBottom2Top();
      } else if (this.direction == "top2bottom") {
        this.initTop2Bottom();
      }
    },
    getSettings() {
      return new Promise((resolve, reject) => {
        if (this.flex == "random") {
          this.colors.map(() => {
            this.finalFlex.push(randomNum(1, 3));
          });
          console.log("this.finalFlex", this.finalFlex);
        } else {
          this.finalFlex = this.flex;
        }
        if (this.from == undefined) {
          this.from = "first";
        }
        this.$nextTick(() => {
          resolve();
        });
      });
    },
    initLeft2Right() {
      this.barsOutAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        translateX: [0, "100%"],
        easing: "easeInCubic",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
      });
      this.barsInAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        width: [0, "100%"],
        easing: "easeOutCubic",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
          document.querySelector(`#${this.id} .front_image`).style.opacity = "1";
          document.querySelector(`#${this.id} .back_image`).style.opacity = "0";
          this.barsOutAnime.play();
        },
      });
    },
    initRight2Left() {
      this.barsOutAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        translateX: [0, "-100%"],
        easing: "easeInQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
      });
      this.barsInAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        width: [0, "100%"],
        easing: "easeOutQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
          document.querySelector(`#${this.id} .front_image`).style.opacity = "1";
          document.querySelector(`#${this.id} .back_image`).style.opacity = "0";
          this.barsOutAnime.play();
        },
      });
    },
    initBottom2Top() {
      this.barsOutAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        translateY: [0, "-100%"],
        easing: "easeInQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
      });
      this.barsInAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        height: [0, "100%"],
        easing: "easeOutQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
          document.querySelector(`#${this.id} .front_image`).style.opacity = "1";
          document.querySelector(`#${this.id} .back_image`).style.opacity = "0";
          this.barsOutAnime.play();
        },
      });
    },
    initTop2Bottom() {
      this.barsOutAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        translateY: [0, "100%"],
        easing: "easeInQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
      });
      this.barsInAnime = anime({
        targets: document.querySelectorAll(`#${this.id} .bar_inside1`),
        delay: anime.stagger(50, { from: this.from }),
        duration: this.duration,
        height: [0, "100%"],
        easing: "easeOutQuad",
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
          document.querySelector(`#${this.id} .front_image`).style.opacity = "1";
          document.querySelector(`#${this.id} .back_image`).style.opacity = "0";
          this.barsOutAnime.play();
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
