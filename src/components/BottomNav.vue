<template>
    <footer class="footer" id="bottomNav">
        <div class="footers">
            <router-link to="/indexHome" class="footer-item">
                <i :class="[icon,homeActive?'home-active':'home']"></i>
                <p :class="[homeActive?'active':'']">首页</p>
            </router-link>
            <router-link to="/earthBaseProfile" class="footer-item">
                <i :class="[icon,baseActive?'earth-active':'earth']"></i>
                <p :class="[baseActive?'active':'']">基地概况</p>
            </router-link>
            <router-link to="/baseNavigation" class="footer-item">
                <i :class="[icon,navActive?'location-active':'location']"></i>
                <p :class="[navActive?'active':'']">基地导航</p>
            </router-link>
            <router-link to="/knowledgeShow" class="footer-item">
                <i :class="[icon,knowActive?'kepuhuodong-active':'kepuhuodong']"></i>
                <p :class="[knowActive?'active':'']">科普活动</p>
            </router-link>
            <router-link to="/competitionDetail" class="footer-item">
                <i :class="[icon,scienceActive?'konw-active':'konw']"></i>
                <p :class="[scienceActive?'active':'']">知识竞赛</p>
            </router-link>
        </div>
    </footer>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'bottomNav',
    data() {
        return {
            icon:"footer-icon"
        }
    },
    mounted(){
    },
    computed:mapGetters(['homeActive', 'baseActive', 'navActive', 'scienceActive', 'knowActive'])
}
</script>

<style>
    @media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5) {
        .bottom-fixed:before {
            content: " ";
            width: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
            border-top: 1px solid #e7e7e7;
        }
    }
    @media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2) {
        .bottom-fixed:before {
            content: " ";
            width: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            border-top: 1px solid #e7e7e7;
        }
    }

    @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
        .bottom-fixed:before{
            content: " ";
            width: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-transform:scaleY(0.33);
            transform: scaleY(0.33);
            border-top: 1px solid #e7e7e7;
        }
    }
    .bottom-fixed {
        display:flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .96rem;
        background-color: #fff;
        /*border-top: 1px solid #e7e7e7;*/
    }
    .bottom-fixed a {
        flex: 1;
        display: block;
        text-decoration: none;
        text-align: center;
        height: .96rem;
        align-self: flex-start;
    }
    .bottom-fixed p {
        margin: 0;
        padding: 0;
        font-size: .24rem;
        color: #39f;

    }
</style>