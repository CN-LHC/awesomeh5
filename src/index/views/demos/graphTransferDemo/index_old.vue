<template>
    <div class="holder">
        <h1>type</h1>
        <p>设置图形转场动效类型</p>
        <div class="title">
            通过使用clip-path剪切的方式实现
        </div>
        <h1>
            圆形circle
            <span @click="setType('circle')">播放</span>
        </h1>
        <h1>
            三角形triangle
            <span @click="setType('triangle')">播放</span>
        </h1>
        <h1>
            矩形rect
            <span @click="setType('rect')">播放</span>
        </h1>
        <h1>
            菱形diamond
            <span @click="setType('diamond')">播放</span>
        </h1>
        <h1>
            四角星到矩形rectSp
            <span @click="setType('rectSp')">播放</span>
        </h1>
        <h1>
            扇形sector
            <span @click="setType('sector')">播放</span>
        </h1>
        <div class="title">
            通过使用mask遮罩的方式实现
        </div>
        <h1>
            星形star
            <span @click="setType('star')">播放</span>
        </h1>
        <h1>
            爱心heart
            <span @click="setType('heart')">播放</span>
        </h1>
        <div class="page">
            <graphTransfer
                ref="graphTest"
                id="graphTest"
                :type="type"
            >
                <template v-slot:startPage>
                    <div class="one">
                        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0428%2F8d23b8bej00qs8xg0001lc000hs00m8c.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645153920&t=68edbe43ef9a6a359c672ad7a806efc3" alt="">
                    </div>
                </template>
                <template v-slot:endPage>
                    <div class="two">
                        <img src="https://img2.baidu.com/it/u=2937006363,262327647&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=581" alt="">
                    </div>
                </template>
            </graphTransfer>
        </div>
    </div>
</template>
<script>
import graphTransfer from '@/components/graphTransfer'
export default {
    data: function() {
        return {
            type: 'circle'
        }
    },
    components: {
        graphTransfer
    },
    methods: {
        play(refName = 'graphTest') {
            this.$refs[refName].play();
        },
        setType(value) {
            this.type = value
            this.$nextTick(() => {
                this.play('graphTest')
            })
        }
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
.title {
    font-size: 18px;
    font-weight: bold;
    margin:12px 0;
}
.page {
  width: 437px;
  height: 751px;
  margin-bottom: 100px;
  .one {
      width: 100%;
      height: 100%;
      background: coral;
      > img {
          height: 100%;
          width: auto;
      }
  }
  .two {
      width: 100%;
      height: 100%;
      background: darkgoldenrod;
      > img {
          height: 100%;
          width: auto;
      }
  }
}
</style>