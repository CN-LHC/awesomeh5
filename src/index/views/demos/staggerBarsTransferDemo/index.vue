<template>
  <div class="holder">
    <h1>duration</h1>
    <p>入场时长和出场时长</p>

    <h1>direction</h1>
    <p>转场方向：left2right,right2left</p>

    <h1>colors</h1>
    <p>接受一个数组形如 :colors="['#393', '#9c0', '#ffc']"，个数不限</p>

    <h1>flex</h1>
    <p>
      每个bar的高度占比。接受一个数组，个数必须和colors个数保持一致；同时还接受字符串random，这样就可以当colors比较多的时候，不用自己一个一个写了
    </p>

    <h1>from</h1>
    <p>出场顺序，默认为first。有三个值：first，center，last，决定元素的出场顺序</p>

    <h1>
      自定义颜色数量，自定义bar的高度占比
      <span @click="play('refStaggerBars1')">播放</span>
      <span @click="reset('refStaggerBars1')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars1"
        id="refStaggerBars1"
        duration="300"
        direction="left2right"
        :colors="['#b6c29a', '#8a977d', '#b6c29a', '#8a977d', '#8a977d']"
        :flex="[1, 2, 3, 2, 1]"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>

    <h1>
      自定义颜色数量，高度占比随机
      <span @click="play('refStaggerBars2')">播放</span>
      <span @click="reset('refStaggerBars2')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars2"
        id="refStaggerBars2"
        duration="300"
        direction="left2right"
        :colors="['#b6c29a', '#8a977d', '#b6c29a', '#8a977d', '#8a977d', '#b6c29a', '#8a977d', '#b6c29a']"
        flex="random"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>

    <h1>
      from 为 center， 中间先出
      <span @click="play('refStaggerBars3')">播放</span>
      <span @click="reset('refStaggerBars3')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars3"
        id="refStaggerBars3"
        duration="300"
        from="center"
        direction="left2right"
        :colors="[
          '#b6c29a',
          '#8a977d',
          '#b6c29a',
          '#8a977d',
          '#8a977d',
          '#b6c29a',
          '#8a977d',
        ]"
        flex="random"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>

    <h1>
      从右往左
      <span @click="play('refStaggerBars4')">播放</span>
      <span @click="reset('refStaggerBars4')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars4"
        id="refStaggerBars4"
        duration="400"
        direction="right2left"
        :colors="['#993333', '#CC9966', '#003300','#993333', '#CC9966', '#003300']"
        flex="random"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>
    
    
    <h1>
      从下往上
      <span @click="play('refStaggerBars5')">播放</span>
      <span @click="reset('refStaggerBars5')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars5"
        id="refStaggerBars5"
        duration="400"
        direction="bottom2top"
        :colors="['#993333', '#CC9966', '#003300','#993333', '#CC9966', '#003300']"
        flex="random"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>
    
    
    <h1>
      从上往下
      <span @click="play('refStaggerBars6')">播放</span>
      <span @click="reset('refStaggerBars6')">复原</span>
    </h1>
    <div class="page">
      <stagger-bars-transfer
        ref="refStaggerBars6"
        id="refStaggerBars6"
        duration="400"
        direction="top2bottom"
        :colors="['#993333', '#CC9966', '#003300','#993333', '#CC9966', '#003300']"
        flex="random"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </stagger-bars-transfer>
    </div>
  </div>
</template>
<script>
import horizenTransfer from "@/components/horizenTransfer/index.vue";
import staggerBarsTransfer from "@/components/staggerBarsTransfer/index.vue";
export default {
  data: function () {
    return {};
  },
  components: { horizenTransfer, staggerBarsTransfer },
  methods: {
    play(refName) {
      this.$refs[refName].play();
    },
    reset(refName) {
      this.$refs[refName].reset();
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

.page {
  width: 437px;
  height: 751px;
  overflow: hidden;
  position: relative;
  margin-bottom: 100px;
  .back_image {
    width: 437px;
    height: 751px;
    background: url(../../../../assets/images/bg1.png);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .front_image {
    width: 437px;
    height: 751px;
    background: url(../../../../assets/images/bg2.png);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
</style>
