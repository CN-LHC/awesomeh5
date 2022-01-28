<template>
  <div class="holder">
    <h1>name: (d) => d.name, value: (d) => d.value,</h1>
    <p>指定数据里的哪个字段是name，哪个字段是value，必填。</p>

    <h1>width: 340, height: 340,</h1>
    <p>图表的宽高，默认340*340</p>

    <h1>donutRatioRange: [0.1, 0.3, 0.75]</h1>
    <p>空心内圈的半径占比，最小半径占比和最大半径占比，默认为[0.2, 0.5, 0.8]</p>
    
    <h1><span>新增</span> labelOffset: 40</h1>
    <p>微调文字向外扩展的半径，默认30</p>
    
    <h1><span>新增</span> top3Offset: 40</h1>
    <p>微调文字向内扩展的半径，默认30</p>
    
    <h1><span>新增</span> isSameAngle: false</h1>
    <p>默认false，角度按照值变化。如果为true则平分</p>
    
    <h1><span>新增</span> isRotateLabel: true</h1>
    <p>默认为true，文字会沿着圆弧旋转。如果为false则始终水平</p>
    
    <h1>donutRatioRange: [0.1, 0.3, 0.75]</h1>
    <p>空心内圈的半径占比，最小半径占比和最大半径占比，默认为[0.2, 0.5, 0.8]</p>

    <h1>colors: ["#ff7f50", "#4caf50", "#196666", "#503f70"],</h1>
    <p>
      colors可不填，为系统默认色系，如果填入自己的色系，则会覆盖默认值，给出的颜色数量如果少于数据数量会自动循环；如果多余数据数量则冗余的不展示
    </p>

    <h1>duration</h1>
    <p>默认为400ms，动画持续时长，默认为400</p>

    <h1>delay</h1>
    <p>单个元素之间的间隔时长，默认为40ms</p>

    <h1>ease <a href="https://github.com/d3/d3-ease/tree/v3.0.1" target="_blank">查看easing</a></h1>
    <p>
      加速减速<br />
      减速可选项：easeQuadOut,easeCubicOut,easeExpOut,easeCircleOut,easeBackOut。<br />
      先加速后减速可选项：easeQuadInOut,easeCubicInOut,easeExpInOut,easeCircleInOut,easeBackInOut。
    </p>

    <h1>customClass</h1>
    <p>通过customClass可以控制内部pie,文字的样式,line的样式</p>

    <h1>valueType</h1>
    <p>值可选展示绝对值还是相对的百分比。默认relative。 可选 relative，absolute。 当值为absolute时，valueSuffix生效</p>

    <h1>valueSuffix</h1>
    <p>数字后边可以跟后缀，比如"亿"，默认为空。 有依赖条件。只在valueType 为absolute时有效</p>

    <h1>isSort</h1>
    <p>是否从大到小排序。默认为true排序。如果不排序，会呈现锯齿状而不是玫瑰状</p>
    

    <h1>默认特性：占比小于5.5的不展示标签，避免标注重叠</h1>
    <p>目前不可修改</p>

    <h2>
      roseChart (isSort:true) (valueType:relative)
      <span @click="playIn1('refRoseChart1')">入场</span>
      <span @click="playOut('refRoseChart1')">出场</span>
    </h2>
    <rose-chart ref="refRoseChart1" id="refRoseChart1" customClass="c_rose1"> </rose-chart>

    <h2>
      (isSort:false) (valueType:absolute) (valueSuffix: "亿")
      <span @click="playIn2('refRoseChart2')">入场</span>
      <span @click="playOut('refRoseChart2')">出场</span>
    </h2>
    <rose-chart ref="refRoseChart2" id="refRoseChart2" customClass="c_rose2"> </rose-chart>
    
    <h2>
      (isSort:true) (isSameAngle:true) (isRotateLabel: false)
      <span @click="playIn3('refRoseChart3')">入场</span>
      <span @click="playOut('refRoseChart3')">出场</span>
    </h2>
    <rose-chart ref="refRoseChart3" id="refRoseChart3" customClass="c_rose3"> </rose-chart>
  </div>
</template>
<script>
import roseChart from "@/components/roseChart/index.vue";
export default {
  data: function () {
    return {
      population: [
        { name: "通信设备", value: 1836 },
        { name: "互联网传媒", value: 646 },
        { name: "化学制药", value: 423 },
        { name: "光学电子", value: 336 },
      ],
      population2: [
        { name: "互联网传媒", value: 446 },
        { name: "通信", value: 936 },
        { name: "化学制药", value: 323 },
        { name: "光学电子", value: 336 },
        { name: "白酒", value: 236 },
        { name: "媒体", value: 256 },
        { name: "白酒7", value: 127 },
        { name: "白酒6", value: 227 },
        { name: "白酒9", value: 67 },
        { name: "白酒8", value: 227 },
      ],
    };
  },
  components: { roseChart },
  methods: {
    playIn1(refName) {
      this.$refs[refName].DonutChart(this.population2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: document.body.clientWidth*0.3,
        height: document.body.clientWidth*0.3,
        donutRatioRange: [0.1, 0.3, 0.75], //空心内圈的半径占比，最小半径占比和最大半径占比
        colors: ["#00a59d", "#11b3a0", "#2ec0a1", "#47cea0", "#60db9e", "#7ae79a"],
        duration: 340,
        delay: 40,
        ease: "easeBackOut",
        valueType: "relative",
        valueSuffix: "亿",
        isSort: true,
      });
    },

    playIn2(refName) {
      this.$refs[refName].DonutChart(this.population2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: document.body.clientWidth*0.3,
        height: document.body.clientWidth*0.3,
        donutRatioRange: [0.2, 0.3, 0.8], //空心内圈的半径占比，最小半径占比和最大半径占比
        colors: ["#00a59d", "#11b3a0", "#2ec0a1", "#47cea0", "#60db9e", "#7ae79a"],
        duration: 440,
        delay: 50,
        ease: "easeCubicOut",
        valueType: "absolute",
        valueSuffix: "亿",
        isSort: false,
      });
    },
    playIn3(refName) {
      this.$refs[refName].DonutChart(this.population2, {
        name: (d) => d.name,
        value: (d) => d.value,
        width: document.body.clientWidth*0.3,
        height: document.body.clientWidth*0.3,
        donutRatioRange: [0.2, 0.3, 0.8], //空心内圈的半径占比，最小半径占比和最大半径占比
        labelOffset:40,
        top3Offset:50,
        colors: ["#00a59d", "#11b3a0", "#2ec0a1", "#47cea0", "#60db9e", "#7ae79a"],
        duration: 440,
        delay: 50,
        ease: "easeCubicOut",
        valueType: "absolute",
        valueSuffix: "亿",
        isSort: true,
        isSameAngle: true,
        isRotateLabel:false
      });
    },

    playOut(refName) {
      this.$refs[refName].playOut();
    },

    
  },
  mounted() {
    
  },
};
</script>
<style lang="less" scoped>
.holder {
  padding: 20px;
}
h2 {
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
h1 {
  font-size: 18px;
  color: #9c27b0;
  margin-bottom: 10px;
  span{ color: #f00;}
}
p {
  margin-bottom: 20px;
  color: #555;
}

.c_rose1 {
  font-size: 14px;
  display: inline-block;
  min-height: 200px;
  margin-bottom: 30px;
  background: #313c58;
  /deep/ .test{ fill: #fff;}
  /deep/ .donut_txt1 {
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    font-size: 14px;
  }
}

.c_rose2 {
  font-size: 14px;
  display: inline-block;
  min-height: 200px;
  margin-bottom: 30px;
  background: #313c58;
  /deep/ .donut_txt1 {
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    font-size: 14px;
  }
}
.c_rose3 {
  font-size: 14px;
  display: inline-block;
  min-height: 200px;
  margin-bottom: 30px;
  background: #632f2f;
  /deep/ .donut_txt1 {
    font-size: 16px;
  }
  /deep/ .donut_txt2 {
    font-size: 14px;
  }
}
</style>
