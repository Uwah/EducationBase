<template>
    <!-- 幸运用户列表 -->
    <div class="lucky-out">
        <div class="lucky-content">
            <div class="lucky-head">
                <i class="goHistory" @click="$router.push({name: 'winnerList', params: {title: lastRouteInfo.title, id: lastRouteInfo.id}})"><</i>
                <div class="last-phase" @click="$router.push({name: 'competitionList', params: {seasonId: 'later', title: '往期'}})"><<往期</div>
            </div>
            <div class="lucky-content-list">
                <ul class="luckyList">
                    <li class="lucky-user" v-for="(item, index) in luckyList" :key="index">
                        <span class="lucky-user-info">{{item.realName}}</span>
                        <span class="lucky-user-info">{{item.mobileNum | phoneFormat}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="lucky-footer">
            <span class="lucky-tip" v-if="luckyList.length > 0">请以上幸运用户在{{luckyList[0].visitTime | formatVisiTime}}前前往{{luckyList[0].jdName}}扫码免费参观</span>
            <span class="copy-right">本活动最终解释权由嘉兴科普教育基地所有</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'luckyUserList',
    data: () => ({
        luckyList: [],
        visiTime: '5月30日',
        museumName: '城市博物馆',
        lastRouteInfo: {
            title: '',
            id: ''
        }
    }),
    mounted() {
        this.getluckyUserList();
        const params = this.$route.params;
        if(Object.keys(params).length > 0) {
            this.lastRouteInfo = {title: params.title, id: params.aid}
        }
        
    },
    components: {},
    beforeRouteEnter(to, from, next) {
        if(from.params.id) {
            next()
        } else {
            next(vm => {
                vm.$router.push({name: 'indexHome'})
            })
        }
    },
    methods: {
        async getluckyUserList() {
            const aid = this.$route.params.aid
            const list = await this.$http.get(`/listLuckeyUser?aid=${aid}`)
            if(list.data.code === '200') {
                this.luckyList = list.data.msg
            }
        }
    },
    filters: {
        formatVisiTime(timeSecond) {
            var time = ''
            if(timeSecond) {
                var date = new Date(timeSecond)
                time = date.getMonth() + 1 + '月' + date.getDate() + '日'
            }
            return time
        },
        phoneFormat(phoneNum) {
            var phone = ''
            if(phoneNum) {
                const reg = /^(\d{3})\d*(\d{4})$/g
                phone = phoneNum.replace(reg, '$1****$2')
            }
            return phone
        }
    }
}
</script>
<style>
    #app {
        height: 100%;
        /* padding: 0; */
        margin-bottom: 0;
    }
    .lucky-out {
        width: 100%;
        height: 100%;
        background: linear-gradient(#3790d1 84%, #00adb2);
        font-size: 0;
        overflow-y: auto;
        position: relative;
        margin: 0;
        z-index: 9999;
    }
    .lucky-content {
        min-height: 100%;
        margin-bottom: -1rem;
    }
    .lucky-head {
        height: 4.35rem;
        width: 100%;
        font-size: 0;
        position: relative;
        background-image: url(../assets/images/lucky-user-top.png);
        background-size: 100% 100%;
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
        padding-top: 1.52rem;
        font-size: .3rem;
    }
    .lucky-content-list {
        font-size: 0;
        background-image: url(../assets/images/lucky-user-bottom.png);
        background-size: 100% 100%;
        padding: 0.82rem .48rem 1rem;
    }
    .luckyList {
        font-size: 0;
        background-color: #fff;
        border: .06rem solid #1072c4;
        border-radius: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
        margin-top: 0.42rem;
        padding: .7rem .1rem 0.1rem;
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
        padding-bottom: .1rem;
        color: #155996;
    }
</style>
