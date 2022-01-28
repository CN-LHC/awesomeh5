<template>
    <div :id="id" class="page_container">
        <div class="endPage">
            <slot name="endPage"></slot>
        </div>
        <div class="startPage">
            <slot name="startPage"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        xSize: {
            type: Number,
            default: 48
        }, // 设置像素块宽度
        ySize: {
            type: Number,
            default: 48
        }, // 设置像素块高度
        steps: {
            type: Array,
            default: function() {
                return [0.1, 0.1, 0.3, 0.5, 0.5, 1]
            }
        }, // 波浪开始到完全填充间的过程 
        color: {
            type: String,
            default: 'red'
        }, // 波浪填充颜色
        speedIn: {
            type: Number,
            default: 0.7
        }, // 填充开始到完全填充（秒）
        speedOut: {
            type: Number,
            default: 0.7
        }, // 完全填充到填充结束
        canvasTop: {
            type: Number,
            default: 0
        }, // 填充遮罩层离顶部的间距
        canvasLeft: {
            type: Number,
            default: 0
        }, // 填充遮罩层离左边的间距
        autoCalculateSquaresSize: {
            type: Boolean,
            default: true
        }, // 是否自动为不同设备计算尺寸
        delayMiddle: {
            type: Number,
            default: 0
        }, // 动画结束延迟多长时间
    },
    mounted() {
        const _that = this
        document.querySelectorAll(`#${this.id} .startPage`)[0].addEventListener('click', () => {
            _that.play()
        })
    },
    methods: {
        play() {
            const pixelwave = new PixelWave({
                canvasTop: this.canvasTop,
                canvasLeft: this.canvasLeft,
                xSize: this.xSize,
                ySize: this.ySize,
                steps: this.steps,
                color: this.color,
                speedIn: this.speedIn,
                speedOut: this.speedOut,
                autoCalculateSquaresSize: this.autoCalculateSquaresSize,
                delayMiddle: this.delayMiddle,
            });
            pixelwave.start(this.start, this.middle, this.end);
        },
        reset() {
            document.querySelectorAll(`#${this.id} .startPage`)[0].style.display = "block"
        },
        start() {
            console.log('start')
        },
        middle () {
            console.log('middle')
            document.querySelectorAll(`#${this.id} .startPage`)[0].style.display = "none";
        },
        end () {
            console.log('end')
        }
    },
}
</script>
<style lang="less" scoped>
.page_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>