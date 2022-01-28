<template>
  <div>
    <div id="particles-js" :class="`particle${bgIndex}`"></div>

    <div class="switch_holder">
      <div class="switch_title">背景效果切换</div>
      <ul>
        <li @click="switchBg(1)">圆形</li>
        <li @click="switchBg(2)">上升方块</li>
        <li @click="switchBg(3)">垂直上升方块闪烁</li>
        <li @click="switchBg(4)">上升圆形闪烁</li>
        <li @click="switchBg(5)">斜上圆形闪烁</li>
        <li @click="switchBg(6)">随机垂直上升方块闪烁</li>
        <li @click="switchBg(7)">圆形星空感</li>
        <li @click="switchBg(8)">圆形下雪</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bgIndex: 0,
    };
  },
  components: {},
  methods: {
    async switchBg(bgIndex) {
      if (this.bgIndex == bgIndex) {
        return;
      }
      this.bgIndex = bgIndex;
      let particleConfig = await axios.get(`/particlesConfigs/config${bgIndex}.json`);
      particleConfig = particleConfig.data;
      console.log('particleConfig',particleConfig);
      particlesJS("particles-js", particleConfig);
    },
  },
  mounted() {
    this.switchBg(1)
  },
};
</script>

<style lang="less" scoped>
canvas {
  display: block;
}
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111945;
}
#particles-js.particle1 {
  background: #111945;
}

.switch_holder {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #fff;
  .switch_title {
    font-size: 30px;
    margin-bottom: 18px;
  }
  ul {
    li {
      display: inline-block;
      padding: 9px 13px;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.8);
      color: rgba(255,255,255,.9);
      line-height: 1.2;
      margin: 0 5px 5px;
      cursor: pointer;
    }
  }
}
</style>
