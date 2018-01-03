<template>
    <div class="total-content">
        <div class="total-top">
            <go-back :topType="topType"></go-back>
            <div class="out">
                <div class="knowledge-search">
                    <form action="" class="search-form">
                        <input type="search" v-model="keyword" name="knowledge-search" id="nvg-search" placeholder="请输入基地名称">
                    </form>
                </div>
                <i class="search-icon" @click="getSearchInfo"></i>
            </div>
        </div>
        <div class="total-base-content">
            <div class="total-no-search" v-if="searchList.length === 0">
                <p class="total-search-tip">搜索指定内容</p>
                <div class="total-demo-search">
                    <span class="total-demo-text">农业基地</span>
                    <span class="total-demo-text">科技馆</span>
                </div>
                <div class="total-demo-search total-demo-search-bottom">
                    <span class="total-demo-text">博物馆</span>
                    <span class="total-demo-text">企业</span>
                </div>
            </div>
            <div class="total-search-info">
                <div class="search-type-area" v-for="(value, key) in searchList" :key="key" v-if="topType != 2">
                    <span v-if="topType == 1 && value.length > 0" class="type-name">{{key ==2 ?'基地导航': key ==3?'基地概况':key ==4?'知识竞赛':key ==5?'科普活动':''}}</span>
                    <ul class="total-search-history" @click="searchDetail">
                        <li v-for="(type, tindex) in value" :key="tindex" :data-address="type.address" :data-id="type.id" :list-type="key" >
                            <i class="total-history-search-icon"></i>
                            <span class="total-history-search-name">{{type.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="search-type-area" v-for="(value, key) in searchList" :key="key" v-if="topType == 2">
                    <ul class="total-base-list total-search-result"  @click="searchDetail">
                        <li v-for="(type, tindex) in value" :key="tindex" :data-address="type.address" :data-id="type.id" :list-type="key">
                            <i class="total-base-icon"></i>
                            <div class="total-base-info">
                                <h4>{{type.name}}</h4>
                                <span>{{type.address}}</span>
                            </div>
                            <div class="total-direction">
                                <span class="total-dir-count"><span class="total-count">{{type.count}}</span>人次</span>
                                <i class="total-direction-icon"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <span class="no-result" v-if="searchStatus">暂无搜索结果...</span>
            </div>
        </div>
    </div>
    
</template>
<script>
import goBack from './goBack';
export default {
    data() {
        return {
            actionUrl: "",
            searchList: [],
            keyword: '',
            searchStatus: false,
            topType: 1

        }
    },
    components: {
        goBack
    },
    mounted() {
        console.log('aaaaa');
        let kw = this.$route.params;
        this.keyword = kw.address;
        this.topType = kw.type;
        this.setFooterStatus(kw.type);
        this.getSearchInfo();
    },
    methods: {
        searchData(data) {
            console.log(data)
        },
        getSearchInfo() {
            let flag = true;
            this.$http.get(`/topSeach?topType=${this.topType}&title=${this.keyword}`)
                .then(res => {
                    this.searchList = res.data.msg;
                    for(let r in this.searchList) {
                        if(this.searchList[r].length > 0) {
                            flag = false;
                        }
                    }
                    this.searchStatus = flag;
                }).catch(err => {
                    console.log(err, 'search');
                });
        },
        searchDetail(evt) {
            let target = evt.target, searchItem = {};
            if(target.hasAttribute('data-id')) {
                searchItem.type = target.getAttribute('list-type');
                searchItem.id = target.getAttribute('data-id');
                searchItem.address = target.getAttribute('data-address');
            } else if(target.parentElement.hasAttribute('data-id')) {
                searchItem.type = target.parentElement.getAttribute('list-type');
                searchItem.id = target.parentElement.getAttribute('data-id');
                searchItem.address = target.parentElement.getAttribute('data-address');
            }
            if(searchItem.type == 2) {
                this.$http.get("/navigation", {id: searchItem.id}).then(res => {console.log(res)}).catch(error => {console.log(error)})
                this.$router.push({name: "searchPage", params: {address: searchItem.address}})
            } else if(searchItem.type == 3 || searchItem.type == 5) {
                this.$router.push({name: "articleDetail", params: {id: searchItem.id, type: searchItem.type}})
            } else if(searchItem.type == 4) {
                this.$router.push({name: 'competitionDetail'});
            }
        },
        setFooterStatus(topType) {
            switch(topType) {
                case 1:
                    this.$store.dispatch('homestate');
                break;
                case 3:
                    this.$store.dispatch("basestate");
                break;
                case 2:
                    this.$store.dispatch("navstate");
                break;
                case 5:
                    this.$store.dispatch("knowstate");
                break;
                case 4:
                    this.$store.dispatch("sciencestate");
                break;
                default:
                break;
            }
        }
    }
}
</script>
<style scoped>
    .total-content {
        font-size: 0;
    }
    .total-top {
        position: relative;
        height: 1.33rem;
        background-color: #fff;
        font-size: 0;
        text-align: center;
    }
     .out {
        font-size: 0;
    }
    .knowledge-search {
        display: inline-block;
        width: 4.5rem;
        height: .56rem;
        margin-top: .4rem;
    }
    .search-form {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 9;
    }
    #nvg-search {
        width: 100%;
        height: 100%;
        border: 0;
        color: #9d9d9e;
        background-color: #f6f6f7;
        padding-left: .32rem;
        border-top-right-radius: .26rem;
        border-bottom-right-radius: .26rem;
        border-top-left-radius: .26rem;
        border-bottom-left-radius: .26rem;
    }
    .search-icon {
        display: inline-block;
        width: .44rem;
        height: .42rem;
        background-image: url(../assets/images/search.png);
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .3rem;
    }
    .total-base-list li {
        display: flex;
        font-size: 0;
        padding-bottom: .2rem;
        border-bottom: 1px solid #f1f4f7;
    }
    .total-base-list li:last-child {
        border-bottom: 0;
    }
    .total-base-icon {
        display: inline-block;
        width: .2rem;
        height: .3rem;
        background-size: 100% 100%;
        margin: 0 .3rem;
        align-self: flex-end;
        background-image: url(../assets/images/list-location-icon-active.png);
    }
    .total-base-info {
        flex: 1;
    }
    .total-base-info h4 {
        font-size: .4rem;
        color: #615f5f;
        line-height: 1;
        padding-top: .32rem;
        font-weight: 500;
    }
    .total-base-info span {
        color: #9d9e9f;
        font-size: .22rem;
        line-height: 1;
        padding-top: .1rem;
        display: inline-block;
    }
    .total-direction {
        padding-right: .36rem;
        align-self: flex-end;
        font-size: 0;
    }
    .total-dir-count {
        color: #9d9e9f;
        font-size: .22rem;
        line-height: 1;
        padding-top: .46rem;
        padding-right: .28rem;
        display: inline-block;
    }
    .total-direction-icon,.total-content-arrow {
        display: inline-block;
        width: .47rem;
        height: .55rem;
        background-size: 100% 100%;
        background-image: url(../assets/images/direction.png);
        vertical-align: middle;
    }
    .total-no-search {
        font-size: 0;
    }
    .total-search-tip {
        font-size: .24rem;
        line-height: 1;
        text-align: center;
        color: #767776;
        padding-top: .2rem;
        padding-bottom: .5rem;
    }
    .total-demo-search {
        display: flex;
        flex-wrap: wrap;
        font-size: 0;
        padding: 0 1.5rem;
    }
    .total-demo-text {
        color: #4585c6;
        font-size: .24rem;
        line-height: 1;
        flex: 1;
        text-align: center;
        display: inline-block;
    }
    .total-demo-search-bottom {
        padding-top: .7rem;
    }
    .total-search-info {
        border-top: 1px solid #eeeded;
    }
    .total-search-info-list li {
        display: flex;
        padding-bottom: .1rem;
        font-size: 0;
    }
    .total-info-icon {
        width: .21rem;
        height: .3rem;
        background-size: 100% 100%;
        background-image: url(../assets/images/list-location-icon.png);
        margin: 0 .2rem 0 .26rem;
        align-self: flex-end;
    }
    .total-info-content {
        flex: 1;
        border-bottom: 1px solid #eeeded;
        height: 100%;
        display: flex;
        padding-bottom: .1rem;
        margin-bottom: -0.1rem;
        margin-right: .54rem;
        position: relative;
    }
    .total-contents {
        flex: 1;
    }
    .total-contents h4 {
        font-weight: 500;
        color: #615f5f;
        font-size: .3rem;
        line-height: 1;
        padding-top: .2rem;
    }
    .total-contents span {
        display: inline-block;
        font-size: .24rem;
        color: #9f9fa0;
        line-height: 1;
        padding-top: .12rem;
    }
    .total-content-arrow {
        position: absolute;
        right: -.1rem;
        top: 50%;
        transform: translateY(-50%);
    }
    .total-search-history {
        padding-top: .1rem;
    }
    .total-search-history li{
        font-size: 0;
        padding-bottom: .16rem;
        margin: 0 .54rem 0 .67rem;
        border-bottom: 1px solid #eeeded;
    }
    .total-history-search-icon {
        display: inline-block;
        width: .31rem;
        height: .29rem;
        background-image: url(../assets/images/list-search-icon.png);
        background-size: 100% 100%;
        margin-top: .17rem;
    }
    .total-history-search-name {
        padding-left: .2rem;
        padding-top: .17rem;
        font-size: .24rem;
        color: #9f9fa0;
        line-height: 1;
    }
    .type-name {
        font-size: .22rem;
        color: #fff;
        line-height: 1;
        border-top-right-radius: .19rem;
        border-top-left-radius: .19rem;
        border-bottom-right-radius: .19rem;
        border-bottom-left-radius: .19rem;
        padding-top: .1rem;
        display: block;
        width: 1.43rem;
        height: .30rem;
        margin-top: 0.54rem;
        margin-left: .67rem; 
        text-align: center;
        background-color: #b3b3b3;
    }
    .no-result {
        color: #615f5f;
        font-size: .28rem;
        width: 100%;
        line-height: 1;
        display: inline-block;
        text-align: center;
        padding-top: .2rem;
    }
</style>
