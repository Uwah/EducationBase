import Vue from 'vue';
import VueRouter from 'vue-router';
import indexHome from "../pages/indexHome";

Vue.use(VueRouter);
const routes = [
    {path:'/', component: indexHome,name:"indexHome"},
    {path: '/indexHome', component: indexHome,name:"indexHome"},
    {path: '/earthBaseProfile', component: resolve => require(["../pages/earthBaseProfile"],  resolve), name:"earthBaseProfile"},
    {path: '/baseNavigation', component: resolve => require(["../pages/baseNavigation"],  resolve), name:"baseNavigation"},
    {path: '/scienceActive', component: resolve => require(["../pages/scienceActive"],  resolve), name:"scienceActive"},
    {path: '/knowledgeShow', component: resolve => require(["../pages/knowledgeShow"],  resolve), name:"knowledgeShow"},

    {path: '/baseMap', component: resolve => require(['../pages/locationMap'], resolve), name: 'baseMap'},
    {path: '/luckyUsers', component: resolve => require(['../pages/luckyUserList'], resolve), name: 'luckyUsers'},
    {path: '/luckyDraw', component: resolve => require(['../pages/luckyDraw'], resolve), name: 'luckyDraw'},
    {path: '/userCenter', component: resolve => require(['../pages/userCenter'], resolve), name: 'userCenter'},

    {path:'/articleDetail', component: resolve => require(['../components/contentDetail'], resolve), name:"articleDetail"},
    {path:'/competitionList', component: resolve => require(['../components/competitionList'], resolve), name:"competitionList"},
    {path:'/competitionDetail', component: resolve => require(['../components/competitionDetail'], resolve), name:"competitionDetail"},
    {path:'/winnerList', component: resolve => require(['../components/winnerList'], resolve), name:"winnerList"},
    {path:'/answerList', component: resolve => require(['../components/answerList'], resolve), name:"answerList"},
    {path: '/searchPage', component: resolve => require(['../components/searchPage'], resolve), name:'searchPage'},
    {path: '/totalSearch', component: resolve => require(['../components/totalSearch'], resolve), name:'totalSearch'},
    {path: '*', component: indexHome }
    
];

export default new VueRouter({
    routes,
    mode:'history',
    base: '/'
});