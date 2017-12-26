import {HOMESTATE,BASESTATE,NAVSTATE,SCIENCESTATE,KNOWSTATE} from './types.js';
import getters from './getters.js';//mutations需要用到getter,一起导出
import state from './modules'
//actions中commit将方法传到mutations,mutations需要处理数据，用到getters讲数据return返回

/*const state = {
    count : 10
};*/

//mutations做数据操作
const mutations = {
    [HOMESTATE](state) {//state里面包含的是数据
        state.homeStatus = true;
        state.baseStatus = false;
        state.navStatus = false;
        state.scienceStatus = false;
        state.knowStatus = false;
    },
    [BASESTATE](state) {
        state.homeStatus = false;
        state.baseStatus = true;
        state.navStatus = false;
        state.scienceStatus = false;
        state.knowStatus = false;
    },
    [NAVSTATE](state) {
        state.homeStatus = false;
        state.baseStatus = false;
        state.navStatus = true;
        state.scienceStatus = false;
        state.knowStatus = false;
    },
    [SCIENCESTATE](state) {
        state.homeStatus = false;
        state.baseStatus = false;
        state.navStatus = false;
        state.scienceStatus = true;
        state.knowStatus = false;
    },
    [KNOWSTATE](state) {
        state.homeStatus = false;
        state.baseStatus = false;
        state.navStatus = false;
        state.scienceStatus = false;
        state.knowStatus = true;
    },
    headActive(state) {
        state.isShowHead = true;
    },
    hidehead(state) {
        state.isShowHead = false;
    },
    detail(state) {
        state.homeStatus = false;
        state.foundActive = false;
        state.mineActive = false;
    },
    userToken(state, tokenInfo) {
        state.userToken = tokenInfo;
    },
    changeLastUrl(state, url) {
        state.fromUrl = url;
    }
};

export default {
    state,
    mutations,
    getters
}