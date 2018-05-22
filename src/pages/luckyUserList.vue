<template>
    <!-- 幸运用户列表 -->
    <div class="lucky-out">
        <div class="lucky-content">
            <div class="lucky-head">
                <i class="goHistory"><</i>
                <div class="last-phase"><<上一期</div>
            </div>
            <div class="lucky-content-list">
                <ul class="luckyList">
                    <li class="lucky-user" v-for="(item, index) in luckyList" :key="index">
                        <span class="lucky-user-info">{{item.name}}</span>
                        <span class="lucky-user-info">{{item.phone}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- flex 弹性盒子贴底 -->
        <div class="lucky-footer">
            <span class="lucky-tip">请以上幸运用户在{{visiTime}}前前往{{museumName}}扫码免费参观</span>
            <span class="copy-right">本活动最终解释权由嘉兴科普教育基地所有</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'luckyUserList',
    data: () => ({
        luckyList: [
            
        ],
        visiTime: '5月30日',
        museumName: '城市博物馆'
    }),
    mounted() {
        this.getluckyUserList()
    },
    components: {},
    methods: {
        // async getluckyUserList() {
        //     const aid = this.$route.params.aid
        //     const list = await this.$http.get(`/listLuckeyUser?aid=${aid}`)
        //     console.log(list)
        // }
    },
    filter: {

    }
}
</script>
<style>
    #app {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #bottomNav {
        display: none;
    }
    .lucky-out {
        width: 100%;
        height: 100%;
        background: linear-gradient( #5288e2, #00adb2);
        font-size: 0;
        overflow-y: auto;
        position: relative;
        margin: 0;
    }
    .lucky-content {
        min-height: 100%;
        margin-bottom: -1rem;
    }
    .lucky-head {
        height: 3.25rem;
        width: 100%;
        font-size: 0;
        position: relative;
        background-image: url(../assets/images/lucky-user-top.png);
        background-size: cover;
    }
    .goHistory {
        margin: .3rem 0 0 .4rem;
        width: .32rem;
        height: .32rem;
        display: inline-block;
        border-top: 2px solid #4e4e4e;
        border-left: 2px solid #4e4e4e;
        transform: rotate(-45deg);
    }
    .last-phase {
        color: #fff;
        line-height: 1;
        padding-top: .92rem;
        font-size: .3rem;
    }
    .lucky-content-list {
        font-size: 0;
        background-image: url(../assets/images/lucky-user-bottom.png);
        background-size: cover;
        padding: 0.82rem .44rem 1rem;
    }
    .luckyList {
        font-size: 0;
        background-color: #fff;
        border: .06rem solid #1072c4;
        border-radius: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
        padding: .7rem .24rem 0.1rem;
    }
    .lucky-user {
        font-size: 0;
        background-color: #e2e9f7;
        border-radius: 5px;
        margin-bottom: .2rem;
        display: flex;
        justify-content: space-around;
    }
    .lucky-user:last-child {
        margin-bottom: 0;
    }
    .lucky-user-info {
        color: #194f90;
        font-size: .34rem;
        display: inline-block;
        line-height: 1;
        padding: .36rem 0;
    }
    .lucky-footer {
        font-size: 0;
        left: 0;
        height: 1rem;
        margin-top: -1rem;
        bottom: 0;
    }
    .lucky-tip {
        color: #0e375b;
        font-size: .26rem;
        line-height: 1;
        padding: .12rem 0 .1rem 0;
        display: inline-block;
        width: 100%;
        text-align: center;
    }
    .copy-right {
        font-size: .22rem;
        line-height: 1;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #155996;
    }
</style>
