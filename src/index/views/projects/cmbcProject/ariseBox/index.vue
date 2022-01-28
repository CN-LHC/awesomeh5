<template>
  <div :class="{ arise_box: true, rise: wave > 0, fall: wave < 0 }">
    <div class="ab_title">{{ title }}</div>
    <div class="ab_cont">
      <div class="ab_point">
        报<span class="letter">{{ point }}</span
        >点
      </div>
      <div class="ab_wave">{{ (wave * 100).toFixed(2) }}%</div>
    </div>
    <i class="ab_arrow_up"></i>
    <i class="ab_arrow_down"></i>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      title: "",
      point: 0,
      wave: 0,
    };
  },
  methods: {
    playIn(options) {
      console.log("options", options);
      this.title = options.title;
      this.point = options.point;
      this.wave = options.wave;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
