/*异步等待一段时间*/
export function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

//获得数组前num之和
Array.prototype.getNumArrayTotal = function (num) {
  var total = this.reduce(function (pre, cur, index, arr) {
    if (index > num - 1) {
      return pre + 0;
    }
    return pre + cur;
  });
  return total;
};

export function arrRemove(arr, val) {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

//输入设计稿的宽度，设定基础字号
export function setRem(designWidth) {
  setRemCore(designWidth);
  window.onresize = function () {
    setRemCore(designWidth);
  };
}

function setRemCore(designWidth) {
  const scale = document.documentElement.clientWidth / designWidth;
  document.documentElement.style.fontSize = 16 * scale + "px";
}

//输入原始数据，给出涨跌幅百分比和绝对值，还有class
export function getRateByData(liData) {
  var sRate = ""; //涨跌幅，带+ -符号和百分比
  var sRateNum = ""; //sRate的值，不带+ -符号和百分比，排序时用，如果停牌就给''
  var className = "";
  var eveClassName = ""; //热点里边框式涨跌样式名  eve_fall,eve_stop,eve_rise
  var classNameNum = ""; //表示没有涨跌幅num和num_stop
  var fNow = liData.fNow;
  var fClose = liData.fClose;
  var eSecStatus = liData.eSecStatus;
  var iTpFlag = liData.iTpFlag < 2 ? 2 : liData.iTpFlag;
  //有停牌状态
  if (eSecStatus == "1") {
    sRate = "停牌";
    sRateNum = "";
    className = "num_stop";
    eveClassName = "eve_stop";
    classNameNum = "num";
    fNow = fClose;
    //没有停牌状态，但fnow为0，我们认为是集合竞价，显示--，fnow如不为0则正常显示
  } else {
    classNameNum = "num";
    if (fNow / 1 === 0) {
      sRate = "--";
      sRateNum = "";
      className = "num_stop2";
      eveClassName = "eve_stop";
      fNow = "--";
    } else {
      var rate = (Math.abs((fNow - fClose) / fClose) * 100).toFixed(2);
      sRateNum = ((fNow - fClose) / fClose) * 100;
      if (fClose > fNow) {
        sRate = "-" + rate + "%";
        className = "num_fall";
        eveClassName = "eve_fall";
      } else if (fClose == fNow) {
        sRate = rate + "%";
        className = "num_stop2";
        eveClassName = "eve_stop";
      } else {
        sRate = "+" + rate + "%";
        className = "num_rise";
        eveClassName = "eve_rise";
      }
      fNow = fNow.toFixed(iTpFlag);
    }
  }
  return {
    fNow: fNow,
    sRate: sRate,
    sRateNum: sRateNum,
    className: className,
    eveClassName: eveClassName,
    classNameNum: classNameNum,
  };
}

//获取url参数
export function getUrlParams(s) {
  let strs;
  var url = decodeURIComponent(location.href);
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.split("?")[1];
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return theRequest;
}
