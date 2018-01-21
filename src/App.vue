<template>
  <div id="app">
      <router-view></router-view>
      <bottom-nav></bottom-nav>
  </div>
</template>

<script>
//App.vue入口文件引入需要用到的mapGetters/mapActions 用于监听或者说管理方法还有事件

import {mapGetters, mapActions} from 'vuex';
// import Head from './components/Header.vue';
import bottomNav from './components/BottomNav.vue';


export default {
    name: 'app',
    data () {
        return {
            pathname:''
        }
    },
    methods:{
        showhead(pathname) {
            console.log(pathname)
            if(pathname === "home" || pathname === "found") {
                this.$store.dispatch('isshead');
            } else {
                this.$store.dispatch('hidehead');
            }
        },
        bottomActive(pathname) {
            console.log(pathname)
            switch(pathname) {
                case "indexHome":
                    this.$store.dispatch('homestate');
                break;
                case "earthBaseProfile":
                case "articleDetail":
                    this.$store.dispatch("basestate");
                break;
                case "baseNavigation":
                    this.$store.dispatch("navstate");
                break;
                case "knowledgeShow":
                    this.$store.dispatch("knowstate");
                break;
                case "scienceActive":
                case "competitionList":
                case "competitionDetail":
                case "winnerList":
                case "answerList":
                    this.$store.dispatch("sciencestate");
                break;
                default:
                    this.$store.dispatch('homestate'); //默认进首页
                break;
            }
        },
        mapNav(type) {
            switch(type) {
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
        },
        navName(type) {
            let sName = '';
            switch(type) {
                case 1:
                    sName = 'homestate';
                break;
                case 3:
                    sName = "basestate";
                break;
                case 2:
                    sName = "navstate";
                break;
                case 5:
                    sName = "knowstate";
                break;
                case 4:
                    sName = "sciencestate";
                break;
                default:
                    sName = 'homestate'; //默认进首页
                break;
            }
            return sName;
        },
        getHomeSearch(e) {
            console.log(e);
        }
    },
    mounted(){
        this.pathname = this.$route.name;
        this.showhead(this.pathname);
        this.bottomActive(this.pathname);
        this.$store.dispatch("locatoinInfo");
        
    },
    components : {
        bottomNav
    },
    watch:{
        $route(to, from) {
            // debugger
            //判断 to
            this.pathname = to.name;
            let topType = this.$store.getters.getTopType;
            if(to.name === 'totalSearch') {
                if(from.name !== 'indexHome' && from.name !== 'earthBaseProfile' && from.name !== 'baseNavigation' 
                    && from.name !== 'scienceActive' && from.name !== 'knowledgeShow' && from.name !== 'competitionList') {
                    console.log(topType)
                    this.mapNav(topType);
                } else {
                    this.$store.dispatch(this.navName(topType));
                }
            } else if(to.name === 'searchPage'){
                this.$store.dispatch(this.navName(topType));
            } else {
                if(this.pathname === 'articleDetail' && from.name === 'searchPage') {
                    this.mapNav(topType);
                } else {
                    this.bottomActive(this.pathname);
                }
                
            }
            
        //   this.showhead(this.pathname);
            this.$store.dispatch('lastUrl', from.name);
            
        }
    }
}
</script>

<style>

@import './assets/css/common.css';
@import './assets/css/swiper/swiper.min.css';

ul>li {
    list-style: none;
}
a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
#app {
    min-height: 100%;
    margin: 0 auto;
    /* background-color: #f3f3f3; */
    /* margin-bottom: 1.34rem; */
    position: relative;
    padding-bottom: 1.21rem;
}
</style>
