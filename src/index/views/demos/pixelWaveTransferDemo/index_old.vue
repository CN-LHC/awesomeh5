<template>
    <div class="holder">
        <!-- <h1>xSize</h1>
        <p>设置像素块宽度</p>
        <h1>ySize</h1>
        <p>设置像素块高度</p>
        <h1>
            自定义设置像素块宽高100
            <span @click="setPixel(100)">播放</span>
        </h1> -->

        <h1>steps</h1>
        <p>波浪开始到完全填充间的过程</p>

        <h1>
            自定义波浪开始到完全填充间的过程[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            <span @click="setSteps([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])">播放</span>
        </h1>
        <h1>color</h1>
        <p>波浪填充颜色</p>
        <h1>
            自定义波浪填充颜色black
            <span @click="setColor('black')">播放</span>
        </h1>
        <h1>speedIn</h1>
        <p>填充开始到完全填充</p>
        <h1>
            自定义填充开始到完全填充1
            <span @click="setSpeedIn(2)">播放</span>
        </h1>
        <h1>speedOut</h1>
        <p>完全填充到填充结束</p>
        <h1>
            自定义完全填充到填充结束0.2
            <span @click="setSpeedOut(0.2)">播放</span>
        </h1>
        <h1>canvasTop</h1>
        <p>填充遮罩层离顶部的间距</p>
        <h1>
            自定义填充遮罩层离顶部的间距100px
            <span @click="setCanvasTop(100)">播放</span>
        </h1>
        <h1>canvasLeft</h1>
        <p>填充遮罩层离左边的间距</p>
        <h1>
            自定义填充遮罩层离左边的间距100px
            <span @click="setCanvasLeft(100)">播放</span>
        </h1>
        <h1>delayMiddle</h1>
        <p>填充动画延迟多长时间</p>
        <h1>
            自定义填充动画延迟时间1s
            <span @click="setDelayMiddle(1)">播放</span>
        </h1>
        <pixelWaveTransfer
            ref="pixelTest"
            id="pixelTest"
            :xSize="xSize"
            :ySize="ySize"
            :steps="steps"
            :color="color"
            :speedIn="speedIn"
            :speedOut="speedOut"
            :canvasTop="canvasTop"
            :canvasLeft="canvasLeft"
            :delayMiddle="delayMiddle"
        ></pixelWaveTransfer>
    </div>
</template>
<script>
import pixelWaveTransfer from '@/components/pixelWaveTransfer'
export default {
    data: function() {
        return {
            xSize: 48,
            ySize: 48,
            steps: [0.1, 0.1, 0.3, 0.5, 0.5, 1],
            color: '#ccc',
            speedIn: 0.7,
            speedOut: 0.7,
            canvasTop: 0,
            canvasLeft: 0,
            delayMiddle: 0,
        }
    },
    components: {
        pixelWaveTransfer
    },
    methods: {
        play(refName) {
            this.$refs[refName].play();
        },
        reset(refName) {
            this.$refs[refName].reset();
            Object.assign(this.$data, this.$options.data());
        },
        setPixel(value) {
            this.reset('pixelTest')
            this.xSize = value
            this.ySize = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setSteps(value) {
            this.reset('pixelTest')
            this.steps = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setColor(value) {
            this.reset('pixelTest')
            this.color = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setSpeedIn(value) {
            this.reset('pixelTest')
            this.speedIn = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setSpeedOut(value) {
            this.reset('pixelTest')
            this.speedOut = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setCanvasTop(value) {
            this.reset('pixelTest')
            this.canvasTop = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setCanvasLeft(value) {
            this.reset('pixelTest')
            this.canvasLeft = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
        setDelayMiddle(value) {
            this.reset('pixelTest')
            this.delayMiddle = value
            this.$nextTick(() => {
                this.play('pixelTest')
            })
        },
    },
}
</script>
<style lang="less" scoped>
.holder {
  padding: 20px;
}

h1 {
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
p {
  margin-bottom: 20px;
}

.page {
  width: 437px;
  height: 751px;
  margin-bottom: 100px;
  .one {
      width: 100%;
      height: 100%;
      background: coral;
  }
  .two {
      width: 100%;
      height: 100%;
      background: darkgoldenrod;
  }
}
</style>