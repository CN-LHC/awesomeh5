<template>
  <div class="holder">
    <h2 id="txt1" v-html="targetTxt"></h2>
  </div>
</template>
<script>
import ScrambleText from "@/utils/ScrambleText.js";
import { sleep } from "@/utils/utils.js";
export default {
  data: function () {
    return {
      scrambleText: null,
      isRunning: true,
      targetArr: ["宁德时代", "首创环保", "上海机场", "中海远航", "华能国际"],
      targetIndex: 0,
      targetTxt: "",
    };
  },
  components: {},
  methods: {
    setTargetTxt() {
      return new Promise((resolve, reject) => {
        this.targetTxt = this.targetArr[this.targetIndex];
        console.log(this.targetTxt);
        this.$nextTick(async () => {
          resolve();
        });
      });
    },
    async run() {
      await this.setTargetTxt();
      this.scrambleText = new ScrambleText(document.getElementById("txt1"), {
        timeOffset: 200,
        callback: () => {
          this.runNext();
        },
      });
      this.scrambleText.play();
      await sleep(900);
      this.scrambleText.start();
    },
    async runNext() {
      await sleep(900);
      this.targetIndex += 1;
      if (this.targetIndex == this.targetArr.length) {
        this.targetIndex = 0;
      }
      this.run();
    },
  },
  async mounted() {
    this.run();
  },
};
</script>
<style lang="less" scoped>
h2 {
  font-size: 30px;
  margin: 20px;
}
.btn {
  background: #333;
  color: #fff;
  border-radius: 5px 10px;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
}
</style>
