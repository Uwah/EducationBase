<template>
    <div>
        <div class="content-top">
            <h3 class="content-title-tip seasion-count">{{topType == 3?'基地概况':'科普活动'}}</h3>
            <go-back :topType="topType"></go-back>
        </div>
        <div class="profile-detail">
            <div class="detail-top">
                <span class="detail-title">{{detailObj.address}}</span>
                <a class="map-navigation" href="javascript:;" @click="goMapNav(detailObj.address, detailObj.x, detailObj.y)"></a>
            </div>
            <div class="article-content">
                <h4 class="article-title">{{detailObj.title}}</h4>
                <div class="article--detail">
                    <img :src="detailObj.fileName" class="article-img" alt="">
                    <div class="article" v-html="detailObj.indiprofile"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import goBack from './goBack';
export default {
    data() {
        return {
            detailObj: {},
            topType: 3
        }
    },
    methods: {
        getDetail() {
            console.log('detail')
            let params = this.$route.params;
            if(Object.keys(params).length === 0) {
                switch(this.$store.getters.getTopType) {
                    case 1:
                        this.$router.push({name: 'indexHome'})
                        break;
                    case 2:
                        this.$router.push({name: 'baseNavigation'})
                        break;
                    case 3:
                        this.$router.push({name: 'earthBaseProfile'})
                        break;
                    case 4:
                        this.$router.push({name: 'competitionDetail'})
                        break;
                    case 5:
                        this.$router.push({name: 'knowledgeShow'})
                        break;
                    default:
                        this.$router.push({name: 'indexHome'})
                    break;
                }
            }
            this.topType = params.type || 3;
            this.$http.get(`/getIndiProfile?topType=${params.type}&id=${params.id}`).then( res => {
                this.detailObj = res.data.msg;
                document.body.scrollTop=0;
                
            }).catch( err => {
                console.log(err, "获取详情失败");
            });
            document.body.scrollTop=0;
            this.topType == 3?this.$store.dispatch("basestate"):this.$store.dispatch("knowstate");
        },
        goMapNav(address, lat, lng) {
            //百度地图
            // let locaObj = this.$store.getters.getLocaObj;
            // window.location.href=`http://api.map.baidu.com/direction?origin=latlng:${locaObj.point.lat},${locaObj.point.lng}|name:我的位置&destination=${address}&mode=driving&region=${locaObj.city}&output=html`;
             window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${lat},${lng}&policy=0&referer=educationBase`;
        }
    },
    mounted() {
        console.log(111)
        this.getDetail();
    },
    components: {
        goBack
    }
}
</script>
<style>
    .content-top {
        position: relative;
        height: 1.33rem;
        background-color: #fff;
        font-size: 0;
        text-align: center;
    }
    .content-title-tip {
        color: #030000;
        font-size: .46rem;
        line-height: 1.04rem;
        width: 2.33rem;
        height: 1.04rem;
        text-align: center;
        background-size: 100% 100%;
        display: inline-block;
        margin-top: .18rem;
        background-image: url(../assets/images/title-bg.png);
    }
    /*************profile-detail 详情************/
    .profile-detail {
        background-color: #fff;
    }
    .detail-top {
        background-color: #f4f4f5;
        height: 1.16rem;
        display: flex;
        align-items: center;
    }
    .detail-title {
        font-size: .3rem;
        color: #1d57a6;
        line-height: 1;
        flex: 1;
        padding-left: .3rem;
    }
    .map-navigation {
        width: 3.02rem;
        height: 100%;
        display: inline-block;
        background-size: 100% 100%;
        background-image: url(../assets/images/map-navigation.png);
    }
    .article-content {
        margin-top: .55rem;
        background-image: url(../assets/images/earth-detail-bg.png);
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .article-title {
        text-align: center;
        font-weight: 500;
        color: #efefef;
        font-size: .36rem;
        padding-top: .3rem;
        line-height: 1;
    }
    .article--detail {
        margin: 0 auto;
        width: 5.56rem;
    }
    .article-img {
        width: 100%;
        height: 3.52rem;
        margin-bottom: .2rem;
        margin-top: .3rem;
    }
    .article {
        text-indent: .4rem;
        font-size: .26rem;
        color: #4e4e4e;
        line-height: 1.5;
    }
    .article img {
        max-width: 100% !important;
    }
    #app {
        background-color: #fff;
    }
</style>
