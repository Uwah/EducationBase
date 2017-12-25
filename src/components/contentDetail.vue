<template>
    <div>
        <div class="content-top">
            <h3 class="content-title-tip seasion-count"><!--  第25期-->基地概况</h3>
            <go-back></go-back>
        </div>
        <div class="profile-detail">
            <div class="detail-top">
                <span class="detail-title">嘉兴市南湖区建国北路111号</span>
                <i class="map-navigation"></i>
            </div>
            <div class="article-content">
                <h4 class="article-title">嘉兴市科技中心</h4>
                <div class="article--detail">
                    <img src="" class="article-img" alt="">
                    <p class="article">南京理工大学是  2006年4月国家教育部批准增北京科技大学等104所学校61个国家大学生文化素质教育基地之一。
                        为加强我校大学生文化素质教育工作，建设好南京理 工大学国家大学生文化素质教育基地，我校当即成立了“南京理工大学国家大学
                        生文化素质教育基地建设领导小组”，并由一名校党委副书记分管这项工作。为进一 步整合学校的资源、理顺学校有关大学生文化素质教育的管理，于2007年上半年，学校决定成立了文化艺术素质教育中心。
                    </p>
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

        }
    },
    methods: {

    },
    beforeRouteEnter(to, from, next) {
        let param = to.params;
        next(vm => {
            vm.$http.get('').then( res => {

            }).catch( err => {
                console.log(err, "获取详情失败");
            })
        })
    },
    components: {
        goBack
    }
}
</script>
<style scoped>
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
        color: #595757;
        line-height: 1.5;
    }
</style>
