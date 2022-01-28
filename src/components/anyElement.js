import anime from "animejs/lib/anime.es.js";
import { sleep, randomNum } from "@/utils/utils.js";
import $ from "jquery";

const inEffect = {
  typeIn: {},
  fadeIn: {},
  revealIn: {},
  leftIn: { translateX: ["-2em", 0] },
  rightIn: { translateX: ["2em", 0] },
  topIn: { translateY: ["2em", 0] },
  bottomIn: { translateY: ["-2em", 0] },
  obliqueIn: { translateX: ["1em", 0], translateY: ["1em", 0] },
  runIn: { skewX: ["60deg", "0deg"], translateX: ["2.6em", 0] },
  perspectiveRightIn1: {
    scale: [3.2, 1],
    translateX: ["1.8em", 0],
    rotateX: ["20deg", 0],
    rotateY: ["70deg", 0],
    rotateZ: ["7deg", 0],
    perspective: "1000px",
  },
  perspectiveRightIn2: {
    scale: [2.5, 1],
    translateX: ["2.8em", 0],
    translateY: ["-0.4em", 0],
    rotateX: ["-20deg", 0],
    rotateY: ["-70deg", 0],
    rotateZ: ["-12deg", 0],
    perspective: "1800px",
  },
  perspectiveRightIn3: {
    scale: [2.9, 1],
    translateX: ["1.2em", 0],
    translateY: ["-0.4em", 0],
    rotateX: ["-50deg", 0],
    rotateY: ["-20deg", 0],
    rotateZ: ["-4deg", 0],
    perspective: "1200px",
  },
  perspectiveScaleIn1: {
    scale: [0.7, 1],
    translateX: ["1.6em", 0],
    rotateX: ["70deg", 0],
    rotateY: ["40deg", 0],
    perspective: "1500px",
  },
  perspectiveScaleIn2: {
    scale: [2.9, 1],
    translateX: ["0.6em", 0],
    rotateX: ["20deg", 0],
    rotateY: ["20deg", 0],
    perspective: "1500px",
  },
  rotateIn1: {
    translateY: ["1.6em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [90, 0],
  },
  rotateIn2: {
    translateY: ["-1.6em", 0],
    translateX: ["1.5em", 0],
    rotateZ: [-70, 0],
  },
  rotateIn3: {
    scale: [1.3, 1],
    translateY: ["-1.6em", 0],
    translateX: ["-1.5em", 0],
    translateZ: ["-6.9em", 0],
    rotateX: [-40, 0],
    rotateY: [-20, 0],
    rotateZ: [-40, 0],
    perspective: "1500px",
    duration: 800,
  },
};
const outEffect = {
  fadeOut: { delay: anime.stagger(0) },
  leftOut: { translateX: [0, "-2em"] },
  rightOut: { translateX: [0, "2em"] },
  topOut: { translateY: [0, "-2em"] },
  bottomOut: { translateY: [0, "2em"] },
};

export function anyElement(options) {
  //当入场为数字跳动时，走独立逻辑
  if (options.inEffect == "numVaryIn") {
    let myObject = {
      num: 0,
    };
    const toFixed = options.toFixed == undefined ? 1 : options.toFixed;
    const goIn = {
      targets: myObject,
      num: options.targets.innerHTML,
      duration: options.duration,
      easing: options.easing == undefined ? "easeOutExpo" : options.easing,
      autoplay: false,
      update: async () => {
        options.targets.innerHTML = (myObject.num * 1).toFixed(toFixed);
      },
    };
    const goOut = {
      targets: options.targets,
      duration: 1000,
      easing: options.easing == undefined ? "easeOutExpo" : options.easing,
      autoplay: false,
      opacity: [1, 0],
    };
    return {
      //这个bug我找了两次，第一次花了1分钟，第二次花了一个小时
      //anime在执行同一个元素的时候，后一个会覆盖前一个
      goOut: anime(goOut),
      goIn: anime(goIn),
      runOut: () => {
        anime(goOut).restart();
      },
      runIn: () => {
        options.targets.classList.remove("hidden");
        anime(goIn).restart();
      },
    };
  }
  //如果分拆的话，就自动把每个文字包裹span
  if (options.isSplitTxt) {
    const txt = options.targets;
    const childNodes = txt.childNodes;
    let innerHtmlArr = [];
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeName == "#text") {
        innerHtmlArr.push(childNodes[i].nodeValue.replace(/\S/g, "<span class='letter'>$&</span>"));
      } else if (childNodes[i].nodeName == "BR") {
        innerHtmlArr.push("<br>");
      } else {
        innerHtmlArr.push(
          `<${childNodes[i].nodeName} class="${childNodes[i].className}">${childNodes[i].innerHTML}</${childNodes[i].nodeName}>`
        );
      }
    }
    txt.innerHTML = innerHtmlArr.join("");
    options.realTargets = document.querySelectorAll("#" + txt.id + " .letter");
  } else {
    options.realTargets = options.targets;
  }
  const basicGoInOptions = getBasicGoInSettings(options);
  const basicGoOutOptions = getBasicGoOutSettings(options);
  const goIn = Object.assign(basicGoInOptions, inEffect[options.inEffect]);
  const goOut = Object.assign(basicGoOutOptions, outEffect[options.outEffect]);
  return {
    goOut: anime(goOut),
    goIn: anime(goIn),
    runIn: () => {
      try {
        options.targets.classList.remove("hidden");
      } catch (e) {}
      anime(goIn).restart();
    },
    runOut: () => {
      anime(goOut).restart();
    },
  };
}

function getBasicGoInSettings(options) {
  let delay = anime.stagger(options.delay);
  if (options.inEffect.includes("leftIn")) {
    delay = anime.stagger(options.delay, { from: "last" });
  }
  if (options.inEffect.includes("revealIn")) {
    // delay = anime.stagger(60, { from: "last" });
    delay = (el, i, l) => {
      return randomNum(100, 1200);
    };
  }
  return {
    targets: options.realTargets,
    duration: options.inEffect == "typeIn" ? 10 : options.duration,
    easing: options.easing == undefined ? "easeOutExpo" : options.easing,
    delay: delay,
    opacity: [0, 1],
    autoplay: false,
  };
}
function getBasicGoOutSettings(options) {
  const delay =
    ["rightOut"].indexOf(options.outEffect) > -1
      ? anime.stagger(40, { from: "last" })
      : anime.stagger(40);
  return {
    targets: options.realTargets,
    duration: 1500,
    easing: options.easing == undefined ? "easeOutExpo" : options.easing,
    delay: delay,
    opacity: [1, 0],
    scale: [1, 1],
    translateX: [0, 0],
    translateY: [0, 0],
    translateZ: [0, 0],
    rotateX: [0, 0],
    rotateY: [0, 0],
    rotateZ: [0, 0],
    autoplay: false,
    complete: () => {
      // console.log("complete");
    },
  };
}
