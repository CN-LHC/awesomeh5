<template>
  <div class="holder">
    <canvas id="granim-canvas"></canvas>
    <h2 class="type1">灯影出品</h2>
    <h2 class="type2">灯影出品</h2>
    <h2 class="type3">灯影出品</h2>
    <h2 class="type4">灯影出品</h2>
    <h2 class="type5">灯影出品</h2>
    <h2 class="type6">灯影出品</h2>
    <h2 class="type7">灯影出品</h2>
    <h2 class="type8">灯影出品</h2>
    <h2 class="type9">灯影出品</h2>
    <h2 class="type10">灯影出品</h2>
    <h2 class="type11">灯影出品</h2>
    <h2 class="type12">灯影出品</h2>
    <h2 class="type13">灯影出品</h2>
    <h2 class="type14">灯影出品</h2>
    <h2 class="type15">灯影出品</h2>
    <h2 class="type16">灯影出品</h2>
    <h2 class="webp1">灯影出品</h2>
    <h2 class="webp2">灯影出品</h2>
    <h2 class="webp3">灯影出品</h2>
    <h2 class="webp4">灯影出品</h2>
    <h2 class="webp5">灯影出品</h2>
    <h2 class="webp6">灯影出品</h2>
    <h2 class="webp7">灯影出品</h2>
    <h2 class="webp8">灯影出品</h2>
    <h2 class="webp9">灯影出品</h2>
    <h2 class="webp10">灯影出品</h2>
    <h2 class="webp11">灯影出品</h2>
    <h2 class="webp12">灯影出品</h2>
    <h2 class="texture1">灯影出品</h2>
    <h2 class="texture2">灯影出品</h2>
    <h2 class="texture3">灯影出品</h2>
    <h2 class="texture4">灯影出品</h2>
    <h2 class="texture5">灯影出品</h2>
    <h2 class="texture6">灯影出品</h2>
  </div>
</template>
<script>
import Granim from "granim";
console.log("Granim", Granim);
export default {
  data: function () {
    return {
      boxes1: null,
    };
  },
  components: {},
  methods: {},
  mounted() {
    var granimInstance = new Granim({
      element: "#granim-canvas",
      name: "granim",
      opacity: [1, 1],
      states: {
        "default-state": {
          gradients: [
            ["#834D9B", "#D04ED6"],
            ["#1CD8D2", "#93EDC7"],
          ],
        },
      },
    });
  },
};
</script>
<style lang="less" scoped>
#granim-canvas {
  position: fixed;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@font-face {
  font-family: "harmonyBold";
  src: url("../../../../assets/fonts/HarmonyOS_Sans_SC_Bold.ttf?t=1638171342335") format("truetype");
}
h2 {
  font-size: 60px;
  font-family: "harmonyBold";
  margin: 40px;
  display: inline-block;
  color: transparent;
  position: relative;
  z-index: 2;
}
h2.type1 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim1.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type2 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim2.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type3 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim3.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type4 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim4.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type5 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim5.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type6 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim6.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type7 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim7.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type8 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim8.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type9 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim9.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type10 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim10.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type11 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim11.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type12 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim12.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type13 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim13.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type14 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim14.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type15 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim15.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.type16 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/anim16.gif");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}


h2.webp2 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp2.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp3 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp3.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp4 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp4.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp5 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp5.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp6 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp6.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp7 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp7.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.webp8 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp8.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}

h2.webp10 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/webp10.webp");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}

h2.texture1 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t1.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.texture2 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t2.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.texture3 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t3.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.texture4 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t4.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.texture5 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t5.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
h2.texture6 {
  background: url("https://idtcdn.oss-cn-hangzhou.aliyuncs.com/owesomeh5/gifs/t6.jpg");
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
}
</style>
