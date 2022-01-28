<template>
    <div class="container">
        <div class="left">
            <h1>使用说明</h1>
            <p>本转场特效由css实现，只需在vue文件中引用graphTransfer.less文件</p>
            <ul>
                <li>circleIn: 圆形</li>
                <li>triangleIn：三角形</li>
                <li>rectIn：矩形</li>
                <li>diamondIn：菱形</li>
                <li>rectSpIn：四角星到矩形</li>
                <li>sectorIn：扇形</li>
                <li>starIn：星形</li>
                <li>heartIn：爱心</li>
                <li>dotIn: 圆点绽放</li>
                <li>triangleFallin：三角陨落</li>
                <li>louverIn：百叶扇开</li>
                <li>sectorIn：扇形车轮</li>
                <li>brightnessIn：亮度</li>
                <li>grayscaleIn：灰度</li>
                <li>blurIn：模糊</li>
            </ul>
        </div>
        <div class="right">
            <div v-for="(item, index) in pages" :key="index" @click="setType(item)" :id="`page${index + 1}`">{{ item }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            pages: ['circleIn', 'triangleIn', 'rectIn', 'diamondIn', 'rectSpIn', 'sectorIn', 'starIn', 'heartIn', 'dotIn', 'triangleFallin', 'louverIn', 'wheelIn', 'brightnessIn', 'grayscaleIn', 'blurIn'],
            currentPage: 1,
        }
    },
    created() {
        setInterval(() => {
            this.setType(this.pages[this.currentPage - 1])

        }, 1000)
    },
    methods: {
        setType(value) {
            if (this.currentPage === this.pages.length) {
                document.getElementById(`page${this.currentPage}`).style.display = "none"
                document.getElementById(`page${this.currentPage}`).classList.remove(value)
                document.getElementById(`page1`).style.display = "block"
                document.getElementById(`page1`).classList.add(value)
                this.currentPage = 1
            } else {
                document.getElementById(`page${this.currentPage}`).style.display = "none"
                document.getElementById(`page${this.currentPage}`).classList.remove(value)
                document.getElementById(`page${this.currentPage + 1}`).style.display = "block"
                document.getElementById(`page${this.currentPage + 1}`).classList.add(value)
                this.currentPage += 1
            }
            
        }
    },
}
</script>
<style lang="less" scoped>
@import url('../../../../components/graphTransfer/graphTransfer.css');
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
        ul {
            li {
                margin-bottom: 2px;
                font-size: 16px;
            }
        }
        p {
            font-size: 16px;
            margin-bottom: 8px;
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
    #page5 {
        background: cyan;
    }
    #page6 {
        background: chocolate;
    }
    #page7 {
        background: coral;
    }
    #page8 {
        background: cornflowerblue;
    }
    #page9 {
        background: cyan;
    }
    #page10 {
        background: chocolate;
    }
    #page11 {
        background: coral;
    }
    #page12 {
        background: cornflowerblue;
    }
    #page13 {
        background: chocolate;
    }
    #page14 {
        background: coral;
    }
    #page15 {
        background: cornflowerblue;
    }
}
</style>