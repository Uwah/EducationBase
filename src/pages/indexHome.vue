<template>
    <div class="container">
        <!-- <div class="top-bar">
            <span class="base-title">嘉兴市科普基地</span>
        </div> -->
        <div class="top-banner">
            <div class="swiper-container swiper-container-horizontal" id="topBanner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"  v-for="(item, index) in indexData.banners" :key="index"><img class="banner-img" :src="item.fileName" /></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="search-info">
            <form action="" @submit="fromEvent($event)" class="index-search">
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
            <div class="base-item" @click="$router.push({path: '/competitionDetail'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">知识竞赛</p>
            </div>
        </div>
        <div class="base-survey">
            <div class="survey-top" @click="$router.push({path: '/earthBaseProfile'})">
                <div class="survey-title">基地概况</div>
                <a href="javascript:;" class="jump-href"></a>
            </div>
            <div class="survey-content">
                <div v-html="kx.content"></div>
            </div>
        </div>
        <div class="base-navigation">
            <div class="navigation-top" @click="$router.push({path: '/baseNavigation'})">
                <div class="navigation-title">基地导航<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href"></a>
            </div>
            <div class="base-locations">
                <div class="swiper-container" id="base-locations">
                    <div class="swiper-wrapper">
                        <div :class="['swiper-slide', 'location-item', baseIndex == index?'location-item-active':'' ]" @click="checkBaseMap(item.id, index)"
                        v-for="(item, index) in indexData.types" :data-index="index" :data-baseid="item.id" :key="index">
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
            <div class="science-top" @click="$router.push({path: '/knowledgeShow'})">
                <div class="science-title">科普活动<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href"></a>
            </div>
            <div class="science-swiper">
                <div class="swiper-container" id="science-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide science-info" @click="$router.push({name: 'articleDetail', params: {id: item.id, type: 5}});"
                        v-for="(item, index) in indexData.notices" :key="index">
                            <img class="banner-img" :src="item.fileName" />
                            <div class="swiper-content-info">
                                <span class="info-title">{{item.title}}</span>
                                <span class="info-content">{{item.subtitle}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="knowledge-show">
            <div class="home-knowledge-show-top" @click="$router.push({path: '/competitionDetail'})">
                <div class="knowledge-title">知识竞赛<span class="under-line"></span></div>
                <a href="javascript:;" class="jump-href"></a>
            </div>
            <div class="final-show" :style="{backgroundImage: `url(${activiesData.activity.fileName})`}" @click="$router.push({name: 'winnerList', params: {id: activiesData.activity.id, title: `第${activiesData.activity.periods}期`}})"></div>
            <div class="QRcode-visit">
                <div class="visit-info">
                    <span class="info-text">第{{activiesData.activity.periods}}期知识竞赛</span>
                    <span class="info-text" style="display: block;">活动时间：{{activiesData.activity.startTime}}-{{activiesData.activity.endTime}}</span>
                    <span class="info-text">报名方式：</span>
                    <div class="type-list">
                        <span class="types">{{activiesData.activity.email}}(email)</span>
                        <span class="types">{{activiesData.activity.mobile}}(手机)</span>
                    </div>
                    
                </div>
                <div class="visi-code" id="visi-code"></div>
            </div>
            <div class="season-list">
                <div class="season" @click="knowledgeCheck" :style="{backgroundImage: `url(${item.fileName})`}" :key="index" :data-season="item.id" 
                v-for="(item, index) in activiesData.list">{{item.periods != 'later'? `第${item.periods}期`: '往期'}}</div>
            </div>
        </div>
    </div>
</template>
<script>
const Swiper = require("../assets/script/util/swiper.min.js");
import QRCode from 'qrcodejs2';
/**
 * formatTime抽取，作为一个install组件 use
 */
export default {
    data() {
        return {
            indexData: {},
            baseIndex: 0,
            homeSearchData: '',
            kx: {},
            activiesData: {
                activity: {},
                list: []
            }
        }
    },
    mounted() {
        
        let _this = this;
        _this.$http.get('/index').then(res => {
            
            _this.indexData = res.data.msg;
            _this.kx = res.data.msg.kx;
            _this.activiesData.activity = res.data.msg.activities[0];
            if(res.data.msg.activities.length >= 2) {
                _this.activiesData.list = res.data.msg.activities.splice(0, 1);
            }
            _this.activiesData.list.push({fileName: '/dist/home-bottom-banner-filter.png', periods: 'later', id: 'later'});
            _this.activiesData.activity.startTime = _this.formatTime(_this.activiesData.activity.startTime);
            _this.activiesData.activity.endTime = _this.formatTime(this.activiesData.activity.endTime);
            _this.setBaseMapMarker(_this.indexData.types[0].list);
            new Swiper("#topBanner",{
                autoplay: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                pagination: {
                    el: '.swiper-pagination',
                }
            });
            let baseLocationSwiper = new Swiper("#base-locations", {
                slidesPerView: 4,
                spaceBetween: 20,
                observer:true,
                loop: true,
                slidesPerView: 'auto',
                loopedSlides: 6,
                observeParents:true,
                onSlideChangeEnd: function(swiper) {
                    swiper.update(true)
                },
                on: {
                    slideChangeTransitionEnd: function(a){
                        // console.log(baseLocationSwiper.activeIndex)
                    }
                }
            });
            new Swiper("#science-swiper", {
                slidesPerView: 'auto',
                spaceBetween: 10,
                observer:true,
                observeParents:true,
                onSlideChangeEnd: function(swiper) {
                    console.log(1)
                    swiper.update(true)
                }
            });
            setTimeout(() => {
                try {
                    document.getElementById('base-locations').children[0].style.transform="translate3d(0px, 0px, 0px)";
                    document.getElementById('science-swiper').children[0].style.transform="translate3d(0px, 0px, 0px)";
                } catch (error) {
                    console.log('操作过快数据暂未更新')
                }
                
            }, 100);
            document.body.scrollTop=0;
        }).catch(err => {
            console.error(err);
        });
        // new QRCode(document.getElementById('visi-code'), `${window.location.origin}/competitionDetail`);
        let fontSize = document.getElementsByTagName('html')[0].style['fontSize'].replace('px', '');
            fontSize = parseInt(fontSize);
        let width = 1.43*fontSize, height = 1.34*fontSize;
        var qrcode = new QRCode('visi-code', {
            text: `${window.location.origin}/competitionDetail`,
            width: width,
            height: height,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
        });

        // 使用 API
        qrcode.clear();
        qrcode.makeCode(`${window.location.origin}/competitionDetail`);
    },
    methods: {
        knowledgeCheck(e) {
            let target = e.target, season = target.getAttribute('data-season');
            if(season !== 'later') {
                this.$router.push({name: "winnerList", params: {id: season, title: target.innerText}});
            } else {
                this.$router.push({name: "competitionList", params: {seasonId: season, title: target.innerText}});
            }
        },
        checkBaseMap(id, index) {
            let baseid = id, _this = this;
            _this.baseIndex = index;
            this.setBaseMapMarker(this.indexData.types[index].list);
            // _this.$http.get(`/searchJd?id=${baseid}`).then( res => {
            //     console.log(res);
            // }).catch( err => {
            //     console.log(err);
            // });
        },
        setBaseMapMarker(markerList) {
            let map = new BMap.Map("baseMap");
            for(let type of markerList) {
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(type.address, function(point){
                    if (point) {
                        map.centerAndZoom(point, 11);
                        let marker = new BMap.Marker(point);
                        map.addOverlay(marker);
                        marker.addEventListener("click", function(e) {
                            window.location.href=`http://api.map.baidu.com/geocoder?address=${type.address}&output=html`;
                            console.log('click ' + type.address)
                        });
                        var label = new BMap.Label(type.userName,{offset:new BMap.Size(20,-10)});
                        label.addEventListener("click", function(e) {
                            window.location.href=`http://api.map.baidu.com/geocoder?address=${type.address}&output=html`;
                            console.log('click ' + type.address)
                        });
	                    marker.setLabel(label)
                    }else{
                        console.log("您选择地址没有解析到结果!");
                    }
                }, type.city);
                
                
            }
            // var point = new BMap.Point(markerList[0].x, markerList[0].y);  // 创建点坐标  
            // map.centerAndZoom(point, 15);
        },
        homeSearch(e) {
            console.log('home search: ', this.homeSearchData)
            this.$router.push({name: 'totalSearch', params: {address: this.homeSearchData, type: 1}})
        },
        fromEvent(e) {
            if(e.type === 'submit') {
                e.preventDefault();
                this.homeSearch(e);
            }
        },
        formatTime(second) {
            if(second) {
                let date = new Date(second);
                return date.getFullYear()+'.'+date.getMonth()+'.'+date.getDate();
            }
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

