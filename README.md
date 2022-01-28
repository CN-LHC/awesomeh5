## 待做清单  优先级越大星越多
1. 更多转场效果  ★
2. 3d bar   ★
3. 任意元素动画效果库demo和文档  ★★★
4. svg动画研究 ★★★
5. 资源载入回调  ★★★★★  1.fontSpider减少字体文件体积（为h5方案做优化）  2.fontfaceobserver ✓ 监测字体加载完成  3.录屏前loading ✓
6. rem单位的使用 ★★★
7. 方块树图，数字大小★★ ✓，range调整★★★ ✓  数字不要逗号 ★★★  ✓
8. d3的数据更新 ★★★★★
9. 饼图 ✓
10. 线图
11. 树图 
12. 背景渐变动画 https://pixelbuddha.net/textures/elegant-gradient-backgrounds  ★
13. 树图比例的两个模式：1 真实比例，小于某个值则不标注  2 虚假比例，保证最大化标注 ★★★ ✓
14. 饼图✓ 小于某个值则不标注  


饼图需求
2. data update 动画 attr tween
3. labelMaxLength:4  字数限制参数
4. isShowPolyLine:false
5. labelPosition:outside/inside

andriod 400*803
ios 414*672
## 动画库及demo
四大类
1. 文字类
2. 转场类
3. 背景类
4. 图表类

## 跑马图demo待解决
1. 自定义封面，自定义持续时长 ✓
2. edge上音频自动播放 ✓
2. 播放时间快速读取
3. 新页效果


## swiper api
https://swiper.com.cn/api/carousel/50.html

## marquee

vue-dynamic-marquee

infinite-marquee
https://www.npmjs.com/package/infinite-marquee

## 很好的d3.js教程
https://github.com/Shao-Kui/D3.js-Demos/blob/master/2021/1%262.pdf


## 动物图标集合
https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.dc64b3430&cid=2495


## 代码收集
```js
delay: (d, i) => i * randomNum(20,40),
```

 color的用法
```js
d3.schemeTableau10
d3.scaleOrdinal(G, colors)
.attr("fill", color ? (d, i) => color(G[i]) : fill)
```

动画的transform模版
```js  
.attr("transform", (d, i) => `rotate(${(i + 1) * -20},${(i + 1) * -2},0)`)
.attr("transform", (d, i) => "rotate(0,0,0)");
```

两色渐变
```js
var colorScale = d3.scaleLinear([0, 100], ["brown", "steelblue"]);
colorScale(2)
```

## 配置px2rem
https://www.jianshu.com/p/97feec9d91d5

## 顺便看到了作者所在的清华大学出的各种数据可视化成品，只能用惨不忍睹总结
https://cg.cs.tsinghua.edu.cn/course/vis/portfolio.html

## 掘金的  D3图表-树图的展开收起动画
https://juejin.cn/post/7001823531000397831

## 为什么你的网页不能自动播放音视频而别人家可以的终极答案
https://www.cnblogs.com/willian/p/15655756.html
所有的路都封死了，策略也不让调，pwa这条路看了一下，也是麻烦得要死，单https这一条又把我给否了
https://web.dev/install-criteria/

结果，终于给我找到了解法，那就是用edge，开放了一个设置项，可以允许自动播放，也可以配置一个白名单域名。


## image出场效果
https://tympanus.net/Development/ImageRevealHover/
https://tympanus.net/Tutorials/SmoothScrollAnimations/
https://tympanus.net/Development/SmoothScrollingImageEffects/
https://tympanus.net/Development/StackSlider/
https://tympanus.net/Development/GammaGallery/
https://tympanus.net/Development/AnimatedResponsiveImageGrid/index3.html
https://tympanus.net/Tutorials/TiltedContentSlideshow/
https://tympanus.net/Tutorials/ResponsiveImageGallery/
## 创意参考
线图
https://codepen.io/JonasBadalic/pen/PwWXqg

pie图
https://codepen.io/Siddharth11/pen/LVQmjN

pie图transition
https://bl.ocks.org/mbostock/1346410

bar chart race
https://observablehq.com/@d3/bar-chart-race

转场带源代码
https://tympanus.net/Development/PageLoadingEffects/index3.html

大box入场动画参考
https://tympanus.net/Development/ModalWindowEffects/

## svg clip path 制作polygen的工具
https://bennettfeely.com/clippy/

## svg添加投影，滤镜，极为重要！
https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters/


## keypress.js
一个很好玩的按键组合，去触发命令的插件

## 参考代码
线图参考了如下代码
https://observablehq.com/@d3/line-chart

柱状图参考了如下代码  
https://observablehq.com/@d3/bar-chart  

横向柱状图参考了如下代码  
https://observablehq.com/@d3/horizontal-bar-chart  

多柱图和堆叠图实际上是一个数据的不同表达方式，他们使用一样的数据结构。
https://observablehq.com/@d3/grouped-bar-chart
https://observablehq.com/@d3/stacked-bar-chart

方块树图参考如下代码
https://observablehq.com/@d3/treemap

泡泡图，用树图做的，待参考
https://observablehq.com/@d3/bubble-chart?collection=@d3/d3-hierarchy

nvd3的示例代码
https://nvd3.org/examples/index.html

旧版本的例子
https://bl.ocks.org/mbostock

文字沿着path走
https://stackoverflow.com/questions/39973776/how-can-i-rotate-d3-chart-and-how-can-i-start-pie-chart-from-angle-90

文字定位到pie的中间，关键语句 return "M0,0" + ops.replace("M", "L");
https://stackoverflow.com/questions/42892239/curved-text-around-d3-js-pie-chart

文字跟着线图运动
https://bl.ocks.org/LuisSevillano/97ebf432ecf33a575e7509155aa6829b

race bar chart 参考了如下代码
https://segmentfault.com/a/1190000038464715
https://medium.com/analytics-vidhya/building-racing-bar-chart-in-d3js-d89b71cd3439



3d bar
https://bl.ocks.org/jamesleesaunders/7201bbf2025f450fce69

rose chart
http://bl.ocks.org/kgryte/5926740
https://jsfiddle.net/forwardsprint/wrgtj1nL/
https://blog.csdn.net/dkr380205984/article/details/82699950


plotly
https://plotly.com/javascript/polar-chart/#webgl-polar-chart

视角移动的line
https://bl.ocks.org/mbostock/1642989
https://bl.ocks.org/mbostock/1642874

2000个d3例子
http://techslides.com/over-1000-d3-js-examples-and-demos

## 张鑫旭的svg渐变文档
https://www.w3cplus.com/svg/svg-linear-gradients.html
## 圆圈 force 
https://observablehq.com/@d3/collision-detection/2?collection=@d3/d3-force

## 如何做数据更新
https://riptutorial.com/d3-js/example/20318/updating-the-data--a-basic-example-of-enter--update-and-exit-selections
## d3单点代码教学
https://www.tutorialsteacher.com/d3js/animation-with-d3js

## stroke 的详细参数
https://www.w3cplus.com/svg/svg-fill-stroke.html

## css能用于svg的属性
https://www.w3.org/TR/SVG/propidx.html

## 3d柱状图
http://tympanus.net/codrops/2012/05/21/animated-3d-bar-chart-with-css3/


## svg人物和文字slide动画
http://ourownthing.co.uk/brent-meister-generator/

## svg轨迹动画
https://blog.csdn.net/cune1359/article/details/106848465
https://hongkiat.github.io/scalable-vector-graphics-animation/

## 颜色
https://bennettfeely.com/scales/

## flex学习器
https://bennettfeely.com/flexplorer/

## Bennett Feely 此人做了很多底层的东西，很有意思，3d文字等
https://bennettfeely.com/

## css animation generator
https://keyframes.app/animate/


## vue的proxy代理
https://blog.csdn.net/weixin_43972437/article/details/107291071?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.no_search_link&spm=1001.2101.3001.4242.1



## fbx文件的要点：
1. fbx文件需要一个模型配一个动作，并包含贴图
2. 每个文件都需要一个reset动作，一般为人物站立

## fbx多个动作之间的切换
https://sbcode.net/threejs/fbx-animation/
还是glb文件比较方便


## three.js的中文教程
http://www.webgl3d.cn/Three.js/

## 概念解释
gamma色彩
人眼对光的强弱感知不是线性的，而是暗部强烈，亮部弱，最终形成一个gamma0.45曲线，相当于一条斜45度的线拉着中间点往上偏移了
采样时为了贴合人眼识别规律，也会在暗部多采样，亮部少采样
照片在生成的时候，是一个0.45的曲线
照片在现实的时候，是一个2.2的反曲线

https://en.wikipedia.org/wiki/Gamma_correction

不过在早期由于crt显示器的电子管特性，巧合地符合了人眼的特性，所以早期才用gamma矫正是由于工程需要，而不是人眼感光理论

linear色彩空间

lut
look up table 查找色彩空间
给视频套lut，本质上还是再拿log里的表套在原来的色彩空间上，并不是真正的色彩空间变化

## 2d的东西插到3d空间中
https://blog.csdn.net/homula123/article/details/103129826


## scrame-text源自这个github
https://github.com/yomotsu/ScrambleText
另一种形式的scrame
https://github.com/turtleDev/scramblejs


## 配合anime.js拆字的库有两个
https://github.com/s0wcy/split-text-js
letterize.js



## 图片转场研究阶段：slicebox
http://tympanus.net/codrops/2011/09/05/slicebox-3d-image-slider/

AVIASLIDER
http://aviathemes.com/aviaslider/index.html?slider=diagonal-blocks
https://blog.csdn.net/chinet_bridge/article/details/12587257
终于在github里找到了源代码并下到public目录下

nivo-slider和avia很像，都是对图像进行了分隔然后做动画  
着两个的缺点是都不维护了，没有文档，不过好处是这个nivo slider库文件很完整，调用也非常简单
http://www.yyyweb.com/demo/nivo-slider/
