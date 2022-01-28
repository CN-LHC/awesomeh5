<template>
  <div :class="`anime_txt ${isPlaying ? '' : 'hidden'}`" :id="id">
    <span v-if="!isCustomLetter && inEffect != 'numVaryIn'">{{ txt }}</span>
    <slot v-if="isCustomLetter"></slot>
    <span v-if="inEffect == 'numVaryIn'" class="num_vary"></span>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { sleep } from "@/utils/utils.js";
export default {
  props: ["id", "txt", "staggerSpeed", "duration", "toFixed", "easing", "inEffect", "outEffect", "isCustomLetter"],
  // mixins: [inEffect,outEffect],
  data() {
    return {
      animationIn: null, //入场动画
      animationOut: null, //出场动画
      delay: 0, //单个元素动画的间隔时间
      isPlaying: false,
      animeIn: null,
    };
  },
  methods: {
    async playIn() {
      if (this.isPlaying) {
        return;
      }
      this.isPlaying = true;
      this.animationIn.restart();
    },
    async playOut() {
      this.animationOut.restart();
    },
    init() {
      //自定义元素和数字跳动不拆分文字
      if (!this.isCustomLetter && this.inEffect != "numVaryIn") {
        this.spliteLetters();
      }

      if (this.inEffect == "typeIn") {
        console.log(this.duration);
      }
      this.getDelay();
      this.initAnimeInObj();
      this.getInEffect();
      this.getOutEffect();
    },
    spliteLetters() {
      const txt = document.querySelector(`#${this.id}`);
      txt.innerHTML = txt.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    initAnimeInObj() {
      const duration = this.duration == undefined ? 1200 : this.duration;
      this.animeIn = {
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [0, 1],
        delay: anime.stagger(this.delay),
        duration: duration,
        easing: this.easing == undefined ? "easeOutExpo" : this.easing,
        autoplay: false,
      };
    },
    //根据速度获取间隔delay
    getDelay() {
      const delayObj = {
        verySlow: 300,
        slow: 180,
        normal: 120,
        fast: 60,
        veryFast: 30,
        undefined: 120,
      };
      this.delay = delayObj[this.staggerSpeed];
    },
    getInEffect() {
      this[this.inEffect]();
    },
    getOutEffect() {
      this[this.outEffect]();
    },
    numVaryIn() {
      let myObject = {
        num: 0,
      };
      const toFixed = this.toFixed == undefined ? 1 : this.toFixed;
      this.animationIn = anime({
        targets: myObject,
        num: this.txt,
        duration: this.duration,
        easing: this.easing == undefined ? "easeOutExpo" : this.easing,
        autoplay: false,
        update: async () => {
          document.querySelector(`#${this.id} .num_vary`).innerHTML = (myObject.num * 1).toFixed(toFixed);
        },
      });
    },
    typeIn() {
      this.animationIn = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [0, 1],
        delay: anime.stagger(this.delay),
        duration: 10,
        easing: this.easing == undefined ? "easeOutExpo" : this.easing,
        autoplay: false,
      });
    },
    fadeIn() {
      this.animationIn = anime(
        Object.assign(
          {
            duration: 2000,
          },
          this.animeIn
        )
      );
    },
    leftIn() {
      this.animationIn = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        delay: anime.stagger(this.delay, { from: "last" }),
        duration: this.duration,
        opacity: [0, 1],
        translateX: ["-1em", 0],
        easing: this.easing == undefined ? "easeOutExpo" : this.easing,
        autoplay: false,
      });
    },
    rightIn() {
      this.animationIn = anime(
        Object.assign(
          {
            translateX: ["1em", 0],
          },
          this.animeIn
        )
      );
    },
    topIn() {
      this.animationIn = anime(
        Object.assign(
          {
            translateY: ["-1em", 0],
          },
          this.animeIn
        )
      );
      this.animationIn.pause();
    },
    bottomIn() {
      this.animationIn = anime(
        Object.assign(
          {
            translateY: ["1em", 0],
          },
          this.animeIn
        )
      );
    },
    obliqueIn() {
      this.animationIn = anime(
        Object.assign(
          {
            translateX: ["1em", 0],
            translateY: ["1em", 0],
          },
          this.animeIn
        )
      );
    },
    runIn() {
      this.animationIn = anime(
        Object.assign(
          {
            skewX: ["60deg", "0deg"],
            translateX: ["2.6em", 0],
          },
          this.animeIn
        )
      );
    },
    perspectiveRightIn1() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [3.2, 1],
            translateX: ["1.8em", 0],
            rotateX: ["20deg", 0],
            rotateY: ["70deg", 0],
            rotateZ: ["7deg", 0],
            perspective: "1000px",
          },
          this.animeIn
        )
      );
    },
    perspectiveRightIn2() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [2.5, 1],
            translateX: ["2.8em", 0],
            translateY: ["-0.4em", 0],
            rotateX: ["-20deg", 0],
            rotateY: ["-70deg", 0],
            rotateZ: ["-12deg", 0],
            perspective: "1800px",
          },
          this.animeIn
        )
      );
    },
    perspectiveRightIn3() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [2.9, 1],
            translateX: ["1.2em", 0],
            translateY: ["-0.4em", 0],
            rotateX: ["-50deg", 0],
            rotateY: ["-20deg", 0],
            rotateZ: ["-4deg", 0],
            perspective: "1200px",
          },
          this.animeIn
        )
      );
    },
    perspectiveScaleIn1() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [0.7, 1],
            translateX: ["1.6em", 0],
            rotateX: ["70deg", 0],
            rotateY: ["40deg", 0],
            perspective: "1500px",
          },
          this.animeIn
        )
      );
    },
    perspectiveScaleIn2() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [2.9, 1],
            translateX: ["0.6em", 0],
            rotateX: ["20deg", 0],
            rotateY: ["20deg", 0],
            perspective: "1500px",
          },
          this.animeIn
        )
      );
    },
    rotateIn1() {
      this.animationIn = anime(
        Object.assign(
          {
            translateY: ["1.6em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [90, 0],
          },
          this.animeIn
        )
      );
    },
    rotateIn2() {
      this.animationIn = anime(
        Object.assign(
          {
            translateY: ["-1.6em", 0],
            translateX: ["1.5em", 0],
            rotateZ: [-70, 0],
          },
          this.animeIn
        )
      );
    },
    rotateIn3() {
      this.animationIn = anime(
        Object.assign(
          {
            scale: [1.3, 1],
            translateY: ["-1.6em", 0],
            translateX: ["-1.5em", 0],
            translateZ: ["-6.9em", 0],
            rotateX: [-40, 0],
            rotateY: [-20, 0],
            rotateZ: [-40, 0],
            perspective: "1500px",
            duration: 800,
          },
          this.animeIn
        )
      );
    },

    //出场动画
    fadeOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [1, 0],
        duration: 400,
        easing: this.easing == undefined ? "easeOutExpo" : this.easing,
        autoplay: false,
        complete: () => {
          this.isPlaying = false;
        },
      });
    },
    topOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [1, 0],
        scale: [1, 1],
        translateX: [0, 0],
        translateY: [0, "-0.2em"],
        translateZ: [0, 0],
        rotateX: [0, 0],
        rotateY: [0, 0],
        rotateZ: [0, 0],
        duration: 320,
        delay: anime.stagger(30),
        easing: "easeInQuart",
        complete: () => {
          this.isPlaying = false;
        },
      });
    },
    bottomOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [1, 0],
        scale: [1, 1],
        translateX: [0, 0],
        translateY: [0, "0.2em"],
        translateZ: [0, 0],
        rotateX: [0, 0],
        rotateY: [0, 0],
        rotateZ: [0, 0],
        duration: 320,
        delay: anime.stagger(30),
        easing: "easeInQuart",
        complete: () => {
          this.isPlaying = false;
        },
      });
    },
    leftOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [1, 0],
        scale: [1, 1],
        translateX: [0, "-0.4em"],
        translateY: [0, 0],
        translateZ: [0, 0],
        rotateX: [0, 0],
        rotateY: [0, 0],
        rotateZ: [0, 0],
        duration: 320,
        delay: anime.stagger(30),
        easing: "easeInQuart",
        complete: () => {
          this.isPlaying = false;
        },
      });
    },
    rightOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id} .letter`),
        opacity: [1, 0],
        scale: [1, 1],
        translateX: [0, "0.8em"],
        translateY: [0, 0],
        translateZ: [0, 0],
        rotateX: [0, 0],
        rotateY: [0, 0],
        rotateZ: [0, 0],
        duration: 320,
        delay: anime.stagger(30, { from: "last" }),
        easing: "easeInQuart",
        complete: () => {
          this.isPlaying = false;
        },
      });
    },
    zoomOut() {
      this.animationOut = anime({
        targets: document.querySelectorAll(`#${this.id}`),
        opacity: [1, 0],
        scale: [1, 1.6],
        translateX: [0, 0],
        translateY: [0, 0],
        translateZ: [0, 0],
        rotateX: [0, 0],
        rotateY: [0, 0],
        rotateZ: [0, 0],
        duration: 320,
        easing: "easeInQuart",
        complete: () => {
          this.isPlaying = false;
          document.querySelectorAll(`#${this.id}`)[0].removeAttribute("style");
        },
      });
      this.animationOut.pause();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.hidden {
  opacity: 0;
}
.anime_txt {
  font-size: 26px;
  margin-bottom: 20px;

  /deep/ .letter {
    display: inline-block;
  }
}
</style>
