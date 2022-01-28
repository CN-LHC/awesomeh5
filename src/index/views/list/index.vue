<!-- 客群管理 -->
<template>
  <div class="holder">
    <div id="particles-js"></div>

    <div class="holder_inside">
      <div class="ship"></div>

      <div class="header">
        <div class="logo">
          <i> </i>
          <span>CaptionCat</span>
        </div>
        <ul :class="{ nav: true, isScrolling: isScrolling }">
          <li><a @click="scrollInToView('Library')">Library</a></li>
          <li><a @click="scrollInToView('Tools')">Tools</a></li>
          <li><a @click="scrollInToView('Projects')">Projects</a></li>
          <li><a @click="scrollInToView('Roadmap')">Roadmap</a></li>
          <li><a @click="scrollInToView('Incentive')">Incentive</a></li>
        </ul>
      </div>
      <div class="content">
        <h1 id="Projects">Projects</h1>
        <div class="row">
          <div class="col">
            <h2>项目 already done</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('closeReview')">收盘回顾</a></li>
              <li><a @click="gotoPage('marketcapRaceStockA')">A股上市公司市值排行榜</a></li>
            </ul>
          </div>

          <div class="col">
            <h2>项目 under construction</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('dengtaIntroProject')">灯塔Introduce</a></li>
              <li><a @click="gotoPage('bossFestival')">灯塔元旦祝福</a></li>
            </ul>
          </div>
        </div>

        <h1 id="Library">Library</h1>
        <div class="row">
          <div class="col">
            <h2>前景</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('anyElementDemo')">任意元素动画库(包含数字渐增变化)</a></li>
              <li><a @click="gotoPage('maskTextDemo')">文字遮罩动画</a></li>
              <li><a @click="gotoPage('scrambleTextDemo')">随机文字锁定</a></li>
            </ul>
          </div>

          <div class="col">
            <h2>背景</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('particleEffectDemo')">粒子背景</a></li>
              <li><a @click="gotoPage('granimBgDemo')">渐变背景</a></li>
              <li><a @click="gotoPage('starryBackgroundDemo')">星空背景（纯css）</a></li>
              <li>
                <a class="out" href="https://wweb.dev/resources/animated-css-background-generator/" target="_blank"
                  >方块背景</a
                >
              </li>
              <li>
                <a
                  class="out"
                  href="https://www.sliderrevolution.com/resources/css-animated-background/"
                  target="_blank"
                  >创意背景- to do</a
                >
              </li>
            </ul>
          </div>
          <div class="col">
            <h2>转场</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('horizenTransferDemo')">转场动画库-横向左右</a></li>
              <li><a @click="gotoPage('staggerBarsTransferDemo')">转场动画库-交错条</a></li>
              <li><a @click="gotoPage('pixelWaveTransferDemo')">转场动画库-像素页面过渡</a></li>
              <li><a @click="gotoPage('graphTransferDemo')">转场动画库-图形扩展动效</a></li>
            </ul>
          </div>
          <div class="col">
            <h2>图表</h2>
            <ul class="list with_hover">
              <li><a @click="gotoPage('lineChartDemo')">图表-lineChart</a></li>
              <li><a @click="gotoPage('barChartDemo')">图表-barChart</a></li>
              <li><a @click="gotoPage('barChartDemo2')">图表-barChart-横向</a></li>
              <li><a @click="gotoPage('barRangeChartDemo')">图表-barRange 区间柱图</a></li>
              <li><a @click="gotoPage('barDoubleDemo')">图表-barDouble 双柱图</a></li>
              <li><a @click="gotoPage('barHistoryChartDemo')">图表-barHistoryChart-时间流逝</a></li>
              <li><a @click="gotoPage('forceChartDemo')">图表-circleForce 力图</a></li>
              <li><a @click="gotoPage('treeMapDemo')">图表-treeMap 方块树图</a></li>
              <li><a @click="gotoPage('donutChartDemo')">图表-donutChart 饼图</a></li>
              <li><a @click="gotoPage('roseChartDemo')">图表-roseChart 玫瑰图</a></li>
            </ul>
          </div>
        </div>

        <h1 id="Tools">Tools</h1>

        <div class="row">
          <div class="col">
            <h2>外部库</h2>
            <ul class="list">
              <li>
                <a class="out" href="https://github.hubspot.com/odometer/" target="_blank">odometer 数字码表翻页效果</a>
              </li>
              <li>
                <a class="out" href="https://github.com/totond/TextPathView" target="_blank"
                  >TextPathView 文字svg描绘动画</a
                >
              </li>
              <li><a class="out" href="https://github.com/akzhy/Vara" target="_blank">vara文字描绘</a></li>
              <li><a class="out" href="https://github.com/unsignd/Textion" target="_blank">Textion打字出现变种</a></li>
              <li><a class="out" href="https://svgjs.dev/docs/3.0/" target="_blank">操作svg的库</a></li>
              <li>
                <a class="out" href="http://benrlodge.github.io/wordTypeErase/" target="_blank"
                  >wordTypeErase 文字打印，高亮效果</a
                >
              </li>
              <li><a class="out" href="http://gijsroge.github.io/tilt.js/" target="_blank">3d变换库</a></li>
              <li>
                <a class="out" href="https://github.com/maximilienGilet/TyperTyper" target="_blank">打字擦除效果</a>
              </li>
              <li>
                <a class="out" href="https://sarcadass.github.io/granim.js/examples.html" target="_blank"
                  >granim.js渐变控制</a
                >
              </li>
            </ul>
          </div>

          <div class="col">
            <h2>外部工具</h2>
            <ul class="list">
              <li>
                <a class="out" target="_blank" href="https://vincentgarreau.com/particles.js/">动态粒子背景生成器</a>
              </li>
              <li>
                <a class="out" target="_blank" href="https://www.designgradients.com/">很nice的渐变背景列表</a>
              </li>
              <li>
                <a class="out" target="_blank" href="https://www.joshwcomeau.com/shadow-palette/">很nice的box投影生成器</a>
              </li>
              <li>
                <a class="out" target="_blank" href="https://www.flexclip.com/">一个在线视频编辑器。可白嫖片头背景视频</a>
              </li>
              <li>
                <a class="out" target="_blank" href="https://www.videezy.com/">免费loop背景视频资源</a>
              </li>
              <li>
                <a class="out" target="_blank" href="http://foxcodex.html.xdomain.jp/">ae的动作列表</a>
              </li>
              <li>
                <a class="out" target="_blank" href="https://www.outpan.com/app/9aaaf27303/svg-gradient-wave-generator"
                  >静态水波背景生成器</a
                >
              </li>
              <li>
                <a class="out" target="_blank" href="https://wweb.dev/resources/animated-css-background-generator/"
                  >css 动态背景</a
                >
              </li>
              <li>
                <a class="out" target="_blank" href="https://matthewlein.com/tools/ceaser"
                  >直观感受easing参数，自定义贝塞尔曲线</a
                >
              </li>
              <li><a class="out" target="_blank" href="https://btmills.github.io/geopattern/">pattern背景生成器</a></li>
              <li>
                <a class="out" href="https://angrytools.com/css-generator/transform/" target="_blank"
                  >matrix generator</a
                >
              </li>
              <li><a href="http://bouncejs.com/" target="_blank">单元素动画设计器</a></li>
              <li>
                <a
                  class="out"
                  href="https://www.minimamente.com/project/magicgoogle_vignette/#google_vignette"
                  target="_blank"
                  >单元素动画创意集</a
                >
              </li>
              <li>
                <a class="out" href="https://tympanus.net/Development/ModalWindowEffects/" target="_blank"
                  >大面积box动画创意集</a
                >
              </li>
              <li>
                <a class="out" href="https://cloud.tencent.com/developer/article/1665353" target="_blank">h5特效集</a>
              </li>
              <li><a class="out" href="http://tool.c7sky.com/webcolor/" target="_blank">配色表（设计师向）</a></li>
              <li>
                <a class="out" href="https://colordesigner.io/gradient-generator" target="_blank"
                  >两色罗列渐变色（设计师向）</a
                >
              </li>
              <li><a class="out" href="https://www.css-gradient.com/" target="_blank">两色罗列渐变色（代码向）</a></li>
              <li>
                <a class="out" href="https://dl.hdslb.com/video-press/xiaowantoolsrev194.zip" target="_blank"
                  >小丸视频压制工具</a
                >
              </li>
              <li>
                <a class="out" href="https://www.mockofun.com/tutorials/curved-text-generator/" target="_blank"
                  >曲线文字生成器</a
                >
              </li>
              <li>
                <a class="out" href="https://www.befunky.com/create/text-editor/" target="_blank">文字遮罩效果预览器</a>
              </li>
              <li>
                <a class="out" href="https://learncssgrid.com/#grid-container" target="_blank">learncssgrid</a>
              </li>
            </ul>
          </div>
          <div class="col">
            <h2>svg动画</h2>
            <ul class="list">
              <li><a class="out" href="https://greensock.com/morphSVG" target="_blank">svg变形动画</a></li>
              <li>
                <a class="out" href="https://github.com/veltman/flubber" target="_blank">all about svg morphing</a>
              </li>
              <li><a class="out" href="https://bitshadow.github.io/iconate/" target="_blank">图标切换动画</a></li>
            </ul>
          </div>
          <div class="col">
            <h2>创意补给站</h2>
            <ul class="list">
              <li>
                <a class="out" href="https://juejin.cn/post/6844903830098804743" target="_blank"
                  >各种动画库的合集！important</a
                >
              </li>
              <li>
                <a
                  class="out"
                  href="https://www.bilibili.com/video/BV1rC4y1p7Pb?from=search&seid=248699831366367058&spm_id_from=333.337.0.0"
                  target="_blank"
                  >B站AE做的文字+图表动画</a
                >
              </li>
              <li>
                <a class="out" href="https://webdevtrick.com/animated-text-reveal-in-pure-css/" target="_blank"
                  >pure css text reveal effect</a
                >
              </li>
              <li>
                <a class="out" href="https://tympanus.net/Development/CircularTextEffect/index.html" target="_blank"
                  >CircularTextEffect 源代码https://github.com/codrops/CircularTextEffect
                </a>
              </li>
              <li>
                <a class="out" href="https://codepen.io/dudleystorey/pen/QvvEYQ" target="_blank">文字遮罩视频为底板</a>
              </li>
              <li>
                <a class="out" href="https://codepen.io/wifeo/pen/rxbof" target="_blank"
                  >静态图片也可以作为底板，代码控制其移动</a
                >
              </li>
              <li><a class="out" href="https://codepen.io/martifenosa/pen/OBbQYr" target="_blank">遮罩入场出场</a></li>
              <li>
                <a class="out" href="https://github.com/hanks-zyh/HTextView" target="_blank"
                  >文字动画，纯效果借鉴无代码</a
                >
              </li>
              <li><a class="out" href="http://textillate.js.org/" target="_blank">文字动画效果借鉴</a></li>
              <li>
                <a class="out" href="https://codepen.io/shshaw/pen/XVjKrG" target="_blank"
                  >文字动画效果借鉴。https://splitting.js.org/</a
                >
              </li>
              <li>
                <a class="out" href="https://codepen.io/collection/XpROaV/" target="_blank"
                  >splitting.js各种demo</a
                >
              </li>
              <li>
                <a class="out" href="https://codepen.io/hexagoncircle/pen/yLeGbgJ" target="_blank"
                  >splitting.js做的文字展示期动画创意</a
                >
              </li>
              <li>
                <a class="out" href="https://codepen.io/simonb105/details/ExPWwyx" target="_blank"
                  >一段一段间隔上移出现</a
                >
              </li>
              <li>
                <a class="out" href="http://shakrmedia.github.io/tuesday/" target="_blank">css做的box出场入场动画</a>
              </li>
              <li><a class="out" href="http://maccman.github.io/gfx/" target="_blank">盒子转动转场</a></li>

              <li><a class="out" href="http://www.rich-harris.co.uk/ramjet/" target="_blank">任意两物体之间过渡</a></li>
              <li>
                <a
                  class="out"
                  href="https://www.zhangxinxu.com/wordpress/2019/05/css-variable-seed-extend-animation/"
                  target="_blank"
                  >css转场</a
                >
              </li>
              <li>
                <a class="out" href="https://okazari.github.io/Rythm.js/" target="_blank">跟随音乐节奏舞动动画</a>
              </li>
            </ul>
          </div>
        </div>

        <h1 id="Roadmap">Roadmap - 宁波港</h1>
        <div class="row">
          <div class="col">
            <h2>宁波舟山港 起航</h2>
            <ul class="list">
              <li>- 确定四大类：前景，背景，转场，图表</li>
              <li>- 为四大类分别写了创始库和demo演示</li>
              <li>- 自动px2rem。填入设计稿的画布尺寸，即可直接填值无需计算</li>
              <li>- 项目整合2个进行中...</li>
              <li>- 收集了一些创意图表，一些动画形式</li>
            </ul>
          </div>
          <div class="col">
            <h2>上海港</h2>
            <ul class="list">
              <li>前景元素类 - 文字遮罩动画demo ✓</li>
              <li>项目整合类 - 灯塔介绍 ✓</li>
              <li>项目整合类 - 每日收盘回顾 ✓</li>
              <li>项目整合类 - 市值排行跑马图 ✓</li>
              <li>图表类 - 时间柱图-随着时间流逝柱子变化组件 ✓</li>
              <li>图表类 - 饼图新增文字旋转特性 ✓</li>
              <li>图表类 - 多折线图 ✓</li>
              <li>图表类 - 多折线图最后一个值的跟随特性 ✓</li>
              <li>图表类 - 多折线图展示最大值最小值特性 ✓</li>
              <li>图表类 - 柱状图支持负值特性✓</li>
              <li>图表类 - 双柱图✓</li>
              <li>图表类 - stack堆叠图</li>
              <li>图表类 - 伪3D柱图 </li>
              <li>图表类 - 叙事折线图-随着时间流逝边画曲线边展示事件</li>
              <li>转场类 - js化调用的改造</li>
              <li>转场类 - svg高级转场10种</li>
              <li>背景类 - 复合背景生成器（图片，渐变背景，粒子背景混合）</li>
            </ul>
          </div>
          <div class="col">
            <h2>天津港</h2>
            <ul class="list">
              <li>direction to be set ...</li>
            </ul>
          </div>
        </div>

        <h1 id="Incentive">Incentive 激励</h1>
        <div class="row">
          <div class="col">
            <h2>
              CaptionCat激励计划第一期：<br /><br />
              凡为此git提交代码，提出issue，写demo等行为，都可根据不同行为的权重获得积分瓜分，最终瓜分神秘奖池。<br /><br />
              CaptionCat会在每月15日进行统计和展示，为期3个月，在最后一个月实施分发。<br /><br />
              项目的成员对代码均可见，共同治理，学习代码，取长补短。<br /><br />
              http://192.168.9.52/fangyuan/awesomeh5.git<br /><br />
              不同行为的权重：<br /><br />
              <ul>
                <li>- 整合出一个项目 x4 - x10</li>
                <li>- 为CaptionCat贡献组件（背景，转场，图表等） x5-x10</li>
                <li>- 为CaptionCat 修复 bug x1 - x8</li>
                <li>- 丰富demo展示效果 x3 - x5</li>
                <li>- 新增外部工具链接 x1 - x4</li>
                <li>- 提issue x2 - x4</li>
                <!-- <li>- 待写</li> -->
              </ul>
            </h2>
          </div>

          <div class="col">
            <h2>截止12月15日统计</h2>
            <ul class="list">
              <li class="title">方圆</li>d
              <!-- <li>11.19 anyElement组件完善 <span class="x7">-x7</span></li>
              <li>11.22 staggerBars转场组件化 <span class="x7">-x7</span></li>
              <li>11.23 背景粒子生成器和demo <span class="x5">-x5</span></li>
              <li>11.24 barChart组件完成 <span class="x7">-x7</span></li> -->
              <li>11.25 横向barChart组件完成 <span class="x7">-x7</span></li>
              <li>11.26 forceChart组件完成 <span class="x7">-x7</span></li>
              <li>12.02 treemap组件完成 <span class="x7">-x7</span></li>
              <li>12.07 donutChart 饼图/环图组件完成 <span class="x8">-x8</span></li>
              <li>12.09 px2rem特性全局生效 <span class="x5">-x5</span></li>
            </ul>
          </div>
          <div class="col">
            <h2>截止1月15日统计</h2>
            <ul class="list">
              <li class="title">贾石林</li>
              <li>12.20 整合项目- 收盘回顾 <span class="x8">-x8</span></li>
              <li>12.20 力图新增自定义class特性 <span class="x3">-x3</span></li>
              <li>1.10 多折线图最后一个值的跟随特性，带动画效果   <span class="x7">-x7</span></li>
              <li>1.13 双柱图组件，并支持所有负数特性   <span class="x8">-x8</span></li>
            </ul>
            <ul class="list">
              <li class="title"></li>
              <li>12.20 整合项目- 灯塔大屏演示 <span class="x7">-x7</span></li>
              <li>12.22 玫瑰图新增旋转文字特性 <span class="x3">-x3</span></li>
              <li>12.24 跑马图组件完成  <span class="x6">-x6</span></li>
              <li>12.27 整合项目- A股市值排行跑马图  <span class="x6">-x6</span></li>
              <li>12.28 文字遮罩动画demo  <span class="x3">-x3</span></li>
              <li>12.29 新增scramble文字效果  <span class="x6">-x6</span></li>
              <li>12.30 anyment新增reveal效果  <span class="x3">-x3</span></li>
              <li>12.31 引入granim渐变背景控制组件，写demo  <span class="x3">-x3</span></li>
              <li>1.4 线图组件完成  <span class="x7">-x7</span></li>
              <li>1.4 柱状图支持负值特性  <span class="x5">-x5</span></li>
              <li>1.6 柱状图支持正负值同方向特性  <span class="x5">-x5</span></li>
              <li>1.7 动画自定义delay数组特性  <span class="x3">-x3</span></li>
              <li>1.13 bar图支持自定义后缀文字  <span class="x3">-x3</span></li>
            </ul>
            <ul class="list">
              <li class="title">陈忱</li>
              <li>12.22 找到一个图表组件共有bug <span class="x3">-x3</span></li>
              <li>12.24 找到柱图负值时的bug <span class="x3">-x3</span></li>
            </ul>
            <ul class="list">
              <li class="title">刘汉川</li>
              <li>1.17 转场动画库-像素页面过渡 <span class="x3">-x8</span></li>
              <li>1.18 转场动画库-图形扩展动效 <span class="x3">-x8</span></li>
              <li>1.15 星空背景（纯css） <span class="x3">-x4</span></li>
            </ul>
          </div>
          <div class="col">
            <h2>2月统计</h2>
          </div>
        </div>
      </div>

      <div class="footer">copyright 灯塔财经 荣誉出品</div>
    </div>
  </div>
</template>

<script>
import { sleep, setRem } from "@/utils/utils.js";
export default {
  data() {
    return {
      isScrolling: false,
    };
  },
  methods: {
    //跳路由
    gotoPage(path) {
      console.log("path", path);
      this.$router.push({ path: `${path}` }).catch((err) => err);
    },
    scrollInToView(anchor) {
      var element = document.getElementById(anchor);
      console.log(element);
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    },
    initParticle() {
      particlesJS("particles-js", {
        particles: {
          number: { value: 332, density: { enable: true, value_area: 2130.6986324071363 } },
          color: { value: "#000000" },
          shape: {
            type: "edge",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: { value: 0.09, random: true, anim: { enable: false, speed: 0.2, opacity_min: 0.1, sync: false } },
          size: { value: 16, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
          line_linked: { enable: false, distance: 320.6824121731046, color: "#ffffff", opacity: 0.4, width: 2 },
          move: {
            enable: true,
            speed: 0.4,
            direction: "top",
            random: true,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "bubble" },
            onclick: { enable: false, mode: "repulse" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    },
    moniterScrolling() {
      document.addEventListener("scroll", (event) => {
        this.isScrolling = window.scrollY > 50;
      });
    },
  },
  created() {},
  mounted() {
    setRem(1800);

    this.initParticle();

    this.moniterScrolling();
  },
};
</script>

<style lang="less" scoped>
@import url("index.less");
</style>
