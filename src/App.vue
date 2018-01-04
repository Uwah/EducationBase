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
        getHomeSearch(e) {
            console.log(e);
        }
    },
    mounted(){
        this.pathname = this.$route.name;
        this.showhead(this.pathname);
        this.bottomActive(this.pathname);
    //   this.$store.dispatch("userTokenAction");
    },
    components : {
        bottomNav
    },
    watch:{
        $route(to, from) {
            debugger
            //判断 to
            this.pathname = to.name;
            // if(from.name !== 'indexHome' && from.name !== 'earthBaseProfile' && from.name !== 'baseNavigation' && from.name !== 'scienceActive' && from.name !== 'knowledgeShow')
        //   this.showhead(this.pathname);
            this.$store.dispatch('lastUrl', from.name);
            this.bottomActive(this.pathname);
        }
    }
}
</script>

<style>

@import './assets/css/common.css';
@import './assets/css/swiper/swiper.min.css';
html,body,p,ul,li,table,strong {
    margin: 0;
    padding: 0;
}
ul>li {
    list-style: none;
}
a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
#app {
    min-height: 100%;
    /* background-color: #f3f3f3; */
    /* margin-bottom: 1.34rem; */
    position: relative;
    padding-bottom: 1.34rem;
}
</style>
