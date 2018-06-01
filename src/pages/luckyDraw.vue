<template>
    <div class="lucky-draw-content">
        <!-- 632   -->
        <div class="red-bag-list">
            <div class="red-bag">
                <div class="red-bag-info"><span>￥0.12</span></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'luckyDraw',
    data() {
        return {
            redBagList:[]
        }
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
        width: 3.93rem;
        height: 3.93rem;
        font-size: 0;
        margin: 6.33rem auto 0;
    }
    .red-bag {
        width: 1.18rem;
        height: 1.18rem;
        border-radius: 0.1rem;
        background-color: #ffff8c;
        position: relative;
        display: inline-block;
        font-size: 0;
    }
    .red-bag:nth-child(5) {
        width: 1.18rem;
        height: 1.18rem;
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
        transform: translateY(-50%);
        left: 0;
    }
</style>
