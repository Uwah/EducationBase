import * as types from './types.js';

//App.vue 文件中mapActions数组管理的方法传到action处理，逻辑，异步等

export default {
    homestate:({commit}) => {
    	commit(types['HOMESTATE']);
    },
    basestate:({commit}) => {
    	commit(types['BASESTATE']);
    },
    navstate:({commit}) => {
    	commit(types['NAVSTATE']);
    },
    sciencestate:({commit}) => {
    	commit(types['SCIENCESTATE']);
    },
    knowstate:({commit}) => {
    	commit(types['KNOWSTATE']);
    },
    isshead:({commit}) => {
    	commit('headActive');
    },
    hidehead:({commit}) => {
    	commit('hidehead');
    },
    detail:({commit}) => {
        commit('detail');
    }
}