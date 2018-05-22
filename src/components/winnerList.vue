<template>
    <div class="winnerList">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count" v-show="!winnerObj.isShowSearchForm">{{title}}</h3>
            <go-back :topType="winnerObj.topType"></go-back>
        </div>
        <div class="seasion-content">
            <div class="seasion-content-top">
                <img src="../assets/images/list-img.png" class="seasion-img" alt=""/>
                <div class="seasion-info">
                    <span class="seasion-title">{{winner.title}}</span>
                    <span class="seasion-number">参与人数：{{winner.count}}</span>
                </div>
            </div>
            <div class="prize-group">
                <!-- <h4 class="prize-name">获奖名单</h4>
                <div class="student-group">
                    <ul class="student name-list">
                        <li v-for="(item, index) in winner.list" :key="index">{{item}}</li>
                    </ul>
                </div> -->
                <div class="nav-bar" @click="$router.push({name: 'luckyUsers', params: {aid: id}})">幸运用户</div>
                <div class="nav-bar">基地详情</div>
            </div>
        </div>
    </div>
</template>
<script>
import goBack from './goBack';
import search from  './search';
export default {
    data() {
        return {
            winnerObj: {
                actionUrl: '',
                isShowSearch: true,
                isShowSearchForm: false,
                topType: 4,
                isShowSearchIcon: true
            },
            winner: {
                title: '',
                list: [],
                count: 0
            },
            title: '',
            id: ''
        }
    },
    components: {
        goBack,
        search
    },
    mounted() {
        console.log(this.$route.params.id)
        let params = this.$route.params;
        this.id = params.id
        this.title = params.title;
        this.getWinnerList(params.id);
    },
    methods: {
        searchWinnerData(e) {
            console.log(e);
        },
        getWinnerList(id) {
            this.$http.get(`/winners?id=${id}`).then( res => {
                this.winner = res.data.msg;
            }).catch( err => {
                console.log(err);
            });
        }
    }
}
</script>
<style scoped>
    .knowledge-top {
        position: relative;
        height: 1.33rem;
        background-color: #fff;
        font-size: 0;
        text-align: center;
    }
    .title-tip {
        color: #030000;
        font-size: .46rem;
        line-height: 1.04rem;
        width: 2.33rem;
        height: 1.04rem;
        text-align: center;
        background-size: 100% 100%;
        display: inline-block;
        margin-top: .23rem;
        background-image: url(../assets/images/title-bg.png);
    }
    .seasion-content {
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
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
        /* justify-content: space-between; */
        font-size: 0;
    }
    .name-list li{
        font-size: .22rem;
        line-height: 1;
        color: #231815;
        padding: .3rem .15rem 0 0;
    }
    .seasion-title {
        padding-left: 2.6rem;
    }
    .nav-bar {
        font-size: .24rem;
        line-height: 1;
        padding: .38rem 0 .38rem .68rem;
        background-color: rgba(255, 255, 255, .4);
        color: #00061a;
    }
    .nav-bar:last-child {
        margin-top: .48rem;
    }
</style>
