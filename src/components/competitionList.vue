<template>
    <!-- 知识竞赛列表 -->
    <div class="competition">
        <!-- <top-head></top-head> -->
        <div class="history-out">
            <div class="history-knowledge">
                <!-- 往期列表 -->
                <div class="history-knowledge-type">
                    <img src="../assets/images/cell-list-img.png" class="history-knowledge-type-img" alt="">
                    <div class="history-knowledge-type-content">
                        <span class="history-knowledge-type-title">第25期</span>
                        <span class="sub-title">生活知识竞赛</span>
                        <span class="history-knowledge-count">参与人数：756</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
// import topHead from 'Header.vue';
import goBack from './goBack';
import search from  './search';
export default {
    data() {
        return {

        }
    },
    components:{
        goBack,
        search
    }
}
</script>
<style scoped>
    .history-out{
        position: relative;
        background-color: #ebebeb;
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 1.23rem;
        color: #3e3a39;
        font-size: 0;
    }
    .history-knowledge {
        display: flex;
        justify-content: space-between;
        padding-top: 0.2rem;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .history-knowledge-type {
        padding-top: .4rem;
        font-size: 0;
        padding: 0 .6rem 0 .4rem;
        height: 2.1rem;
        border-bottom: 1px solid #b3adaa;
        display: flex;
    }
    .history-knowledge-type-img {
        width: 1.84rem;
        height: 1.78rem;
        align-self: center;
    }
    .history-knowledge-type-content {
        flex: 1;
        padding-left:.5rem;
        font-size: 0;
    }
    .history-knowledge-type-title,.sub-title,.history-knowledge-count {
        display: inline-block;
        padding-top: .16rem;
        color: #595757;
        font-size: .26rem;
        line-height: 1;
        width: 100%;
    }
    .history-knowledge-type-title {
        padding-top: .4rem;
    }
    .history-knowledge-count {
        padding-top: .24rem;
        color: #3e3a39;
        font-size: .22rem;
    }
</style>


