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
                <input type="search" autocomplete="off" name="index-search" class="search-ipt" placeholder="搜索您需要的内容">
                <i class="search-home-icon"></i>
            </form>
        </div>
        <div class="base-info-list">
            <div class="base-item">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">基地导航</p>
            </div>
            <div class="base-item">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">科普活动</p>
            </div>
            <div class="base-item">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">知识竞赛</p>
            </div>
        </div>
        <div class="base-survey">
            <div class="survey-top">
                <div class="survey-title">基地概况</div>
                <a href="" class="jump-href"></a>
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
                <a href="" class="jump-href"></a>
            </div>
            <div class="base-locations">
                <div class="swiper-container" id="base-locations" @click="baseCheck">
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
            <div class="base-map"></div>
        </div>
        <div class="science-active">
            <div class="science-top">
                <div class="science-title">科普活动<span class="under-line"></span></div>
                <a href="" class="jump-href"></a>
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
                <a href="" class="jump-href"></a>
            </div>
            <div class="final-show">
                <span class="show-year">2017年XXX</span>
            </div>
            <div class="QRcode-visit">
                <div class="visit-info">
                    <span class="info-text">第26期知识竞赛</span>
                    <span class="info-text">活动时间：2017.10.1-2017.11.1</span>
                    <span class="info-text">报名方式：</span>
                    <div class="type-list">
                        <span class="types">123456789@163.com(email)</span>
                        <span class="types">12345678901(手机)</span>
                    </div>
                    
                </div>
                <img src="../assets/images/home-QRcode.png" class="visi-code" />
            </div>
            <div class="season-list" @click="knowledgeCheck">
                <div class="season" data-season="25">第25期</div>
                <div class="season" data-season="26">第26期</div>
                <div class="season" data-season="later">往期</div>
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
            baseIndex: 0
        }
    },
    mounted() {
        this.$http.get('/index').then(res => {
            this.indexData = res.data.msg;
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
            observer:true
        });
        new Swiper("#science-swiper", {
            slidesPerView: 2,
            spaceBetween: 20,
            observer:true
        });
    },
    methods: {
        knowledgeCheck(e) {
            console.log(e.target.getAttribute('data-season'));
        },
        scienceBaseCheck(e) {
            console.log(e);
        },
        baseCheck(e) {
            if(e.target.hasAttribute('data-baseid')) {
                console.log(e.target.getAttribute('data-baseid'))
            } else {
                console.log(e.target.parentElement.getAttribute('data-baseid'));
            }
        }
    },
    components: {
    }
}
</script>
<style scoped>
@import '../assets/css/indexHome.css';
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(70.14%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(70.14%,0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
</style>

