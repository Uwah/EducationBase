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
            <div class="base-item" @click="$router.push({path: '/competitionDetail'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">知识竞赛</p>
            </div>
            <div class="base-item" @click="$router.push({path: '/knowledgeShow'})">
                <i class="base-small-icon"></i>
                <p class="small-icon-text">科普活动</p>
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
                                <!-- <span class="info-content">{{item.subtitle.substring(0,43)}}</span> -->
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
            <div class="final-show" :style="{backgroundImage: `url(${activiesData.activity.fileName})`}" 
            @click="$router.push({name: 'winnerList', params: {id: activiesData.activity.id, title: `第${activiesData.activity.periods}期`}})"></div>
            <div class="QRcode-visit">
                <div class="visit-info">
                    <span class="info-text">第{{activiesData.activity.periods}}期知识竞赛</span>
                    <span class="info-text" style="display: block;">活动时间：{{activiesData.activity.startTime}}-{{activiesData.activity.endTime}}</span>
                    <span class="info-text">报名电话：</span>
                    <div class="type-list">
                        <span class="types">{{activiesData.activity.mobile}}</span>
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
        console.log('test deploy')
        // localStorage.setItem('openId','oJXlhwDq3zLUfbt30A29RLwBoTPs')
        if(location.search.length === 0 && localStorage.getItem('openId') === null) {
            location.replace('https://jxast.net/getWechatToken')//调取授权
        } else {
            // alert(localStorage.getItem('openId')) oJXlhwDq3zLUfbt30A29RLwBoTPs
            if(localStorage.getItem('openId') === null) {
                var info = location.search;
                if(info.length > 0) {
                    info =info.substring(1);
                    var result = info.split("&");
                    var key,value;
                    var data = {};
                    for(var i=0;i<result.length;i++){
                        var result2 = result[i].split("=");
                        key = result2[0];
                        value = result2[1];
                        data[key] = value;
                    }
                    // return data
                    //防止出错两个都判断
                    if(data['wechatId']) {
                        localStorage.setItem('openId', data['wechatId'])
                    } else if(data['openId']){
                        localStorage.setItem('openId', data['openId'])
                    }
                    
                }
                // var str = location.search.substr(1).split("&")[0];
                // // alert(str.split('=')[1])
                // localStorage.setItem('openId', str.split('=')[1])
            }
        }
        // alert(location.search)
        let _this = this;
        _this.$http.get('/index').then(res => {
            _this.indexData = res.data.msg;
            _this.kx = res.data.msg.kx;
            _this.activiesData.activity = res.data.msg.activities[0];
            if(res.data.msg.activities.length >= 2) {
                res.data.msg.activities.splice(0, 1);
                _this.activiesData.list = res.data.msg.activities
            }
            if(_this.activiesData.list.length > 2) {
                _this.activiesData.list.length = 2
            }
            
            _this.activiesData.list.push({fileName: '/dist/home-bottom-banner-filter.png', periods: 'later', id: 'later'});
            _this.activiesData.activity.startTime = _this.formatTime(_this.activiesData.activity.startTime);
            _this.activiesData.activity.endTime = _this.formatTime(this.activiesData.activity.endTime);
            _this.setBaseMapMarker(_this.indexData.types[0].list, _this);
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
                observeParents:true
                
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
            
            this.setBaseMapMarker(this.indexData.types[index].list, this);
        },
        setBaseMapMarker(markerList, _that) {
            let map = new qq.maps.Map(document.getElementById('baseMap'), {
                disableDefaultUI: true,
				zoom: 12
            });
            var infoWin = new qq.maps.InfoWindow({  
                map: map  
            });
            // let loca = JSON.parse(localStorage.getItem('loca'));
            for(let type of markerList) {
                (function(address, name, lat, lng) {
                    let geocoder = new qq.maps.Geocoder();
                    geocoder.getLocation(address);
                    //设置服务请求成功的回调函数
                    geocoder.setComplete(function(result) {
                        let latLng = new qq.maps.LatLng(result.detail.location.lat, result.detail.location.lng);
                        map.setCenter(latLng)
                        
                        let marker=new qq.maps.Marker({
                            position: latLng,
                            animation: qq.maps.MarkerAnimation.DROP,
                            map: map
                        });
                        let label = new qq.maps.Label({
                            position: latLng,
                            map: map,
                            offset: new qq.maps.Size(13, -38),
                            style: {padding: "1px 5px",borderRadius: "5px",border: "1px solid #D7290F", zIndex: 99},
                            content: name
                        });
                        qq.maps.event.addListener(marker, 'click', function(e) {
                            console.log(e, + '----' + marker.getPosition())
                            window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${lat},${lng}&policy=0&referer=educationBase`;
                        })
                        qq.maps.event.addListener(label, 'click', function(e) {
                            console.log(e, + '----' + label.getPosition())
                            window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${lat},${lng}&policy=0&referer=educationBase`;
                        })
                        

                    });
                    //若服务请求失败，则运行以下函数
                    geocoder.setError(function() {
                        console.log("出错了，请输入正确的地址！！！");
                    });
                })(type.address, type.userName, type.x, type.y);
                // codeAddress(type.address, type.userName);
            }
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
        dealWithTime(t) {
            if(t) {
                return t < 10 ? '0'+t : t;
            } else {
                if(t == 0) {
                    return "00";
                } else {
                    return "";
                }
                
            }
        },
        
        formatTime(second) {
            if(second) {
                let date = new Date(second), dateStr = '';
                return date.getFullYear() +
                        '.'+this.dealWithTime(date.getMonth()+1) +
                        '.'+this.dealWithTime(date.getDate()) + 
                        ' ' + this.dealWithTime(date.getHours()) + 
                        ':' + this.dealWithTime(date.getMinutes());
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

