<template>
    <div :id="id" class="page_container">
        <div class="startPage">
            <slot name="startPage"></slot>
        </div>
        <div class="endPage">
            <slot name="endPage"></slot>
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
        type: {
            type: String,
            default: 'circle',
        },
    },
    mounted() {
        const _that = this
        document.querySelectorAll(`#${this.id} .startPage`)[0].addEventListener('click', () => {
            _that.play()
        })
    },
    methods: {
        play() {
            const clsName = this.getClass()
            // 隐藏第一页面，显示第二页面
            document.querySelectorAll(`#${this.id} .startPage`)[0].style.display = "none"
            document.querySelectorAll(`#${this.id} .startPage`)[0].classList.remove(clsName)
            document.querySelectorAll(`#${this.id} .endPage`)[0].style.display = "block"
            document.querySelectorAll(`#${this.id} .endPage`)[0].classList.add(clsName)
            const _that = this
            setTimeout(() => {
                _that.reset()
            }, 1000)
        },
        getClass() {
            switch (this.type) {
                case 'triangle':
                    return 'triangleIn'
                    break;
                case 'rect':
                    return 'rectIn'
                    break;
                case 'diamond':
                    return 'diamondIn'
                    break;
                case 'rectSp':
                    return 'rectSpIn'
                    break;
                case 'sector':
                    return 'sectorIn'
                    break;
                case 'star':
                    return 'starIn'
                    break;
                case 'heart':
                    return 'heartIn'
                    break;
                default:
                    return 'circleIn'
                    break;
            }
        },
    },
}
</script>
<style lang="less" scoped>
@import url('./graphTransfer.less');
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
        z-index: 1;
    }
    .endPage {
        display: none;
    }
}
</style>