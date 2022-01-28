// 默认参数
const parameter = {
    xSize: 48,
    ySize: 48,
    steps: [0.1, 0.1, 0.3, 0.5, 0.5, 1],
    color: 'red',
    speedIn: 0.7,
    speedOut: 0.7,
    canvasTop: 0,
    canvasLeft: 0,
    autoCalculateSquaresSize: true,
    delayMiddle: 0,
}
// 初始化转场图层
export function pixelWaveTransfer(option = {}) {
    let pixelwave = null
    if (option.params && option.params instanceof Object) {
        pixelwave = new PixelWave({
            ...parameter,
            ...option.params
        });
    } else {
        pixelwave = new PixelWave(parameter);
    }
    return {
        // 开始转场动画
        play: function() {
            anime(pixelwave, option)
        }
    }
}
//转场动画执行
function anime(pixelwave, option) {
    pixelwave.start(option.start || start, option.middle || middle, option.end || end);
}
function start() {
    console.log('start')
}
function middle() {
    console.log('middle')
}
function end() {
    console.log('end')
}