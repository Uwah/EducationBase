import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import Detail from '../components/Detail.vue';
import Found from '../components/Found.vue';
import UserCenter from '../components/UserCenter.vue';
import BottomNav from '../components/BottomNav.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import indexHome from '../pages/indexHome';


Vue.use(VueRouter);
const routes = [
    {path:'/', component: resolve => require(["../pages/indexHome"],  resolve), redirect:"/indexHome"},
    {path: '/indexHome', component: resolve => require(["../pages/indexHome"],  resolve),name:"indexHome"},
    {path: '/earthBaseProfile', component: resolve => require(["../pages/earthBaseProfile"],  resolve),name:"earthBaseProfile"},
    {path: '/baseNavigation', component: resolve => require(["../pages/baseNavigation"],  resolve),name:"baseNavigation"},
    {path: '/knowledgeShow', component: resolve => require(["../pages/scienceActive"],  resolve),name:"knowledgeShow"},
    {path: '/scienceActive', component: resolve => require(["../pages/knowledgeShow"],  resolve),name:"scienceActive"},

    
    {path:'/home', component:Home, name:"home"},
    {path:'/detail/:id', component:Detail, name:"detail"},
    {path:'/found', component:Found, name:"found"},
    {path:'/userCenter', component:UserCenter, name:"userCenter"},
    {path:'/user-login', component:Login},
    {path:'/user-reg', component:Register},
    
];

export default new VueRouter({
    routes,
    mode:'history'
});