<template>
    <div class="answer-content">
        <div class="answer-head">
            恭喜您，共答对<span class="right-answer">12</span>题，共<span class="total-answer">15</span>题
        </div>
        <div class="answer-item">
            <h4 class="answer-title"><span class="answer-count">1、</span>噪声对人体哪个系统有害：</h4>
            <ul class="answer-list">
                <li class="active">A、心血管系统</li>
                <li>B、消化系统</li>
                <li>C、呼吸系统</li>
            </ul>
        </div>
        <div class="answer-item">
            <h4 class="answer-title error-answer"><span class="answer-count">2、</span>噪声对人体哪个系统有害：</h4>
            <ul class="answer-list">
                <li class="active">A、心血管系统</li>
                <li>B、消化系统</li>
                <li>C、呼吸系统</li>
            </ul>
        </div>
        <div class="answer-item">
            <h4 class="answer-title"><span class="answer-count">1、</span>噪声对人体哪个系统有害：</h4>
            <ul class="answer-list">
                <li class="active">A、心血管系统</li>
                <li>B、消化系统</li>
                <li>C、呼吸系统</li>
            </ul>
        </div>
        <div class="answer-item">
            <h4 class="answer-title error-answer"><span class="answer-count">2、</span>噪声对人体哪个系统有害：</h4>
            <ul class="answer-list">
                <li class="active">A、心血管系统</li>
                <li>B、消化系统</li>
                <li>C、呼吸系统</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {

}
</script>

<style scoped>
    .answer-content {
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 1.23rem;
        color: #3e3a39;
        font-size: 0;
    }
    .answer-content,.history-out {
        position: relative;
        background-color: #ebebeb;
    }
    .answer-item {
        padding: .4rem 1.1rem 0;
        font-size: 0;
    }
    .answer-title {
        color: #231815;
        font-size: .28rem;
        line-height: 1;
        font-weight: 500;
        padding-bottom: .3rem;
    }
    .answer-head {
        height: 1.86rem;
        color: #fff;
        line-height: 1.86rem;
        background-color: #a2aac4;
        padding-left: .5rem;
        font-size: .32rem;
        font-weight: bold;
    }
    .right-answer {
        font-size: .46rem;
        line-height: 1;
    }
    .answer-count {
        font-size: .3rem;
        line-height: 1;
    }
    .error-answer {
        color: #e60012;
    }
    .answer-list li {
        font-size: .28rem;
        line-height: 1;
        color: #231815;
        padding: .32rem 0 .32rem .36rem; 
        background-color: rgba(182, 216, 244, .4);
        border-bottom: 1px solid #9c9ac7;
    }
    .answer-list li:last-child {
        border-bottom: 0;
    }
    .answer-list li.active {
        color: #fff;
        background-color: #8ba8d4;
    }
</style>
