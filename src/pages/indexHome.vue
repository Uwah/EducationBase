<template>
    <div class="container">
        <div class="top-bar">
            <span class="base-title">嘉兴市科普基地</span>
        </div>
        <div class="top-banner">
            <div class="swiper-container swiper-container-horizontal" id="topBanner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"  v-for="(item, index) in indexData.banners" :key="index"><img class="banner-img" :src="item.fileName" /></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="search-info">
            <form action="" class="index-search">
                <input type="search" v-model="homeSearchData" autocomplete="off" name="index-search" class="search-ipt" placeholder="搜索您需要的内容">
                <i class="search-home-icon" @click="homeSearch"></i>
            </form>
        </div>
        <div class="base-info-list">
            <div class="base-item" @click="$router.push({path: '/baseNavigation'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">基地导航</p>
            </div>
            <div class="base-item" @click="$router.push({path: '/knowledgeShow'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">科普活动</p>
            </div>
            <div class="base-item" @click="$router.push({path: '/scienceActive'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">知识竞赛</p>
            </div>
        </div>
        <div class="base-survey">
            <div class="survey-top">
                <div class="survey-title">基地概况</div>
                <a href="javascript:;" class="jump-href" @click="$router.push({path: '/earthBaseProfile'})"></a>
            </div>
            <div class="survey-content">
                <p>嘉兴市科学技术协会（以下简称市科协）是由市级学会、协会、研究会、 市属企业事业单位科协和地方科协组成的科学技术工作者的群众组织，市委 领导下的人民团体，是党和政府联系科技工作者的桥梁、纽带和发展科技事业助手。</p>
                <p>根据《关于开展嘉兴市科普教育基地申报工作的通知》（嘉兴科协[2017]9号）和《嘉兴市科普教育基地整治提升实施方案》（嘉市科协[2017]38号）文件精神，
                    共收到59家单位的申请，其中新申报市级科普教育基地20家，整治后重新验收评审市级科普教育基地39家。(一)各类科技、教育场馆；(二)各类自然保护区、动植物园区；(三)科研机构、院校；(四)科技型企业；(五)工、农业科技园、种植养殖场；
                    (六)其他具备向公众开展科普教育、展示和示范功能的部门和机构。
                </p>
            </div>
        </div>
        <div class="base-navigation">
            <div class="navigation-top">
                <div class="navigation-title">基地导航<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href" @click="$router.push({path: '/baseNavigation'})"></a>
            </div>
            <div class="base-locations">
                <div class="swiper-container" id="base-locations" @click="checkBaseMap">
                    <div class="swiper-wrapper">
                        <div :class="['swiper-slide', 'location-item', baseIndex == index?'location-item-active':'' ]" 
                        v-for="(item, index) in indexData.types" :data-baseid="item.id" :key="index">
                            <span class="base-count">{{item.count}}</span>
                            <i :class="['home-location-small', baseIndex == index?'home-location-small-active':'']"></i>
                            <p>{{item.typeName}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="base-map" id="baseMap"></div>
        </div>
        <div class="science-active">
            <div class="science-top">
                <div class="science-title">科普活动<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href" @click="$router.push({path: '/knowledgeShow'})"></a>
            </div>
            <div class="science-swiper">
                <div class="swiper-container" id="science-swiper" @click="scienceBaseCheck">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide science-info" v-for="(item, index) in indexData.notices" :key="index">
                            <img class="banner-img" :src="item.fileName" />
                            <div class="swiper-content-info">
                                <span class="info-title">{{item.title}}</span>
                                <span class="info-content">{{item.content}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="knowledge-show">
            <div class="home-knowledge-show-top">
                <div class="knowledge-title">知识竞赛<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href" @click="$router.push({path: '/scienceActive'})"></a>
            </div>
            <div class="final-show" @click="knowledgeCheck">
                <img :src="activiesData.activity.fileName" />
            </div>
            <div class="QRcode-visit">
                <div class="visit-info">
                    <span class="info-text">第{{activiesData.activity.periods}}期知识竞赛</span>
                    <span class="info-text">活动时间：2017.10.1-2017.11.1</span>
                    <span class="info-text">报名方式：</span>
                    <div class="type-list">
                        <span class="types">{{activiesData.activity.email}}(email)</span>
                        <span class="types">{{activiesData.activity.mobile}}(手机)</span>
                    </div>
                    
                </div>
                <img src="../assets/images/home-QRcode.png" class="visi-code" />
            </div>
            <div class="season-list" @click="knowledgeCheck">
                <div class="season" :style="{backgroundImage: `url(${item.fileName})`}" :key="index" :data-season="item.periods" v-for="(item, index) in activiesData.list">第{{item.periods}}期</div>
            </div>
        </div>
    </div>
</template>
<script>
const Swiper = require("../assets/script/util/swiper.min.js");

export default {
    data() {
        return {
            indexData: {},
            baseIndex: 0,
            homeSearchData: '',
            activiesData: {
                activity: {},
                list: []
            }
        }
    },
    mounted() {
        document.body.scrollTop=0;
        this.$http.get('/index').then(res => {
            this.indexData = res.data.msg;
            this.activiesData.activity = res.data.msg.activities[0];
            if(res.data.msg.activities.length >= 2) {
                this.activiesData.list = res.data.msg.activities.splice(0, 1);
            }
            
            
        }).catch(err => {
            console.error(err);
        });
       
        new Swiper("#topBanner",{
            autoplay: true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            pagination: {
                el: '.swiper-pagination',
            }
        });
        new Swiper("#base-locations", {
            slidesPerView: 4,
            spaceBetween: 20,
            observer:true,
            observeParents:true,
            onSlideChangeEnd: function(swiper) {
                swiper.update(true)
            }
        });
        new Swiper("#science-swiper", {
            slidesPerView: 2,
            spaceBetween: 10,
            observer:true
        });
        let map = new BMap.Map("baseMap");
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
        map.centerAndZoom(point, 15);
        setTimeout(() => {
            document.getElementById('base-locations').children[0].style.transform="translate3d(0px, 0px, 0px)";
            document.getElementById('science-swiper').children[0].style.transform="translate3d(0px, 0px, 0px)";
        }, 100); 
    },
    methods: {
        knowledgeCheck(e) {
            let target = e.target;
            this.$router.push({name: "competitionList", params: {seasonId: target.getAttribute('data-season'), title: target.innerText}});
        },
        scienceBaseCheck(e) {
            console.log(e);
        },
        checkBaseMap(e) {
            let baseid = 0, _this = this;
            if(e.target.hasAttribute('data-baseid')) {
                baseid = e.target.getAttribute('data-baseid');
            } else {
                baseid = e.target.parentElement.getAttribute('data-baseid');
            }
            _this.$http.get(`/searchJd?id=${baseid}`).then( res => {
                console.log(res);
            }).catch( err => {
                console.log(err);
            });
        },
        homeSearch(e) {
            console.log('home search: ', this.homeSearchData)
        }
    },
    watch:{
        // indexData: function(newVal, oldVal) {
        //     if(newVal.length && newVal.length > 2) {
        //         this.activiesData.activity = newVal.activities[0];
        //         this.activiesData.list = newVal.activities.splice(0, 1);
        //     }
        // }
    }
}
</script>
<style src="../assets/css/indexHome.css" scoped></style>

