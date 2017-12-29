import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
const routes = [
    {path:'/', component: resolve => require(["../pages/indexHome"],  resolve), redirect:"/indexHome"},
    {path: '/indexHome', component: resolve => require(["../pages/indexHome"],  resolve),name:"indexHome"},
    {path: '/earthBaseProfile', component: resolve => require(["../pages/earthBaseProfile"],  resolve),name:"earthBaseProfile"},
    {path: '/baseNavigation', component: resolve => require(["../pages/baseNavigation"],  resolve),name:"baseNavigation"},
    {path: '/scienceActive', component: resolve => require(["../pages/scienceActive"],  resolve),name:"scienceActive"},
    {path: '/knowledgeShow', component: resolve => require(["../pages/knowledgeShow"],  resolve),name:"knowledgeShow"},

    {path:'/articleDetail/:id', component: resolve => require(['../components/contentDetail'], resolve), name:"articleDetail"},
    {path:'/competitionList', component: resolve => require(['../components/competitionList'], resolve), name:"competitionList"},
    {path:'/competitionDetail', component: resolve => require(['../components/competitionDetail'], resolve), name:"competitionDetail"},
    {path:'/winnerList', component: resolve => require(['../components/winnerList'], resolve), name:"winnerList"},
    {path:'/answerList', component: resolve => require(['../components/answerList'], resolve), name:"answerList"},
    {path: '/searchPage', component: resolve => require(['../components/searchPage'], resolve),name:'searchPage'}
    
];

export default new VueRouter({
    routes,
    mode:'history'
});