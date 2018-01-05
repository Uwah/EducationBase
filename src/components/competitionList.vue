<template>
    <!-- 知识竞赛列表 -->
    <div class="competition">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count" v-show="!searchObj.isShowSearchForm">{{season.title}}</h3>
            <go-back :topType="searchObj.topType"></go-back>
            <search :actionUrl="searchObj.actionUrl" :isShowSearch="searchObj.isShowSearch" 
            :isShowSearchForm="searchObj.isShowSearchForm" @search-data="searchSeasionData" :topType="searchObj.topType" :isShowSeachIcon="searchObj.isShowSeachIcon"></search>
        </div>
        <div class="history-out">
            <div class="history-knowledge">
                <!-- 往期列表 -->
                <div class="history-knowledge-type" @click="$router.push({name: 'winnerList',params:{id:item.id, title: `第${item.periods}期`}})" :data-id="item.id" v-for="(item, index) in season.list" :key="index"> 
                    <img :src="item.fileName" class="history-knowledge-type-img" alt="">
                    <div class="history-knowledge-type-content">
                        <span class="history-knowledge-type-title">第{{item.periods}}期</span>
                        <span class="sub-title">{{item.title}}</span>
                        <span class="history-knowledge-count">参与人数：{{item.indiProfile}}</span>
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
            searchObj: {
                actionUrl: '',
                isShowSearch: true,
                isShowSearchForm: false,
                topType: 4,
                isShowSearchIcon: true
            },
            season: {
                title: '',
                list: []
            },

        }
    },
    components:{
        goBack,
        search
    },
    mounted() {
        document.body.scrollTop=0;
        this.getSeasionList();
    },
    methods: {
        getSeasionList() {
             //    /psActivities 是查询往期接口
             let params = this.$route.params;
            console.log(params.seasonId);
            this.$http.get('/psActivities').then( res => {
                this.season.title = params.title || '往期';
                this.season.list = res.data.msg;
            }).catch( err => {
                console.error(err, 'competitionList')
            });
        },
        searchSeasionData(data) {
            debugger
            if(data==='') {
               this.searchObj.isShowSearchForm = true;
            } else {
                this.$router.push({name: 'totalSearch',params: {address: data, type: this.searchObj.topType}})
            //    this.season.list = data;
            }
        },
        checkWinnerList(e) {
            console.log(e.target.getAttribute('data-id'))
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


