
/*
  表示设计宽度尺寸designWidth下的1rem为baseSize
*/
const baseSize = 16;
const designWidth = 720;

//给html设定font-size，作为rem的基准
const setRem = () => {
  const scale = document.documentElement.clientWidth / designWidth;
  document.documentElement.style.fontSize = baseSize * scale + "px";
};
setRem();
window.onresize = function () {
  setRem();
};
