<template>
  <div class="holder">
    <h1>duration</h1>
    <p>转场持续时长，毫秒单位</p>

    <h1>effect</h1>
    <p>filter1,filter2,colors等</p>

    <h1>direction</h1>
    <p>转场方向：left2right,right2left</p>

    <h1>colors</h1>
    <p>接受一个固定的三个元素的数组，形如 :colors="['#393', '#9c0', '#ffc']"，只在effect为colors的时候有效</p>

    <h1>
      filter1 <span @click="play('refTransfer1')">播放</span>
      <span @click="reset('refTransfer1')">复原</span>
    </h1>
    <div class="page">
      <horizen-transfer ref="refTransfer1" id="refTransfer1" duration="1500" effect="filter1" direction="left2right">
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </horizen-transfer>
    </div>

    <h1>
      filter2 <span @click="play('refTransfer2')">播放</span>
      <span @click="reset('refTransfer2')">复原</span>
    </h1>
    <div class="page">
      <horizen-transfer ref="refTransfer2" id="refTransfer2" duration="1500" effect="filter2" direction="left2right">
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </horizen-transfer>
    </div>

    <h1>
      colors 自己传入colors ['#393', '#9c0', '#ffc'] <span @click="play('refTransfer3')">播放</span>
      <span @click="reset('refTransfer3')">复原</span>
    </h1>
    <div class="page">
      <horizen-transfer
        ref="refTransfer3"
        id="refTransfer3"
        duration="1500"
        effect="colors"
        direction="left2right"
        :colors="['#393', '#9c0', '#ffc']"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </horizen-transfer>
    </div>

    <h1>
      colors 自己传入colors ['#b6c29a', '#8a977d', '#f4d000'] <span @click="play('refTransfer4')">播放</span>
      <span @click="reset('refTransfer4')">复原</span>
    </h1>
    <div class="page">
      <horizen-transfer
        ref="refTransfer4"
        id="refTransfer4"
        duration="1500"
        effect="colors"
        direction="left2right"
        :colors="['#b6c29a', '#8a977d', '#f4d000']"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </horizen-transfer>
    </div>

    <h1>
      direction 从右往左 <span @click="play('refTransfer5')">播放</span>
      <span @click="reset('refTransfer5')">复原</span>
    </h1>
    <div class="page">
      <horizen-transfer
        ref="refTransfer5"
        id="refTransfer5"
        duration="1500"
        effect="colors"
        direction="right2left"
        :colors="['#b6c29a', '#8a977d', '#f4d000']"
      >
        <template v-slot:frontImage>
          <div class="front_image"></div>
        </template>
        <template v-slot:backImage>
          <div class="back_image"></div>
        </template>
      </horizen-transfer>
    </div>
    
  </div>
</template>
<script>
import horizenTransfer from "@/components/horizenTransfer/index.vue";
export default {
  data: function () {
    return {};
  },
  components: { horizenTransfer },
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
