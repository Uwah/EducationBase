<template>
  <div id="app">
      <!-- <Head :title="title" :backStatus="backStatus" :searchStatus="searchStatus" :titleStatus="titleStatus" 
      @search-data="getHomeSearch" v-show="isShowHead"></Head> -->

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
      pathname:'',
      title: "嘉兴市科普基地",
      backStatus: true,
      searchStatus: true,
      titleStatus: false,
      searchDatas: ""
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
        if(pathname === "indexHome") {
              this.$store.dispatch('homestate');
          } else if(pathname === "earthBaseProfile") {
              this.$store.dispatch("basestate");
          } else if(pathname === "baseNavigation") {
              this.$store.dispatch("navstate");
          } else if(pathname === "knowledgeShow") {
              this.$store.dispatch("knowstate");
          } else if(pathname === "scienceActive") {
              this.$store.dispatch("sciencestate");
          } else {
            this.$store.dispatch("detail");
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
  },
  computed:mapGetters(['count', 'isShowHead']),
  components : {
      bottomNav
  },
  watch:{
      $route(to, from) {
          this.pathname = to.name;
          this.showhead(this.pathname);
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

}
</style>
