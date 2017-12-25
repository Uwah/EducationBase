<template>
    <div class="container">
        <div class="profile-top">
            <h3 class="title-tip" v-show="!isShowSearchForm">基地概况</h3>
            <go-back></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div>
        <div class="profile-list-content">
            <div class="profile-banner">
                <div class="swiper-container" id="profile-banner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in banners.banners" :key="index"
                        ><a href=""><img :src="item.fileName" /></a></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="title-list-out">
                <div class="profile-title-list">
                    <div class="swiper-container" id="profile-list-swiper">
                        <div class="swiper-wrapper">
                            <div :class="['swiper-slide',index==0?'active':'']" v-for="(item, index) in banners.types" :data-id="item.id">{{item.typeName}}</div>
                        </div>
                    </div>
                    <i :class="['content-type',contentType]" @click="profileChange"></i>
                </div>
            </div>
            <div class="profile-list">
                <div class="cell-list-content" v-if="contentType == 'cell'">
                    <div class="cell-type" @click="$router.push({path: `/articleDetail/1`})"> <!--  v-for="item in profileList" -->
                        <img src="../assets/images/cell-list-img.png" class="cell-img" alt="">
                        <div class="cell-detail">
                            <span class="cell-position"><i class="position-icon"></i>秀洲区</span>
                            <span class="cell-position-name">嘉兴市五四文化博物馆</span>
                        </div>
                    </div>
                </div>
                <div class="list-list-content" v-if="contentType == 'list'">
                    <div class="earth-list-type" @click="$router.push({path: `/articleDetail/1`})">
                        <img src="../assets/images/cell-list-img.png" class="list-type-img" alt="">
                        <div class="list-type-content">
                            <span class="list-type-title">嘉兴市五四文化博物馆</span>
                            <p>南京理工大学是2006年4月国家教育部批准增科技大学等104所学校61个国家大学生文化素质教育基地之一...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let search = require("../components/search.vue");
let goBack = require("../components/goBack.vue");
const Swiper = require("../assets/script/util/swiper.min.js");
export default {
    data() {
        return {
            actionUrl: "",
            isShowSearch: true,
            isShowSearchForm: false,
            isShowSearchIcon: true,
            contentType: "cell",
            profileList: [],
            banners: {},
            type: 1,
            topType: 3
        }
    },
    mounted() {
        this.getBannerinfoList();
        this.getAllEarthBase(1);
        new Swiper("#profile-banner", {
            autoplay: true,
            observer:true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
        new Swiper("#profile-list-swiper", {
            observer:true,
            slidesPerView: 4,
            spaceBetween: 20
        });
    },
    methods: {
        searchData(e) {
            console.log(e)
            if(!this.isShowSearchForm) {
                this.isShowSearchForm = true;
            } else {
                console.log(e);

            }
        },
        profileChange(e) {
            this.contentType = this.contentType ==='cell' ? 'list': 'cell';
        },
        getAllEarthBase(type) {
            this.$http.get(`/searchType?searchType=${type}`).then(res => {
                console.log(1111);
                console.log(res)
            }).catch(err => {
                console.log(err, "基地导航");
            });
        },
        searchEarthBase(type) {
            this.$http.get(`/searchJd?searchJd=${type}`).then(res => {
                console.log(222222);
                console.log(res);
            }).catch(err => {
                console.log(err, "基地导航");
            });
        },
        getBannerinfoList() {
            let _this = this;
            this.$http.get('/getBaseSummary').then( res => {
                console.log('0000000000000000000');
                _this.banners = res.data.msg;
            }).catch( err => {
                console.log(err, "获取基地概况banner失败")
            })
        },
        // articleDetail()
    },
    components: {
        search,
        goBack
    }
}
</script>
<style>

@import '../assets/css/earthBaseProfile.css';
</style>
