<template>
    <div class="container">
        <div class="navigation-top">
            <h3 class="title-tip" v-show="!isShowSearchForm">基地导航</h3>
            <go-back></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div>
        <div class="search-base-banner">
            <div class="swiper-container" id="search-result">
                <div class="swiper-wrapper">
                    <div :class="['swiper-slide', index==0?'active':'']"  v-for="(item, index) in baseTypeList" :key="index"><div class="base-type">{{item.typeName}}<span class="type-count">{{item.count}}</span></div></div>
                </div>
            </div>
        </div>
        <div class="base-content">
            <ul class="base-list search-result">
                <!-- item.id -->
                <li v-for="(item, index) in baseAddress" :key="index">
                    <i class="base-icon"></i>
                    <div class="base-info">
                        <h4>船文化博物馆</h4>
                        <span>{{item.address}}</span>
                    </div>
                    <div class="direction">
                        <span class="dir-count"><span class="count">{{item.count}}</span>人次</span>
                        <i class="direction-icon"></i>
                    </div>
                </li>
            </ul>
            <div class="no-search">
                <p class="search-tip">搜索指定内容</p>
                <div class="demo-search">
                    <span class="demo-text">农业基地</span>
                    <span class="demo-text">科技馆</span>
                </div>
                <div class="demo-search demo-search-bottom">
                    <span class="demo-text">博物馆</span>
                    <span class="demo-text">企业</span>
                </div>
            </div>
            <div class="search-info" style="display: none;">
                <ul class="search-info-list">
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                </ul>
                <ul class="search-history">
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
const Swiper = require("../assets/script/util/swiper.min.js");
import goBack from '../components/goBack';
import search from '../components/search';
export default {
    data() {
        return {
            baseTypeList: [],
            actionUrl: "",
            isShowSearch: true,
            isShowSearchForm: false,
            isShowSearchIcon: true,
            type: 1,
            topType: 2,
            baseAddress: []
        }
    },
    mounted() {
        document.body.scrollTop=0;
        this.getBaseTypeList();
        new Swiper("#search-result", {
            slidesPerView: 3,
            spaceBetween: 13,
            observer:true
        });
        setTimeout(() => {
            document.getElementById('search-result').children[0].style.transform="translate3d(0px, 0px, 0px)";
        }, 100);
    },
    methods: {
        getBaseTypeList() {
            this.$http.get('/getBaseSummary').then( res => {
                this.baseTypeList = res.data.msg.types;
            }).catch( err => {
                console.log(err, 'earthBaseProfile');
            })
        },
        searchData(data) {
            if(data === '') {
                this.isShowSearchForm = true;
                this.baseAddress = [];
            } else {
                this.baseAddress = data;
            }
        }
    },
    components: {
        goBack,
        search
    }
}
</script>
<style src="../assets/css/baseNavigation.css" scoped></style>


