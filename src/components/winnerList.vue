<template>
    <div class="seasion-content">
        <div class="seasion-content-top">
            <img src="" class="seasion-img" alt="">
            <div class="seasion-info">
                <span class="seasion-title">生活知识竞赛</span>
                <span class="seasion-number">参与人数：756</span>
            </div>
        </div>
        <div class="prize-group">
            <h4 class="prize-name">获奖名单</h4>
            <div class="student-group">
                <h4 class="group-title">中学生组</h4>
                <ul class="student name-list">
                    <li>陈胤捷</li>
                    <li>胡一天</li>
                    <li>林静晓</li>
                    <li>林静晓</li>
                    <li>陈胤捷</li>
                    <li>胡一天</li>
                    <li>林静晓</li>
                    <li>陈胤捷</li>
                    <li>胡一天</li>
                    <li>林静晓</li>
                    <li>陈胤捷</li>
                    <li>胡一天</li>
                    <li>林静晓</li>
                </ul>
            </div>
            <div class="adult-group">
                <h4 class="group-title">成人组</h4>
                <ul class="adult name-list">
                    <li>张庭振</li>
                    <li>赵梓帆</li>
                    <li>殷恬歌</li>
                    <li>张庭振</li>
                    <li>赵梓帆</li>
                    <li>殷恬歌</li>
                    <li>张庭振</li>
                    <li>赵梓帆</li>
                    <li>殷恬歌</li>
                    <li>张庭振</li>
                    <li>赵梓帆</li>
                    <li>殷恬歌</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
    .seasion-content {
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 1.23rem;
        color: #3e3a39;
        font-size: 0;
    }
    .seasion-count {
        font-size: .4rem;
    }
    .seasion-content-top {
        position: relative;
        font-size: 0;
        height: 4.5rem;
    }
    .seasion-img {
        display: inline-block;
        width: 2.28rem;
        height: 3.4rem;
        transform: rotate(-2deg);
        margin-left: 1.1rem;
        z-index: 9;
        position: absolute;
        margin-top: 1rem;
    }
    .seasion-info {
        background-color: #fff;
        font-size: 0;
        text-align: right;
        position: absolute;
        height: 2.6rem;
        left: 50%;
        top: 1.4rem;
        transform: translateX(-50%);
        width: 5.8rem;
        box-shadow: 6px 6px 2px #9d9d9d;
    }
    .seasion-info span {
        font-size: .26rem;
        color: #231815;
        padding-right: .9rem;
        line-height: 1;
        display: block;
    }
    .seasion-info span:nth-child(1) {
        padding-top: .9rem;
    }
    .seasion-info span:last-child{
        padding-top: .3rem;
    }
    .prize-group {
        font-size: 0;
        position: relative;
    }
    .prize-name {
        font-size: .38rem;
        color: #231815;
        line-height: 1;
        padding-left: 1rem;
        margin-top: 1.05rem;
        position: relative;
        font-weight: 500;
    }
    .prize-name:after {
        content: "";
        border-top: 2px solid #231815;
        border-right: 2px solid #231815;
        transform: rotate(45deg);
        position: absolute;
        margin-left: .4rem;
        height: .2rem;
        width: .2rem;
        top: calc(50% - .11rem);
    }
    .student-group, .adult-group {
        padding: 0 1rem;
        font-size: 0;
    }
    .group-title {
        font-size: .22rem;
        line-height: 1;
        color: #231815;
        padding: .9rem 0 .3rem 0;
    }
    .name-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 0;
    }
    .name-list li{
        font-size: .22rem;
        line-height: 1;
        color: #231815;
        padding: .3rem .1rem 0 0;
    }
</style>
