<template>
    <div class="lucky-draw-content">
        <!-- 632   -->
        <div class="red-bag-list">
            <div :class="['red-bag', !item.money?'red-bag-go':'', 
            i === activeIndex ? 'red-bag-active':'', ]" v-for="(item, i) in redBagList" :key="i">
                <div class="red-bag-info" v-if="item.money"><span>￥{{item.money}}</span></div>
                <button class="draw-begin" @click="startLottery" v-else></button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'luckyDraw',
    data() {
        return {
            redBagList:[],
            activeIndex: -1,
            index: -1,    // 当前转动到哪个位置，起点位置
            count: 8,    // 总共有多少个位置
            timer: 0,    // 每次转动定时器
            speed: 200,   // 初始转动速度
            times: 0,    // 转动次数
            cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1,   // 中奖位置
            click: true,
            showToast: false,
            toastType: 'luck',
            indexLock: true
        }
    },
    mounted() {
        let drawList = []
        for(var i = 0; i < 8; i++) {
            drawList.push(
                {money: Math.random().toFixed(2)}
            )
        }
        drawList.splice(4, 0, 'go')
        this.redBagList = drawList
        // window.addEventListener('scroll', function(e) {
        //     e.preventDefault()
        // })
    },
    methods: {
        
        startLottery () {
            if (!this.click) {
                return
            }
            // this.closeToast()
            this.speed = 200
            this.click = false
            this.startRoll()
        },

        // 开始转动
        startRoll () {
            this.times += 1  // 转动次数
            this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化
            if(this.indexLock) {
                switch(this.index) {
                    case 3:
                    this.activeIndex = 5;
                    break;
                    case 4:
                    this.activeIndex = 8;
                    break;
                    case 5:
                    this.activeIndex = 7;
                    break;
                    case 7:
                    this.activeIndex = 3;
                    break;
                    default:
                    break;
                }
            }
            
            // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
            if (this.times > this.cycle + 10 && this.prize === this.index) {
                clearTimeout(this.timer)   // 清除转动定时器，停止转动
                this.prize = -1
                this.times = 0
                this.click = true
                this.showToast = true
                this.toastType = 'comeOn'
                console.log('你已经中奖了')
            } else {
                if (this.times < this.cycle) {
                    this.speed -= 10   // 加快转动速度
                } else if (this.times === this.cycle) {    // 随机获得一个中奖位置
                    const index = parseInt(Math.random() * 10, 0) || 0
                    this.prize = index
                    if (this.prize > 7) {
                    this.prize = 7
                    }
                    console.log(`中奖位置${this.prize}`)
                } else if (this.times > this.cycle + 10 &&
                    ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
                    this.speed += 110
                } else {
                    this.speed += 20
                }

                if (this.speed < 40) {
                    this.speed = 40
                }
                this.timer = setTimeout(this.startRoll, this.speed)
            }
        },

        // 每一次转动
        oneRoll () {
            let index = this.index  // 当前转动到哪个位置
            const count = this.count  // 总共有多少个位置
            index += 1
            if (index > count - 1) {
                index = 0
            }
            this.index = index
            this.activeIndex = index
        },

    }
}
</script>
<style scoped>
    .lucky-draw-content {
        font-size: 0;
        width: 100%;
        height: 13.34rem;
        background-image: url('../assets/images/redBag/lucky-draw-bg.png');
        background-size: 100% 100%;
        position: relative;
        overflow: hidden;
        z-index: 9999;
        background-repeat: no-repeat;
    }
    .red-bag-list {
        width: 4.12rem;
        height: 4rem;
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 6.37rem auto 0;
    }
    .red-bag {
        width: 1.18rem;
        height: 1.18rem;
        border-radius: 0.1rem;
        background-color: #ffff8c;
        position: relative;
        display: inline-block;
        font-size: 0;
        margin-right: .28rem;
    }
    .draw-begin {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }
    .red-bag-active {
        background-color: #fdb685;
    }
    .red-bag:nth-child(3n) {
        margin-right: 0;
    }
    .red-bag:nth-child(5) {
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .red-bag-go {
        background-image: url('../assets/images/redBag/go-img.png');
    }
    .red-bag-end {
        background-image: url('../assets/images/redBag/end-img.png');
    }
    .red-bag-info {
        width: 0.57rem;
        height: .76rem;
        background-image: url('../assets/images/redBag/red-bag.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0;
        text-align: center;
    }
    .red-bag-info  span {
        color: #ffbb00;
        font-size: 0.14rem;
        line-height: 1.2;
        position: absolute;
        top: 50%;
        left: 0;
    }
</style>
