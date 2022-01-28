<template>
    <div class="container">
        <div class="left">
            <h1>使用说明</h1>
            <p>步骤一：在index.html文件中加入<a href="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js">TweenMax.min.js</a>和<a href="/PixelWave-min.js">PixelWave-min.js</a>两个文件</p>
            <p>步骤二：引用pixelWaveTransfer.js文件中的pixelWaveTransfer方法</p>
            <p>步骤三：通过pixelWaveTransfer创建转场动画遮罩层</p>
            <div>
                <h2>pixelWaveTransfer可传参数描述:</h2>
                <h3>params</h3>
                <ul>
                    <li>xSize: 设置像素块宽度/48</li>
                    <li>ySize: 设置像素块高度/48</li>
                    <li>steps: 波浪开始到完全填充间的过程/[0.1, 0.1, 0.3, 0.5, 0.5, 1]</li>
                    <li>color: 波浪填充颜色/red</li>
                    <li>speedIn: 填充开始到完全填充（秒）/0.7</li>
                    <li>speedOut: 完全填充到填充结束/0.7</li>
                    <li>canvasTop: 填充遮罩层离顶部的间距/0：</li>
                    <li>canvasLeft: 填充遮罩层离左边的间距/0</li>
                    <li>autoCalculateSquaresSize: 是否自动为不同设备计算尺寸/true</li>
                    <li>delayMiddle: 动画结束延迟多长时间/0</li>
                </ul>
                <h3>start: 动画开始时执行的动作</h3>
                <h3>middle：页面转场时执行的动作</h3>
                <h3>end：动画结束时执行的动作</h3>
            </div>
        </div>
        <div class="right">
            <div v-for="(item, index) in pages" :key="index" :id="`page${index + 1}`" @click="setSteps(item)">{{ item }}</div>
        </div>
    </div>
</template>
<script>
import { pixelWaveTransfer } from '@/components/pixelWaveTransfer/pixelWaveTransfer.js'
export default {
    data: function() {
        return {
            pages: ['red', 'orange', 'blue', 'green'],
            currentPage: 1,
        }
    },
    methods: {
        setSteps (value) {
            const _that = this
            const pixelAnime = pixelWaveTransfer({
                params: {
                    color: value,
                },
                start: function() {},
                middle: function() {
                    if (_that.currentPage === _that.pages.length) {
                        document.getElementById(`page${_that.currentPage}`).style.display = 'none'
                        document.getElementById('page1').style.display = 'block'
                        _that.currentPage = 1
                    } else {
                        document.getElementById(`page${_that.currentPage}`).style.display = 'none'
                        document.getElementById(`page${_that.currentPage + 1}`).style.display = 'block'
                        _that.currentPage += 1
                    }
                },
                end: function() {}
            })
            pixelAnime.play()
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
        width: 37.3125rem;
        height: 46.9375rem;
        h1 {
            font-size: 18px;
            font-weight: bold;
            color: #252525;
            margin-bottom: 12px;
        }
        h2 {
            font-size: 16px;
            color: #252525;
            margin-bottom: 4px;
            margin-left: 64px;
        }
        h3 {
            font-size: 16px;
            color: #252525;
            margin-bottom: 2px;
            margin-left: 84px;
        }
        ul {
            margin-left: 104px;
            li {
                margin-bottom: 2px;
                font-size: 16px;
            }
        }
        p {
            font-size: 16px;
            margin-bottom: 4px;
        }
    }
    .right > div {
        width: 27.3125rem;
        height: 46.9375rem;
        overflow: hidden;
        display: none;
        cursor: pointer;
        font-size: 36px;
        font-weight: bold;
        line-height: 46.9375rem;
        text-align: center;
    }
    #page1 {
        display: block;
        background: cyan;
    }
    #page2 {
        background: chocolate;
    }
    #page3 {
        background: coral;
    }
    #page4 {
        background: cornflowerblue;
    }
}
</style>