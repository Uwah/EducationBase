<template>
    <div class="container">
        <div class="profile-top">
            <h3 class="title-tip" v-show="!isShowSearchForm">基地概况</h3>
            <go-back :topType="topType"></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div>
        <div class="profile-list-content">
            <div class="profile-banner">
                <div class="swiper-container" id="profile-banner">
                    <div class="swiper-wrapper"><!--  @click="goArticleDetail($event, item.id)" -->
                        <div class="swiper-slide" :data-id="item.id" v-for="(item, index) in banners.banners" :key="index"
                        ><a href="javascript:;"><img :src="item.fileName" /></a></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="title-list-out">
                <div class="profile-title-list">
                    <div class="swiper-container" id="profile-list-swiper">
                        <div class="swiper-wrapper">
                            <div @click="baseTypeChange(item.id, index)" :class="['swiper-slide',typeIndex==index?'active':'']" 
                            v-for="(item, index) in banners.types" :key="index" :data-id="item.id">{{item.typeName}}</div>
                        </div>
                    </div>
                    <i :class="['content-type',contentType]" @click="profileChange"></i>
                </div>
            </div>
            <div class="profile-list" v-show="contentType == 'list'">
                <div class="cell-type" :data-id="item.id" v-for="(item, index) in profileList" :key="index"
                    @click="goArticleDetail($event, item.id)">
                    <img :src="item.fileName" class="cell-img" alt="">
                    <div class="cell-detail">
                        <span class="cell-position"><i class="position-icon"></i>{{item.qu}}</span>
                        <span class="cell-position-name">{{item.userName}}</span>
                    </div>
                </div>
            </div>
            <div class="profile-list" v-show="contentType == 'cell'">
                <div class="earth-list-type" :data-id="item.id" v-for="(item, index) in profileList" :key="index"
                    @click="goArticleDetail($event, item.id)">
                    <img :src="item.fileName" class="list-type-img" alt="">
                    <div class="list-type-content">
                        <span class="list-type-title">{{item.userName}}</span>
                        <p v-html="item.indiProfile"></p>
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
            topType: 3,
            typeIndex: 0
        }
    },
    mounted() {
        document.body.scrollTop=0;
        this.getBannerinfoList();
        // this.getAllEarthBase(1);
        new Swiper("#profile-banner", {
            autoplay: true,
            observer:true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
        
    },
    methods: {
        searchData(kw) {
            if(!this.isShowSearchForm) {
                this.isShowSearchForm = true;
            } else {
                console.log(kw);
                this.$router.push({name: 'totalSearch', params: {address: kw, type: 3}})
            }
        },
        baseTypeChange(id, index) {
            this.typeIndex = index;
            this.searchEarthBase(id);
        },
        profileChange(e) {
            this.contentType = this.contentType ==='cell' ? 'list': 'cell';
        },
        searchEarthBase(id) {
            let _this = this;
            _this.$http.get(`/searchJd?id=${id}`).then(res => {
                console.log(res);
                _this.profileList = res.data.msg
            }).catch(err => {
                console.log(err, "基地导航");
            });
        },
        getBannerinfoList() {
            let _this = this;
            this.$http.get('/getBaseSummary').then( res => {
                _this.banners = res.data.msg;
                new Swiper("#profile-list-swiper", {
                    observer:true,
                    slidesPerView: 4,
                    spaceBetween: 20
                });
                setTimeout(() => {
                    document.getElementById('profile-list-swiper').children[0].style.transform="translate3d(0px, 0px, 0px)";
                }, 100);
                _this.searchEarthBase(_this.banners.types[0].id)
            }).catch( err => {
                console.log(err, "获取基地概况banner失败")
            })
        },
        goArticleDetail(a, id){
            //TODO toptype类型确认 
             this.$router.push({name: "articleDetail", params: {id: id, type: this.topType}});
        }
    },
    components: {
        search,
        goBack
    }
}
</script>
<style src="../assets/css/earthBaseProfile.css" scoped></style>
