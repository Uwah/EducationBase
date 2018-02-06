<template>
    <div class="container">
        <div class="navigation-top">
            <h3 class="title-tip" v-show="!isShowSearchForm">基地导航</h3>
            <go-back :topType="topType"></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div>
        <div class="search-base-banner">
            <div class="swiper-container" id="search-result">
                <div class="swiper-wrapper">
                    <div :class="['swiper-slide', navIndex==index?'active':'']" @click="navChange(item.id, index)"  v-for="(item, index) in baseTypeList" :key="index"><div class="base-type">{{item.typeName}}<span class="type-count">{{item.count}}</span></div></div>
                </div>
            </div>
        </div>
        <div class="base-content">
            <ul class="base-list search-result">
                <!-- <li v-for="(item, index) in baseAddress" @click="goMap(item.address, item.id)" :key="index">
                    <i class="base-icon"></i>
                    <div class="base-info">
                        <h4>{{item.userName}}</h4>
                        <span>{{item.address}}</span>
                    </div>
                    <div class="direction">
                        <span class="dir-count"><span class="count">{{item.count}}</span>人次</span>
                        <i class="direction-icon"></i>
                    </div>
                </li> -->
                <!-- http://api.map.baidu.com/geocoder?address=北京市海淀区上地信息路9号奎科科技大厦&output=html&src=edubase -->
                <li v-for="(item, index) in baseAddress" :key="index">
                    <a href="javascript:;" @click="navCount(item.id, item.address)" style="display: inherit; width: 100%;">
                        <i class="base-icon"></i>
                        <div class="base-info">
                            <h4>{{item.userName}}</h4>
                            <span>{{item.address}}</span>
                        </div>
                        <div class="direction">
                            <span class="dir-count"><span class="count">{{item.count}}</span>人次</span>
                            <i class="direction-icon"></i>
                        </div>
                    </a>
                </li> 
            </ul>
        </div>
    </div>
</template>
<script>
//http://developer.baidu.com/map/wiki/index.php?title=uri/api/android
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
            baseAddress: [],
            navIndex: 0
        }
    },
    mounted() {
        document.body.scrollTop=0;
        this.getBaseTypeList();
        
        // new Swiper("#search-result", {
        //     slidesPerView: 3,
        //     spaceBetween: 13,
        //     observer:true
        // });
        
    },
    methods: {
        getBaseTypeList() {
            this.$http.get('/searchType?searchType=1').then( res => {
                this.baseTypeList = res.data.msg;
                this.getBaseNav(this.baseTypeList[0].id);
                // setTimeout(() => {
                //     try {
                //         document.getElementById('search-result').children[0].style.transform="translate3d(0px, 0px, 0px)";
                //     } catch (error) {
                //         console.log('返回过快，数据暂未渲染')
                //     }
                // }, 100);
                document.body.scrollTop=0;
            }).catch( err => {
                console.log(err, 'baseNavigation');
                document.body.scrollTop=0;
            })
        },
        searchData(data) {
            if(data === '') {
                this.isShowSearchForm = true;
            } else {
                console.log(data);
                this.$router.push({name: 'totalSearch', params: {address: data, type: 2}})
            }
        },
        navChange(id, index) {
            let _this = this;
            _this.navIndex = index;
            _this.getBaseNav(id);
        },
        getBaseNav(id) {
            let _this = this;
            _this.$http.get(`/searchJd?id=${id}`).then(res => {
                console.log(res);
                _this.baseAddress = res.data.msg
            }).catch(err => {
                console.log(err, "基地导航");
            });
        },
        goMap(address, id) {
            console.log(id,'map')
            this.$http.get(`/navigation?id=${id}`).then(res => {console.log(res)}).catch(error => {console.log(error)});
            this.$router.push({name: "searchPage", params: {address: address}})
        },
        navCount(id, address) {
            console.log("baseNavigation id: "+id)
            // let locaObj = this.$store.getters.getLocaObj;
            this.$http.get(`/navigation?id=${id}`).then(res => {console.log(res)}).catch(error => {console.log(error)});
            //百度地图
            // window.location.href=`http://api.map.baidu.com/direction?origin=latlng:${locaObj.point.lat},${locaObj.point.lng}|name:我的位置&destination=${address}&mode=driving&region=${locaObj.city}&output=html`;
            window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&policy=0&referer=educationBase`;
        }
    },
    components: {
        goBack,
        search
    }
}
</script>
<style src="../assets/css/baseNavigation.css" scoped></style>


