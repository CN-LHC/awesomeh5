/*!
 * ScrambleText
 * https://github.com/yomotsu/ScrambleText
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.ScrambleText = factory());
})(this, function () {
  "use strict";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ATTR_IDLING = "data-scramble-text-idling";
  var ATTR_RUNNING = "data-scramble-text-running";

  var ScrambleText = (function () {
    function ScrambleText(el) {
      var option =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ScrambleText);

      this._startTime = 0;
      this._elapsedTime = 0;
      this._running = false;
      this._idling = true;
      this._position = 0;
      this._contents = split(el.innerHTML);
      this._anim = anim.bind(this);

      this.el = el;
      this.timeOffset = option.timeOffset || 50;
      this.fps = option.fps || 60;
      this.chars =
        option.chars ||
        "首创环保上海机场华能国际歌有线浙江广厦九鼎投资凤凰光学中船科技同仁堂永股份美尔雅三峡水利弘业当代文体青旅舶航天电建发巨化香控福田汽车联武汉黄河旋风莲花健康伊力特生物泉实全柴动瀚叶圣济返沧州大民丰纸昌南纺汇源湖阳照明正药信息嘉钢浦东设恒安琪酵母迪苏酒宏兴家亚星蓝境西藏路达新农开昊宝越红豆瑞润乳鲁升冠豪高通威用洪城远双良节梨方炭素贵铁工山煤马鹰淮祥泰老宸龙头众公爱集团外桥锦在子耀玻璃哈交运百川防务石舍得地产盛屯矿焦一富维银闻展门贸洲油气策医疗辅货宜宾钱渤汾宇重世茂网络第丹万里欣长峰王府井梅雁吉杉晟内蒙五应成港招商轮庆平连云行铝太洋金钼免皖传媒器滨林速燃锚链君隆庞隅鑫牧养元饮品京旭白拖喜临材洛来宁波精尼诺筑记食邦普顿智德陕黑猫飞鹏软件杭兆易至纯口窖群辰艺翔迎驾贡森晶四图影急引证券思仙悦博迈常熟欧派居原数据坐标荣时尚茶禾量惠今奥流鸣志域态计总院期基蛋脉曼诚泵我乐研梯赛腾楼凯丽人妆佳好晨卫春秋亿和景津顺教育培岛杰伍术神松霖舒斯半导立昂微前亨睿纳盾司苑佰沪硅均瑶护理锐秦克包装伟帅制仪慧协必日孚敏芯键才先测纬味知益塑扬片纵横辉咸皓莱芳因点复旦珠唯赞楚客宋都名湘财郑啤胶球坛闽卧戈吴铜椰店谷赣粤曙夏幸合葡盘晋轴构烽火狮莫卓郎变自程溪市北绿枫申".split(
          ""
        );
      this.callback =
        typeof option.callback === "function"
          ? option.callback
          : function () {};
      this.play();

      return this;
    }

    ScrambleText.prototype.play = function play() {
      if (this._running) {
        return this;
      }

      this._idling = true;
      this._running = true;
      this._position = 0;
      this.el.setAttribute(ATTR_IDLING, "");
      this.el.setAttribute(ATTR_RUNNING, "");
      this._anim();

      return this;
    };

    ScrambleText.prototype.start = function start() {
      this._idling = false;
      this._startTime = Date.now();
      this._elapsedTime = 0;
      this._position = 0;
      this.el.removeAttribute(ATTR_IDLING);

      return this;
    };

    ScrambleText.prototype.stop = function stop() {
      this._running = false;
      this.el.removeAttribute(ATTR_IDLING);
      this.el.removeAttribute(ATTR_RUNNING);

      return this;
    };

    return ScrambleText;
  })();

  function anim() {
    var elapsedTime = Date.now() - this._startTime;
    var deltaTime = elapsedTime - this._elapsedTime;
    var needsUpdate = 2000 / this.fps <= deltaTime;

    if (!needsUpdate) {
      requestAnimationFrame(this._anim);
      return;
    }

    this._elapsedTime = elapsedTime;
    this._position = this._idling
      ? 0
      : (this._elapsedTime / this.timeOffset) | 0;

    if (!this._running) {
      return;
    }

    if (this._position >= this._contents.length) {
      this._running = false;
      this.el.innerHTML = this._contents
        .map(function (el) {
          return el.content;
        })
        .join("");
      this.el.removeAttribute("data-scramble-text-running");
      this.callback();
      return;
    }

    requestAnimationFrame(this._anim);

    var textArray = suffle(this._contents, this.chars, this._position);

    this.el.innerHTML = textArray.join("");
  }

  function suffle(contents, chars, position) {
    var textArray = [];

    for (var i = 0, l = contents.length; i < l; i++) {
      if (contents[i].type === "tag") {
        textArray.push(contents[i].content);
        continue;
      }

      if (i < position) {
        textArray.push(contents[i].content);
        continue;
      }

      textArray.push(getRandCharacter(chars));
    }

    return textArray;
  }

  function getRandCharacter(chars) {
    var randNum = Math.floor(Math.random() * chars.length);
    var lowChoice = -0.5 + Math.random();
    var picketCharacter = chars[randNum];
    var choosen =
      lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
    return choosen;
  }

  function split(string) {
    var array = [];
    var tag = /^(\s*)?<\/?[a-z](.*?)>(\s*)?/i;
    var space = /^\s+/;

    string = string.replace(space, "").replace(/\s+$/, "");

    while (string.length !== 0) {
      var matchTag = string.match(tag);

      if (!!matchTag) {
        array.push({
          type: "tag",
          content: matchTag[0].replace(/^(\s*)(.+)(\s*)$/, "$1$2$3"),
        });
        string = string.replace(matchTag[0], "");
        continue;
      }

      var matchSpace = string.match(space);

      if (!!matchSpace) {
        array.push({
          type: "space",
          content: " ",
        });
        string = string.replace(matchSpace[0], "");
        continue;
      }

      array.push({
        type: "character",
        content: string[0],
      });
      string = string.slice(1);
    }

    return array;
  }

  return ScrambleText;
});
